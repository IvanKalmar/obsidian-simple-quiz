import {getStringHashCode} from "../utils";
import {Facet} from "@codemirror/state";

export class FlashcardException extends Error {}

export class Flashcard {
	id: string
	type: FlashcardType = FlashcardType.INPUT;
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
		if(!this.question) {
			return false;
		}

		switch (this.type) {
			case FlashcardType.INPUT:
			case FlashcardType.MANUAL: {
				if(!this.question.hasOwnProperty("left")) {
					return false;
				}

				if(!this.question.hasOwnProperty("right")) {
					return false;
				}

				if(this.question.left.length == 0 || this.question.right.length == 0){
					return false;
				}

				return true;
			}
		}
	}

	getDefaultTitle(): string {
		const title = this.question[this.defaultSide].first()
		return title ? title : "";
	}
}

export enum FlashcardType {
	INPUT = "input",
	MANUAL = "manual",
}

export enum FlashcardSide {
	LEFT = "left",
	RIGHT = "right"
}

export class FlashcardQuestion {
	left: string[]
	right: string[]
}
