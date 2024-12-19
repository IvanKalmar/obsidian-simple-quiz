import {ResultsController} from "./controllers/resultsController";

import {Flashcard, FlashcardSide, FlashcardType} from "./flashcard";
import {FlashcardsManager} from "./flashcardsManager";


export type QuizQuestionHandler = (question: QuizQuestion) => boolean | null;


export class Quiz {
	resultsController: ResultsController;
	quizArguments: QuizArguments;

	constructor(resultsController: ResultsController, quizArguments: QuizArguments) {
		this.resultsController = resultsController;
		this.quizArguments = quizArguments;
	}

	getQuestions() {
		let flashcards = this.quizArguments.flashcardsManager.getQuizFlashcards();

		if (this.resultsController) {
			flashcards = flashcards.map(flashcard => {
				return {
					flashcard: flashcard,
					score: this.resultsController.getCardScore(flashcard.id),
					lastQuizAt: this.resultsController.getCardLastQuizTimestamp(flashcard.id)
				}
			}).sort((a, b) => {
				if (a.score < b.score) {
					return -1;
				} else if (a.score > b.score) {
					return 1;
				}

				if(a.lastQuizAt < b.lastQuizAt) {
					return 1;
				} else if(a.lastQuizAt > b.lastQuizAt) {
					return -1;
				}

				return 0;
			}).map(flashcard => {
				return flashcard.flashcard;
			});
		} else {
			flashcards.shuffle();
		}

		let questions: QuizQuestion[] = [];

		for (const flashcard of flashcards.slice(0, this.quizArguments.questionsCount)) {
			if (flashcard.notReversible) {
				questions.push(new QuizQuestion(
					flashcard,
					flashcard.defaultSide
				));
			} else {
				questions.push(new QuizQuestion(
					flashcard,
					FlashcardSide.LEFT
				));

				questions.push(new QuizQuestion(
					flashcard,
					FlashcardSide.RIGHT
				));
			}
		}

		questions.shuffle();

		return questions;
	}

	calculateResult(questions: QuizQuestion[]) {
		let result = new QuizResult();
		result.questions = questions.map(question => {
			question.result = this.compareAnswer(question);
			return question;
		});
		result.completedAt = new Date();
		return result;
	}

	compareAnswer(question: QuizQuestion): boolean {
		if (!question.flashcard.question) {
			return false;
		}

		if(!question.answer) {
			return false;
		}

		switch (question.flashcard.type) {
			case FlashcardType.INPUT: {
				return this._compareInput(question);
			}
			case FlashcardType.MANUAL: {
				return this._compareManual(question);
			}
		}

		return false;
	}

	_compareInput(question: QuizQuestion): boolean {
		let userAnswer = question.answer.toLocaleLowerCase().trim();
		const answers = (question.side == FlashcardSide.LEFT ?
			question.flashcard.question.right : question.flashcard.question.left).map(answer => {
			return answer.toLocaleLowerCase().trim();
		});

		for (const answer of answers) {
			if (answer == userAnswer) {
				return true;
			}
		}

		return false;
	}

	_compareManual(question: QuizQuestion): boolean {
		return Boolean(question.answer);
	}
}

export class QuizArguments {
	flashcardsManager: FlashcardsManager;
	questionsCount: number;

	constructor(flashcardsManager: FlashcardsManager, questionsCount: number) {
		this.flashcardsManager = flashcardsManager;
		this.questionsCount = questionsCount;
	}
}


export class QuizQuestion {
	flashcard: Flashcard;
	side: FlashcardSide
	answer: any | null;
	result: boolean;

	constructor(flashcard: Flashcard, side: FlashcardSide) {
		this.flashcard = flashcard;
		this.side = side;
		this.answer = null;
	}

	setAnswer(answer: any) {
		this.answer = answer;
	}
}


export class QuizResult {
	questions: QuizQuestion[];
	completedAt: Date;

	getFlashcardsIDs(): string[] {
		const flashcardsIDs = new Set<string>();
		for(const question of this.questions) {
			flashcardsIDs.add(question.flashcard.id);
		}

		return Array.from(flashcardsIDs);
	}
}
