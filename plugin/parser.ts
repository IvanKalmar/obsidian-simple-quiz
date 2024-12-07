import SimpleQuizPlugin from "./plugin";
import {App} from "obsidian";
import {QuizQuestionHandler} from "./data/quiz";
import {Flashcard, FlashcardException} from "./data/flashcard";


export class Parser {
	plugin: SimpleQuizPlugin;

	JSON_BLOCK_REGEX: RegExp
	JS_BLOCK_REGEX: RegExp

	constructor(app: App, plugin: SimpleQuizPlugin) {
		this.plugin = plugin;

		this.JSON_BLOCK_REGEX = new RegExp(
			"\`{3}" + `${this.plugin.settings.dataJSONTag}` + "\\s+[\\s\\S]*?\`{3}",
			'igm'
		);
		this.JS_BLOCK_REGEX = new RegExp(
			"\`{3}" + `${this.plugin.settings.dataJSTag}` + "\\s+[\\s\\S]*?\`{3}",
			'igm'
		);
	}

	async parseFile(file: string): Promise<ParserResult> {
		let parserResult = new ParserResult([], []);

		for (const cardsRegExp of file.matchAll(this.JSON_BLOCK_REGEX)) {
			let cards = cardsRegExp.toString().trim();
			cards = cards.substring(this.plugin.settings.dataJSONTag.length  + 3, cards.length - 3).trim();
			parserResult.append(await this.parseCardsJSON(cards));
		}

		if(this.plugin.settings.enableJS) {
			for (const cardsRegExp of file.matchAll(this.JS_BLOCK_REGEX)) {
				let cards = cardsRegExp.toString().trim();
				cards = cards.substring(this.plugin.settings.dataJSTag.length + 3, cards.length - 3).trim();
				parserResult.append(await this.parseCardsJS(cards));
			}
		}

		return parserResult;
	}

	async parseCardsJSON(data: string): Promise<ParserResult> {
		let flashcards = [];
		for (const card of JSON.parse(data)) {
			let flashcard = Flashcard.from(card)
			if(flashcard.isValid()) {
				flashcards.push(flashcard);
			}
		}

		return new ParserResult(flashcards, []);
	}

	async parseCardsJS(data: string): Promise<ParserResult> {
		if(!this.plugin.settings.enableJS) {
			return new ParserResult([], []);
		}

		return await eval_(data);
	}
}

export class ParserResult {
	flashcards: Flashcard[];
	handlers: QuizQuestionHandler[];

	constructor(flashcards: Flashcard[], handlers: QuizQuestionHandler[]) {
		this.flashcards = flashcards;
		this.handlers = handlers;
	}

	append(parserResult: ParserResult): this {
		this.flashcards = this.flashcards.concat(parserResult.flashcards);
		this.handlers = this.handlers.concat(parserResult.handlers);
		return this;
	}
}

async function eval_(code_: string): Promise<ParserResult> {
	return new Promise((resolve, reject) => {
		const fc = new (class {
			flashcards: Flashcard[] = [];
			handlers: QuizQuestionHandler[] = [];

			addCard(obj: Object) {
				let flashcard = Flashcard.from(obj);
				if(flashcard.isValid()) {
					this.flashcards.push(flashcard);
				} else {
					throw new FlashcardException("Invalid flashcard");
				}
			}

			addHandler(handler: QuizQuestionHandler) {
				this.handlers.push(handler);
			}

			commit() {
				resolve(new ParserResult(this.flashcards, this.handlers));
			}
		}) ();

		eval(`"use strict";\n${code_}`);
	})
}
