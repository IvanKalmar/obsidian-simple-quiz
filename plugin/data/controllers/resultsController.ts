import {DataController} from "./dataController";

import {QuizResult} from "../quiz";
import {getDateStartTimestamp, round} from "../../utils";
import {Controller} from "./controller";
import {Notice} from "obsidian";
import {Flashcard} from "../flashcard";


export enum FlashcardStatus {
	SUCCESS = "SUCCESS",
	MIDDLE = "MIDDLE",
	FAILED = "FAILED",
	EMPTY = "EMPTY"
}


export class ResultsController extends Controller {
	dataController: DataController;

	lowestCardThreshold: number;
	successCardThreshold: number;
	minimumCardNonRepetitionTime: number;
	maximumCardNonRepetitionTime: number;

	data: ResultsData;
	enabled: boolean;

	roundBy = 0.05;

	async load(): Promise<void> {
		this.dataController = this.plugin.dataController;
		this.enabled = this.plugin.settings.saveResults;

		this.lowestCardThreshold = this.plugin.settings.lowestCardThreshold;
		this.successCardThreshold = this.plugin.settings.successCardThreshold;
		this.minimumCardNonRepetitionTime = this.plugin.settings.minimumCardNonRepetitionTime;
		this.maximumCardNonRepetitionTime = this.plugin.settings.maximumCardNonRepetitionTime;

		this.data = new ResultsData();

		if(this.enabled) {
			const resultsObject = await this.dataController.loadResultsObject();
			if(resultsObject) {
				this.data = Object.assign(new ResultsData(), resultsObject);
			} else {
				await this.dataController.saveResultsObject(this.data);
			}
		}
	}

	roundScore(score: number): number {
		score = (Math.floor(score / this.roundBy) * this.roundBy) +
			(Math.round((score * 100) % (this.roundBy * 100)) / 100 >= (this.roundBy / 2) ? this.roundBy : 0);

		return score < 0 ? 0 : (score > 1 ? 1 : score);
	}

	getCardScore(flashcardID: string): number {
		if(!this.enabled) {
			return -1;
		}

		if(!this.data.flashcards.hasOwnProperty(flashcardID)) {
			return -1;
		}

		let score = 0;

		let data = this.data.flashcards[flashcardID];
		if(data) {
			score = data.score;

			const todayTimestamp = + new Date() / 1000;
			const cardNonRepetitionTime = todayTimestamp - data.lastQuizAt;

			if(cardNonRepetitionTime > this.minimumCardNonRepetitionTime) {
				score -= cardNonRepetitionTime / this.maximumCardNonRepetitionTime;
			}
		}

		return this.roundScore(score);
	}

	getCardStatus(flashcardID: string): FlashcardStatus {
		if(!this.enabled) {
			return FlashcardStatus.EMPTY;
		}

		if(!this.data.flashcards.hasOwnProperty(flashcardID)) {
			return FlashcardStatus.EMPTY;
		}

		const score = this.getCardScore(flashcardID);

		if(score >= this.successCardThreshold) {
			return FlashcardStatus.SUCCESS;
		} else if (score <= this.lowestCardThreshold) {
			return FlashcardStatus.FAILED;
		}

		return FlashcardStatus.MIDDLE;
	}

	getCardLastQuizTimestamp(flashcardID: string): number {
		const now = round((+ new Date()) / 1000);

		if(!this.enabled) {
			return now;
		}

		if(!this.data.flashcards.hasOwnProperty(flashcardID)) {
			return now;
		}

		return this.data.flashcards[flashcardID].lastQuizAt;
	}

	getLastFlashcardsIDs(): string[] {
		return this.data.last;
	}

	getFlashcardsIDsByStatus(status: FlashcardStatus): string[] {
		return Object.keys(this.data.flashcards)
			.map(flashcardID => {
				return {
					flashcardID: flashcardID,
					score: this.getCardScore(flashcardID)
				}
			}).filter(flashcardData => {
				switch (status) {
					case FlashcardStatus.SUCCESS: {
						return this.successCardThreshold <= flashcardData.score
					}
					case FlashcardStatus.FAILED: {
						return this.lowestCardThreshold >= flashcardData.score
					}
				}
				return (this.lowestCardThreshold < flashcardData.score) && (flashcardData.score < this.successCardThreshold);
			}).map(flashcardData => {
				return flashcardData.flashcardID;
			});
	}

	async appendQuizResult(quizResult: QuizResult) {
		if(!this.enabled) {
			return;
		}

		const todayDateStartTimestamp = getDateStartTimestamp(new Date());

		if(!this.data.days.hasOwnProperty(todayDateStartTimestamp.toString())) {
			this.data.days[todayDateStartTimestamp] = new DayData();
		}

		const quizFlashcards = new Set<string>;
		for(const question of quizResult.questions) {
			const flashcardID = question.flashcard.id;

			quizFlashcards.add(flashcardID);

			if(!this.data.flashcards.hasOwnProperty(flashcardID)) {
				this.data.flashcards[flashcardID] = new FlashcardData();
			}

			const flashcardData = this.data.flashcards[flashcardID];

			flashcardData.success += question.result ? 1 : 0;
			flashcardData.total += 1;
			flashcardData.score = round(flashcardData.success / flashcardData.total, 2);
			flashcardData.lastQuizAt = Math.round((+ quizResult.completedAt) / 1000);
		}

		const flashcards = new Set(this.data.days[todayDateStartTimestamp].flashcards);
		for(const flashcard of quizFlashcards) {
			flashcards.add(flashcard);
		}

		this.data.days[todayDateStartTimestamp].flashcards = Array.from(flashcards);
		this.data.days[todayDateStartTimestamp].quizzesCount += 1
		this.data.days[todayDateStartTimestamp].statusCount = {
			[FlashcardStatus.FAILED]: this.getFlashcardsIDsByStatus(FlashcardStatus.FAILED).length,
			[FlashcardStatus.MIDDLE]: this.getFlashcardsIDsByStatus(FlashcardStatus.MIDDLE).length,
			[FlashcardStatus.SUCCESS]: this.getFlashcardsIDsByStatus(FlashcardStatus.SUCCESS).length,
		}

		this.data.last = Array.from(quizFlashcards);

		await this.dataController.saveResultsObject(this.data);
	}

	getStatistics(): Statistics | null {
		if(!this.enabled) {
			return null;
		}

		const todayDate = new Date();
		const todayDateStartTimestamp = getDateStartTimestamp(todayDate);
		const todayDateEndTimestamp = todayDateStartTimestamp + 24 * 3600;

		const streakCounter = new StreakCounter();

		const today = new TodayProgression();
		const week =  new WeekProgression(todayDate);
		const month = new MonthProgression(todayDate);
		const year = new YearProgression(todayDate);

		for(const [dayTimestampString, dayData] of Object.entries(this.data.days).reverse()) {
			const dayTimestamp = Number(dayTimestampString);

			if(!week.isTimestampInWeek(dayTimestamp) && !month.isTimestampInMonth(dayTimestamp) &&
				!year.isTimestampInYear(dayTimestamp) && !streakCounter.continue) {
				break;
			}

			if((todayDateStartTimestamp <= dayTimestamp) && (todayDateEndTimestamp <= todayDateEndTimestamp)) {
				today.cardsToday = dayData.flashcards.length;
				today.quizzesToday = dayData.quizzesCount;
			}

			streakCounter.appendDay(dayTimestamp, dayTimestamp == todayDateStartTimestamp);

			week.appendDay(dayTimestamp);
			month.appendDay(dayTimestamp, dayData);
			year.appendDay(dayTimestamp, dayData);
		}

		today.streak = streakCounter.daysCount;

		return new Statistics( {
			[FlashcardStatus.FAILED]: this.getFlashcardsIDsByStatus(FlashcardStatus.FAILED).length,
			[FlashcardStatus.MIDDLE]: this.getFlashcardsIDsByStatus(FlashcardStatus.MIDDLE).length,
			[FlashcardStatus.SUCCESS]: this.getFlashcardsIDsByStatus(FlashcardStatus.SUCCESS).length,
		}, today, week, month, year);
	}

	async setEnabled(enabled: boolean) {
		this.enabled = enabled;
	}

	async clear() {
		this.data = new ResultsData();
		await this.dataController.saveResultsObject(new ResultsData());

		new Notice("Results cleared");
	}
}


/* Data */


class ResultsData {
	last: string[] = [];  // Flashcards IDs
	flashcards: {[key: string]: FlashcardData} = {}; // FlashcardID: FlashcardData
	days: {[key: number]: DayData} = {};  // DayStartTimestamp: DayData
}

class DayData {
	flashcards: string[] = [];  // Flashcards IDs
	quizzesCount: number = 0;
	statusCount: {[key: string]: number};
}

class FlashcardData {
	score: number = 0;
	success: number = 0;
	total: number = 0;
	lastQuizAt: number = -1;
}


/* Statistics */


export class Statistics {
	countByStatus: {[key: string]: number};
	today: TodayProgression;
	week: WeekProgression;
	month: MonthProgression;
	year: YearProgression;

	constructor(countByStatus: { [p: string]: number }, today: TodayProgression,
				week: WeekProgression, month: MonthProgression, year: YearProgression) {
		this.countByStatus = countByStatus;

		this.today = today;
		this.week = week;
		this.month = month;
		this.year = year;
	}
}


/* Today */


export class TodayProgression {
	streak: number = 0
	cardsToday: number = 0
	quizzesToday: number = 0
}


/* Today streak counter */


export class StreakCounter {
	continue: boolean = true;

	daysCount: number = 0;

	currentDayStartTimestamp: number = -1

	appendDay(dayStartTimestamp: number, countStart: boolean = false) {
		if(this.currentDayStartTimestamp == -1) {
			this.currentDayStartTimestamp = dayStartTimestamp;

			if(countStart) {
				this.daysCount = 1;
			}

			return;
		}

		if(dayStartTimestamp - this.currentDayStartTimestamp <= 24 * 3600) {
			this.daysCount += 1;
			this.currentDayStartTimestamp -= 24 * 3600;
		} else {
			this.continue = false;
		}
	}
}


/* Streak week */


export class WeekProgression {
	days: StreakDay[];
	weekStartTimestamp: number;

	constructor(currentDate: Date) {
		const currentTimestamp = getDateStartTimestamp(currentDate);

		const day = currentDate.getDay();
		let dateCopy = new Date(currentDate);
		dateCopy.setDate(dateCopy.getDate() - day + (day === 0 ? -6 : 1));
		const weekStartTimestamp = getDateStartTimestamp(dateCopy);

		const weekDates = [
			new Date(dateCopy),
			new Date((weekStartTimestamp + 1 * 24 * 3600) * 1000),
			new Date((weekStartTimestamp + 2 * 24 * 3600) * 1000),
			new Date((weekStartTimestamp + 3 * 24 * 3600) * 1000),
			new Date((weekStartTimestamp + 4 * 24 * 3600) * 1000),
			new Date((weekStartTimestamp + 5 * 24 * 3600) * 1000),
			new Date((weekStartTimestamp + 6 * 24 * 3600) * 1000),
		];

		this.weekStartTimestamp = getDateStartTimestamp(weekDates[0]);

		this.days = [
			new StreakDay(weekDates[0], StreakDayTitle.MONDAY),
			new StreakDay(weekDates[1], StreakDayTitle.TUESDAY),
			new StreakDay(weekDates[2], StreakDayTitle.WEDNESDAY),
			new StreakDay(weekDates[3], StreakDayTitle.THURSDAY),
			new StreakDay(weekDates[4], StreakDayTitle.FRIDAY),
			new StreakDay(weekDates[5], StreakDayTitle.SATURDAY),
			new StreakDay(weekDates[6], StreakDayTitle.SUNDAY)
		]

		for(const streakDay of this.days) {
			if(streakDay.dayStart > currentTimestamp) {
				streakDay.status = StreakDayStatus.NEXT;
			}

			if(streakDay.dayStart == currentTimestamp) {
				streakDay.status = StreakDayStatus.CURRENT;
			}
		}
	}

	isTimestampInWeek(dayTimestamp: number) {
		return this.weekStartTimestamp <= dayTimestamp
	}

	appendDay(dayTimestamp: number) {
		if(!this.isTimestampInWeek(dayTimestamp)) {
			return;
		}

		for(const streakDay of this.days) {
			if(streakDay.isTimestampInDay(dayTimestamp)) {
				streakDay.status = StreakDayStatus.DONE;
			}
		}
	}
}

export class StreakDay {
	dayStart: number
	dayEnd: number
	day: StreakDayTitle
	status: StreakDayStatus = StreakDayStatus.MISSED;

	constructor(date: Date, day: StreakDayTitle) {
		this.dayStart = getDateStartTimestamp(date);
		this.dayEnd = this.dayStart + 24 * 3600;

		this.day = day;
	}

	isTimestampInDay(timestamp: number): boolean {
		return this.dayStart <= timestamp && timestamp < this.dayEnd;
	}
}

export enum StreakDayStatus {
	MISSED = 0,
	DONE = 1,
	CURRENT = 2,
	NEXT = 3
}

export enum StreakDayTitle {
	MONDAY = "Monday",
	TUESDAY = "Tuesday",
	WEDNESDAY = "Wednesday",
	THURSDAY = "Thursday",
	FRIDAY = "Friday",
	SATURDAY = "Saturday",
	SUNDAY = "Sunday"
}

export class MonthProgression {
	days: MonthDay[]
	monthStartDayStartTimestamp: number
	monthEndDayEndTimestamp: number

	constructor(todayDate: Date) {
		const days = new Date(todayDate.getFullYear(), todayDate.getMonth(), 0).getDate();

		this.monthStartDayStartTimestamp = getDateStartTimestamp(
			new Date(todayDate.getFullYear(), todayDate.getMonth(), 1)
		);
		this.monthEndDayEndTimestamp = getDateStartTimestamp(
			new Date(todayDate.getFullYear(), todayDate.getMonth(), days)
		) + 24 * 3600;

		this.days = [...Array(days).keys()].map(day => {
			return new MonthDay(new Date(todayDate.getFullYear(), todayDate.getMonth(), day + 1));
		})
	}

	isTimestampInMonth(timestamp: number): boolean {
		return this.monthStartDayStartTimestamp <= timestamp && timestamp < this.monthEndDayEndTimestamp;
	}

	appendDay(dayTimestamp: number, dayData: DayData) {
		if(!this.isTimestampInMonth(dayTimestamp)) {
			return;
		}

		for(const day of this.days) {
			if(day.isTimestampInDay(dayTimestamp)) {
				day.flashcardsCount = dayData.flashcards.length;
				return;
			}
		}
	}
}

export class MonthDay {
	day: Date;
	dayStart: number;
	dayEnd: number;
	flashcardsCount: number = 0;

	constructor(day: Date) {
		this.day = day;
		this.dayStart = getDateStartTimestamp(day);
		this.dayEnd = this.dayStart + 24 * 3600;
	}

	isTimestampInDay(timestamp: number): boolean {
		return this.dayStart <= timestamp && timestamp < this.dayEnd;
	}
}

/* Year progression */

export class YearProgression {
	yearDays: {
		[key: number]: {
			[key: number]: {
				[key: string]: number
			}
		}
	};
	yearStartTimestamp: number;
	yearEndTimestamp: number;

	constructor(todayDate: Date) {
		this.yearDays = [...Array(12).keys()].map((month) => {
			return {
				month: month,
				days: [...Array(new Date(todayDate.getFullYear(), month, 0).getDate()).keys()]
					.map(day => getDateStartTimestamp(
						new Date(todayDate.getFullYear(), month, day + 1)
					))
			}
		}).reduce<{[key: number]: {[key: number]: {}}}>((acc, val) => {
			const month: {[key: number]: {}} = {};

			for(const day of val.days) {
				month[day] = {
					[FlashcardStatus.FAILED]: 0,
					[FlashcardStatus.MIDDLE]: 0,
					[FlashcardStatus.SUCCESS]: 0
				}
			}

			acc[val.month] = month;
			return acc;
		}, {})

		this.yearStartTimestamp = Number(Object.keys(this.yearDays[0])[0]);
		const lastMonthDays = Object.keys(this.yearDays[11])
		this.yearEndTimestamp = Number(lastMonthDays[lastMonthDays.length - 1]) + 24 * 3600;
	}

	isTimestampInYear(dayTimestamp: number) {
		return this.yearStartTimestamp <= dayTimestamp && dayTimestamp <= this.yearEndTimestamp;
	}

	appendDay(dayTimestamp: number, dayData: DayData) {
		if(!this.isTimestampInYear(dayTimestamp)) {
			return;
		}

		for(const [month, days] of Object.entries(this.yearDays)) {
			for(const dayString of Object.keys(days)) {
				const day = Number(dayString);

				if(dayTimestamp <= day) {
					days[day][FlashcardStatus.FAILED] = dayData.statusCount[FlashcardStatus.FAILED]
					days[day][FlashcardStatus.MIDDLE] = dayData.statusCount[FlashcardStatus.MIDDLE]
					days[day][FlashcardStatus.SUCCESS] = dayData.statusCount[FlashcardStatus.SUCCESS]
				}
			}
		}
	}
}
