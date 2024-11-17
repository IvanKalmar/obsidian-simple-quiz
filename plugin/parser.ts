import {Flashcard} from "./data/flashcards";
import SimpleQuizPlugin from "./plugin";
import {App} from "obsidian";

export class Parser {
	plugin: SimpleQuizPlugin;

	JSON_BLOCK_REGEX: RegExp
	JS_BLOCK_REGEX: RegExp

	constructor(app: App, plugin: SimpleQuizPlugin) {
		this.plugin = plugin;

		this.JSON_BLOCK_REGEX = new RegExp("\`{3}" +
			`${this.plugin.settings.dataJSONTag}` + "\\s+[\\s\\S]*?\`{3}", 'igm');
		this.JS_BLOCK_REGEX = new RegExp("\`{3}" +
			`${this.plugin.settings.dataJSTag}` + "\\s+[\\s\\S]*?\`{3}", 'igm');
	}

	async parseFile(file: string): Promise<Flashcard[]> {
		let flashcards: Flashcard[] = [];

		for (const cardsRegExp of file.matchAll(this.JSON_BLOCK_REGEX)) {
			let cards = cardsRegExp.toString().trim();
			cards = cards.substring(this.plugin.settings.dataJSONTag.length  + 3, cards.length - 3).trim();
			for await (const flashcard of this.parseCardsJSON(cards)) {
				flashcards.push(flashcard)
			}
		}

		for (const cardsRegExp of file.matchAll(this.JS_BLOCK_REGEX)) {
			let cards = cardsRegExp.toString().trim();
			cards = cards.substring(this.plugin.settings.dataJSTag.length + 3, cards.length - 3).trim();
			for await (const flashcard of this.parseCardsJS(cards)) {
				flashcards.push(flashcard)
			}
		}
		return flashcards;
	}

	async *parseCardsJSON(data: string) {
		for (const card of JSON.parse(data)) {
			let flashcard = Flashcard.from(card)
			if(flashcard.isValid()) {
				yield flashcard;
			}
		}
	}

	async *parseCardsJS(data: string) {
		for(const flashcard of await eval_(data)) {
			yield flashcard;
		}
	}
}

async function eval_(code_: string): Promise<Flashcard[]> {
	const code = `
		new Promise(async (resolve, reject) => {
			let flashcards = await (async () => {
				${code_}
			})();
			resolve(flashcards);
		});
	`;

	let result: Promise<any> = eval(code);

	return result.then((flashcardsObjects: object[]) => {
		let flashcards = [];

		for(const flashcardObject of flashcardsObjects) {
			let f = Flashcard.from(flashcardObject);
			if(f.isValid()) {
				flashcards.push(f);
			}
		}

		return flashcards;
	}).catch(() => {
		return [];
	});
}
