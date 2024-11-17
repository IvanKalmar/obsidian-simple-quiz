import {Results} from "./results";
import {Quiz, QuizArguments} from "./quiz";


export class FlashcardsManager {
	flashcards: Flashcard[];

	byID: {[key: string]: Flashcard};
	byPool: SortedFlashcards;
	byTag: SortedFlashcards;

	selectedPools: Set<string>;
	selectedTags: Set<string>;
	selectedFlashcards: Set<Flashcard>;

	constructor() {
		this.flashcards = [];
		this.byID = {};
		this.byPool = {};
		this.byTag = {};

		this.selectedPools = new Set();
		this.selectedTags = new Set();
		this.selectedFlashcards = new Set();
	}

	setFlashcards(flashcards: Flashcard[]) {
		this.flashcards = flashcards;

		this.byID = {};
		this.byPool = {};

		for (const flashcard of Array.from(this.flashcards)) {
			if(flashcard.id) {
				this.byID[flashcard.id] = flashcard;
			}

			if(flashcard.pool) {
				const pool = flashcard.pool;
				if (!this.byPool.hasOwnProperty(pool)) {
					this.byPool[pool] = [];
				}
				this.byPool[pool].push(flashcard);
			}

			if(flashcard.tags) {
				for (const tag of flashcard.tags) {
					if (!this.byTag.hasOwnProperty(tag)) {
						this.byTag[tag] = [];
					}
					this.byTag[tag].push(flashcard);
				}
			}
		}

		return this;
	}

	getQuizFlashcards(): Flashcard[] {
		if((this.selectedPools.size + this.selectedTags.size + this.selectedFlashcards.size) == 0) {
			return [];
		}

		let flashcardsSet: Set<Flashcard> = this.selectedFlashcards;

		for(const pool of this.selectedPools) {
			if(this.byPool.hasOwnProperty(pool)) {
				for(const flashcard of this.byPool[pool]) {
					flashcardsSet.add(flashcard);
				}
			}
		}

		for(const tag of this.selectedTags) {
			if(this.byTag.hasOwnProperty(tag)) {
				for(const flashcard of this.byTag[tag]) {
					flashcardsSet.add(flashcard);
				}
			}
		}

		return Array.from(flashcardsSet);
	}

	getQuiz(args: QuizArguments, results: Results): Quiz {
		const flashcards = this.getQuizFlashcards();
		return new Quiz()
			.setFlashcards(flashcards)
			.setArguments(args)
			.setResults(results);
	}

	getTotalCount() {
		return this.flashcards.length;
	}

	getPools() {
		return Object.keys(this.byPool);
	}

	getTags() {
		return Object.keys(this.byTag);
	}
}


export class Flashcard {
	id: string | null = null
	title: string | null = null
	question: FlashcardQuestion | null = null
	pool: string = 'cards'
	tags: string[] = []
	defaultSide: FlashcardSide = FlashcardSide.LEFT;
	notReversible: boolean = false;

	static from(object: object): Flashcard {
		let flashcard = Object.assign(new Flashcard(), object);

		if(!flashcard.id) {
			flashcard.id = require('crypto')
				.createHash('sha1')
				.update(JSON.stringify(flashcard.question))
				.digest('base64');
		}

		if(!flashcard.title) {
			let question = flashcard?.question;
			let title = flashcard.defaultSide == FlashcardSide.LEFT ? question?.left?.[0] : question?.right?.[0];
			flashcard.title = title ? title : ""
		}

		return flashcard;
	}

	isValid() {
		return !!this.question
	}
}


type SortedFlashcards = {
	[key: string]: Flashcard[];
};

export enum FlashcardSide {
	LEFT = "left",
	RIGHT = "right"
}

export class FlashcardQuestion {
	left: string[]
	right: string[]
}
