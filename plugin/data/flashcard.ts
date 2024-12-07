import {getStringHashCode} from "../utils";

export class FlashcardException extends Error {}

export class Flashcard {
	id: string
	question: FlashcardQuestion
	pool: string = 'cards'
	tags: string[] = []
	defaultSide: FlashcardSide = FlashcardSide.LEFT;
	notReversible: boolean = false;

	static from(object: object): Flashcard {
		let flashcard = Object.assign(new Flashcard(), object);

		if (!flashcard.id) {
			flashcard.id = `h${getStringHashCode(JSON.stringify(flashcard.question))}`;
		}

		return flashcard;
	}

	isValid() {
		return !!this.question
	}

	getDefaultTitle(): string {
		const title = this.question[this.defaultSide].first()
		return title ? title : "";
	}
}

export enum FlashcardSide {
	LEFT = "left",
	RIGHT = "right"
}

export class FlashcardQuestion {
	left: string[]
	right: string[]
}
