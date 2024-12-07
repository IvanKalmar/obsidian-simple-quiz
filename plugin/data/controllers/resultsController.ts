import {DataController} from "./dataController";

import {QuizResult} from "../quiz";
import {getDateStartTimestamp, getWeekDates, round} from "../../utils";
import {Controller} from "./controller";
import {Notice} from "obsidian";


export class ResultsController extends Controller {
	dataController: DataController;

	lowestCardThreshold: number;
	minimumCardNonRepetitionTime: number;
	maximumCardNonRepetitionTime: number;

	data: ResultsData;
	enabled: boolean;

	async load(): Promise<void> {
		this.dataController = this.plugin.dataController;
		this.enabled = this.plugin.settings.saveResults;

		this.lowestCardThreshold = this.plugin.settings.lowestCardThreshold;
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

	async appendQuizResult(quizResult: QuizResult) {
		if(!this.enabled) {
			return;
		}

		const quizCompletedAt = Math.floor( (+ quizResult.completedAt) / 1000);  // timestamp

		const quizFlashcards = new Set<string>;

		let quizData = new QuizData();
		quizData.completedAt = quizCompletedAt;
		for(const question of quizResult.questions) {
			const flashcardID = question.flashcard.id;

			quizFlashcards.add(flashcardID);

			if(!this.data.flashcards.hasOwnProperty(flashcardID)) {
				this.data.flashcards[flashcardID] = new CardData();
			}

			const flashcardData = this.data.flashcards[flashcardID];

			if(question.result) {
				quizData.successfulQuestions += 1
				flashcardData.successfulAttempts += 1;
			} else {
				quizData.failedQuestions += 1
				flashcardData.failedAttempts += 1;
			}

			flashcardData.lastQuizAt = quizCompletedAt;

			flashcardData.score = round(
				flashcardData.successfulAttempts /
				(flashcardData.successfulAttempts + flashcardData.failedAttempts)
			);
		}

		quizData.score = round(
			quizData.successfulQuestions /
			(quizData.successfulQuestions + quizData.failedQuestions)
		);

		quizData.flashcards = Array.from(quizFlashcards);

		this.data.last = Array.from(quizFlashcards);
		this.data.quizzes.push(quizData);

		await this.dataController.saveResultsObject(this.data);
	}

	getLowestScoreFlashcardsIDs(): string[] {
		return Object.keys(this.data.flashcards)
			.map(flashcardID => {
				return {
					flashcardID: flashcardID,
					score: this.getCardScore(flashcardID)
				}
			}).filter(flashcardData => {
				return flashcardData.score < this.lowestCardThreshold;
			}).map(flashcardData => {
				return flashcardData.flashcardID;
			});
	}

	getLastFlashcardsIDs(): string[] {
		return this.data.last;
	}

	getTodayResults(): TodayResults {
		let today = new TodayResults();

		if(!this.enabled) {
			return today;
		}

		const weekDates = getWeekDates(new Date());
		const weekStartTime = getDateStartTimestamp(weekDates[0]);

		today.streakDays = [
			new StreakDay(weekDates[0], StreakDayTitle.MONDAY, StreakDayStatus.MISSED),
			new StreakDay(weekDates[1], StreakDayTitle.TUESDAY, StreakDayStatus.MISSED),
			new StreakDay(weekDates[2], StreakDayTitle.WEDNESDAY, StreakDayStatus.MISSED),
			new StreakDay(weekDates[3], StreakDayTitle.THURSDAY, StreakDayStatus.MISSED),
			new StreakDay(weekDates[4], StreakDayTitle.FRIDAY, StreakDayStatus.MISSED),
			new StreakDay(weekDates[5], StreakDayTitle.SATURDAY, StreakDayStatus.MISSED),
			new StreakDay(weekDates[6], StreakDayTitle.SUNDAY, StreakDayStatus.MISSED)
		];

		const fillStreakDays = (timestamp: number) => {
			if(timestamp < weekStartTime) {
				return;
			}

			for(const streakDay of today.streakDays) {
				if(streakDay.isTimestampInDay(timestamp)) {
					streakDay.status = StreakDayStatus.DONE;
				}
			}
		}

		const todayStartTime = getDateStartTimestamp();
		const todayEndTime = getDateStartTimestamp() + 24 * 3600;

		const isToday = (timestamp: number) => {
			return (todayStartTime <= timestamp) && (timestamp <= todayEndTime);
		}

		for(const streakDay of today.streakDays) {
			if(getDateStartTimestamp(streakDay.date) > todayStartTime) {
				streakDay.status = StreakDayStatus.NEXT;
			}
			if(getDateStartTimestamp(streakDay.date) == todayStartTime) {
				streakDay.status = StreakDayStatus.CURRENT;
			}
		}

		let streakContinue = true;
		let currentStreakDayStartTime = todayStartTime;
		let currentStreakDayEndTime = todayEndTime;
		const isInStreak = (timestamp: number) => {
			return timestamp >= currentStreakDayStartTime && timestamp <= currentStreakDayEndTime
		}

		today.quizzesToday = 0;
		today.streak = 0;

		let cardsToday: Set<string> = new Set();

		for(let i = this.data.quizzes.length - 1; i >= 0; i--) {
			let quizData = this.data.quizzes[i];

			fillStreakDays(quizData.completedAt);

			if(isToday(quizData.completedAt)) {
				today.quizzesToday += 1;
				for(const card of quizData.flashcards) {
					cardsToday.add(card);
				}
			}

			if(isInStreak(quizData.completedAt)) {
				today.streak += 1;
				currentStreakDayStartTime -= 24 * 3600;
				currentStreakDayEndTime -= 24 * 3600;
			} else {
				streakContinue = false;
			}

			if(!streakContinue && quizData.completedAt < weekStartTime) {
				break;
			}
		}

		today.cardsToday = cardsToday.size;

		return today;
	}

	getCardScore(flashcardID: string): number {
		if(!this.enabled) {
			return -1;
		}

		let score = 0;
		if(!this.data.flashcards.hasOwnProperty(flashcardID)) {
			return score;
		}

		let data = this.data.flashcards[flashcardID];
		if(data) {
			score = data.score;

			const todayTimestamp = + new Date() / 1000;
			const cardNonRepetitionTime = todayTimestamp - data.lastQuizAt;

			if(cardNonRepetitionTime > this.minimumCardNonRepetitionTime) {
				score -= cardNonRepetitionTime / this.maximumCardNonRepetitionTime;
			}
		}

		return score < 0 ? 0 : (score > 1 ? 1 : score);
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


class ResultsData {
	last: string[]; // Flashcards IDs
	flashcards: {[key: string]: CardData};
	quizzes: QuizData[]

	constructor() {
		this.last = [];
		this.flashcards = {};
		this.quizzes = [];
	}
}

class CardData {
	successfulAttempts: number;
	failedAttempts: number;
	score: number;
	lastQuizAt: number;

	constructor(successfulAttempts: number = 0, failedAttempts: number = 0, score: number = 0, lastQuizAt: number = 0) {
		this.successfulAttempts	= successfulAttempts;
		this.failedAttempts = failedAttempts;
		this.score = score;
		this.lastQuizAt = lastQuizAt;
	}
}

class QuizData {
	flashcards: string[]; // Flashcards IDs
	successfulQuestions: number;
	failedQuestions: number;
	score: number;
	completedAt: number;

	constructor(flashcards: string[] = [], successfulQuestions: number = 0, failedQuestions = 0,
				score: number = 0, completedAt: number = 0) {
		this.flashcards = flashcards;
		this.successfulQuestions = successfulQuestions;
		this.failedQuestions = failedQuestions;
		this.score = score;
		this.completedAt = completedAt;
	}
}


export class TodayResults {
	streakDays: StreakDay[]
	streak: number
	cardsToday: number
	quizzesToday: number

	constructor(streakDays: StreakDay[] = [], streak: number = 0, cardsToday: number = 0, quizzesToday: number = 0) {
		this.streakDays = streakDays;
		this.streak = streak;
		this.cardsToday = cardsToday;
		this.quizzesToday = quizzesToday;
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

export class StreakDay {
	date: Date
	day: StreakDayTitle
	status: StreakDayStatus

	constructor(date: Date, day: StreakDayTitle, status: StreakDayStatus) {
		this.date = date;
		this.day = day;
		this.status = status;
	}

	isTimestampInDay(timestamp: number): boolean {
		const dateStart = getDateStartTimestamp(this.date);
		const dateEnd = getDateStartTimestamp(this.date) + 24 * 3600;
		return dateStart < timestamp && timestamp < dateEnd;
	}
}
