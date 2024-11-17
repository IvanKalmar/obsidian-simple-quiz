import {DataController} from "./controller";

import {QuizResult} from "./quiz";


export class Results {
	dataController: DataController;
	resultsData: ResultsData;

	saveResults: boolean;

	constructor(dataController: DataController, saveResults: boolean) {
		this.dataController = dataController;
		this.saveResults = saveResults;
		this.resultsData = new ResultsData();

		if(this.saveResults) {
			this.dataController.loadResultsObject().then((resultsObject) => {
				if(resultsObject) {
					this.resultsData = Object.assign(new ResultsData(), resultsObject);
				} else {
					this.dataController.saveResultsObject(this.resultsData).then();
				}
			});
		}
	}

	setSaveResults(saveResults: boolean) {
		this.saveResults = saveResults;
	}

	appendQuizResult(quizResult: QuizResult) {
		if(!this.saveResults) {
			return;
		}

		let quizData = new QuizData();
		quizData.completedAt = Math.floor( (+ quizResult.completedAt) / 1000);
		quizData.successfulQuestions = 0
		quizData.failedQuestions = 0;
		quizData.cards = [];
		for(const question of quizResult.questions) {
			if(question.result) {
				quizData.successfulQuestions += 1
			} else {
				quizData.failedQuestions += 1
			}

			let flashcardID = question.flashcard.id;
			if(flashcardID) {
				quizData.cards.push(flashcardID);

				if(!this.resultsData.cardsData.hasOwnProperty(flashcardID)) {
					let cardData = new CardData();
					cardData.successfulAttempts = 0;
					cardData.failedAttempts = 0;
					cardData.score = 0;
					cardData.lastQuizAt = -1;
					this.resultsData.cardsData[flashcardID] = cardData;
				}

				if(question.result) {
					this.resultsData.cardsData[flashcardID].successfulAttempts += 1;
				} else {
					this.resultsData.cardsData[flashcardID].failedAttempts += 1;
				}
				this.resultsData.cardsData[flashcardID].lastQuizAt =Math.floor(  (+ quizResult.completedAt) / 1000);

				this.resultsData.cardsData[flashcardID].score =
					this.resultsData.cardsData[flashcardID].successfulAttempts /
					(
						this.resultsData.cardsData[flashcardID].successfulAttempts +
						this.resultsData.cardsData[flashcardID].failedAttempts
					);
			}
		}
		quizData.score = quizData.successfulQuestions / (quizData.successfulQuestions + quizData.failedQuestions);
		this.resultsData.quizzesData.push(quizData);
		this.dataController.saveResultsObject(this.resultsData).then();
	}

	getToday(): Today {
		let today = new Today();

		if(!this.saveResults) {
			return today;
		}

		const dates = getWeekDates(new Date());
		today.streakDays = [
			new StreakDay(dates[0], StreakDayTitle.MONDAY, StreakDayStatus.MISSED),
			new StreakDay(dates[1], StreakDayTitle.TUESDAY, StreakDayStatus.MISSED),
			new StreakDay(dates[2], StreakDayTitle.WEDNESDAY, StreakDayStatus.MISSED),
			new StreakDay(dates[3], StreakDayTitle.THURSDAY, StreakDayStatus.MISSED),
			new StreakDay(dates[4], StreakDayTitle.FRIDAY, StreakDayStatus.MISSED),
			new StreakDay(dates[5], StreakDayTitle.SATURDAY, StreakDayStatus.MISSED),
			new StreakDay(dates[6], StreakDayTitle.SUNDAY, StreakDayStatus.MISSED)
		];
		const weekStartTime = getDateStartTimestamp(dates[0]);
		const fillStreakDays = (timestamp: number) => {
			if(timestamp < weekStartTime) {
				return;
			}
			for(const streakDay of today.streakDays) {
				const dateStart = getDateStartTimestamp(streakDay.date);
				const dateEnd = getDateStartTimestamp(streakDay.date) + 24 * 3600;
				if(dateStart <= timestamp && timestamp <= dateEnd) {
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

		for(let i = this.resultsData.quizzesData.length - 1; i >= 0; i--) {
			let quizData = this.resultsData.quizzesData[i];

			fillStreakDays(quizData.completedAt);

			if(isToday(quizData.completedAt)) {
				today.quizzesToday += 1;
				for(const card of quizData.cards) {
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

	getCardScore(flashcardID: string | null): number {
		if(!this.saveResults) {
			return -1;
		}

		if(!flashcardID) {
			return -1;
		}

		let score = 0;
		let data = this.resultsData.cardsData[flashcardID];
		if(data) {
			score = data.score;
			if((((+ new Date()) / 1000) - this.resultsData.cardsData[flashcardID].lastQuizAt) > 7 * 24 * 3600) {
				score -= 0.5;
			}
		}

		return score;
	}

	async clear() {
		this.resultsData = new ResultsData();
		await this.dataController.saveResultsObject(new ResultsData());
	}
}

function getDateStartTimestamp(d: Date = new Date()): number {
	d.setHours(0);
	d.setMinutes(0);
	d.setSeconds(0);
	d.setMilliseconds(0);
	return Math.floor(+ d / 1000);
}

function getWeekDates(date: Date) {
	let dateCopy = new Date(date);

	const day = dateCopy.getDay();
	const diff = date.getDate() - day + (day === 0 ? -6 : 1);

	dateCopy.setDate(diff);
	dateCopy.setHours(0);
	dateCopy.setMinutes(0);
	dateCopy.setSeconds(0);
	dateCopy.setMilliseconds(0);

	return [
		new Date(dateCopy),
		new Date(+ dateCopy + 1 * 24 * 3600 * 1000),
		new Date(+ dateCopy + 2 * 24 * 3600 * 1000),
		new Date(+ dateCopy + 3 * 24 * 3600 * 1000),
		new Date(+ dateCopy + 4 * 24 * 3600 * 1000),
		new Date(+ dateCopy + 5 * 24 * 3600 * 1000),
		new Date(+ dateCopy + 6 * 24 * 3600 * 1000),
	]
}

export class Today {
	streak: number
	streakDays: StreakDay[]
	cardsToday: number
	quizzesToday: number

	constructor(streak: number = 0, streakDays: StreakDay[] = [], cardsToday: number = 0, quizzesToday: number = 0) {
		this.streak = streak;
		this.streakDays = streakDays;
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
}

class ResultsData {
	cardsData: {[key: string]: CardData} = {};
	quizzesData: QuizData[]

	constructor() {
		this.cardsData = {};
		this.quizzesData = [];
	}
}

class QuizData {
	completedAt: number;
	successfulQuestions: number;
	failedQuestions: number;
	score: number;
	cards: string[];
}

class CardData {
	successfulAttempts: number;
	failedAttempts: number;
	lastQuizAt: number;
	score: number;
}
