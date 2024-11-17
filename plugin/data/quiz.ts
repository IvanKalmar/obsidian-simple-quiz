import {Results} from "./results";
import {Flashcard, FlashcardSide} from "./flashcards";


export class Quiz {
	flashcards: Flashcard[];
	arguments: QuizArguments | null;
	results: Results | null;

	constructor() {
		this.flashcards = [];
		this.arguments = null;
		this.results = null;
	}

	setFlashcards(flashcards: Flashcard[]): this {
		this.flashcards = flashcards;
		return this;
	}

	setArguments(args: QuizArguments): this {
		this.arguments = args;
		return this
	}

	setResults(results: Results): this {
		this.results = results;
		return this;
	}

	getQuestions() {
		let flashcards = this.flashcards;

		const results = this.results;
		if (results) {
			flashcards.sort((a, b) => {
				let aScore = results.getCardScore(a.id);
				let bScore = results.getCardScore(b.id);

				if (aScore < bScore) {
					return -1;
				} else if (aScore > bScore) {
					return 1;
				}
				return 0;
			})
		} else {
			flashcards.shuffle();
		}

		if (this.arguments) {
			flashcards = flashcards.slice(0, this.arguments.questionsCount);
		}

		let questions: QuizQuestion[] = [];

		for (const flashcard of flashcards) {
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

	getQuestionTitle(): string {
		return this.flashcard.title ? this.flashcard.title : "";
	}

	setAnswer(answer: any) {
		this.answer = answer;
	}
}


export class QuizArguments {
	questionsCount: number

	constructor() {
		this.questionsCount = 0;
	}

	setQuestionsCount(questionsCount: number) {
		this.questionsCount = questionsCount;
		return this;
	}
}


export class QuizResult {
	questions: QuizQuestion[];
	completedAt: Date;
}


export class QuizParams {
	selectedPools: Set<string>;
	selectedTags: Set<string>;
	selectedFlashcards: Set<string>;
	questionsCount: number;

	constructor(selectedPools: Set<string> = new Set(), selectedTags: Set<string> = new Set(),
				selectedFlashcards: Set<string> = new Set(), questionsCount: number = 1) {
		this.selectedPools = selectedPools;
		this.selectedTags = selectedTags;
		this.selectedFlashcards = selectedFlashcards;
		this.questionsCount = questionsCount;
	}

	static from(object: object): QuizParams {
		let quizParams = Object.assign(new QuizParams(), object);

		quizParams.selectedPools = new Set(quizParams.selectedPools);
		quizParams.selectedTags = new Set(quizParams.selectedTags);
		quizParams.selectedFlashcards = new Set(quizParams.selectedFlashcards);
		quizParams.questionsCount = Number(quizParams.questionsCount);

		return quizParams;
	}

	to() {
		return {
			selectedPools: Array.from(this.selectedPools),
			selectedTags: Array.from(this.selectedTags),
			selectedFlashcards: Array.from(this.selectedFlashcards),
			questionsCount: this.questionsCount,
		}
	}
}
