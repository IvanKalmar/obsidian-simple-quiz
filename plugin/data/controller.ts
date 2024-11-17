import {App, normalizePath} from "obsidian";
import SimpleQuizPlugin from "../plugin";
import {Flashcard} from "./flashcards";

export class DataController{
	app: App;
	plugin: SimpleQuizPlugin;

	pluginFolder: string;
	indexFile: string;
	resultsFile: string;
	paramsFile: string;

	constructor(app: App, plugin: SimpleQuizPlugin) {
		this.app = app;
		this.plugin = plugin;

		this.pluginFolder = normalizePath(this.app.vault.configDir + "/plugins/simple-quiz");

		this.indexFile = normalizePath(this.pluginFolder + "/index.json");
		this.resultsFile = normalizePath(this.pluginFolder + "/results.json");
		this.paramsFile = normalizePath(this.pluginFolder + "/params.json");
	}

	async loadAllFlashcards (): Promise<Flashcard[]> {
		let flashcards: Flashcard[] = [];
		for(const file of this.app.vault.getFiles()) {
			flashcards = [
				...flashcards,
				...await this.plugin.parser.parseFile(await this.app.vault.read(file))
			]
		}

		return flashcards;
	}

	async loadIndexObject(): Promise<object> {
		return await this.loadFile(this.indexFile);
	}

	async saveIndexObject(obj: object): Promise<void> {
		await this.saveFile(this.indexFile, obj);
	}

	async loadResultsObject(): Promise<object> {
		return await this.loadFile(this.resultsFile);
	}

	async saveResultsObject(obj: object): Promise<void> {
		await this.saveFile(this.resultsFile, obj);
	}

	async loadQuizParamsObject(): Promise<object> {
		return await this.loadFile(this.paramsFile);
	}

	async saveQuizParamsObject(obj: object): Promise<void> {
		await this.saveFile(this.paramsFile, obj);
	}

	async saveFile(file: string, data: object): Promise<void> {
		await this.app.vault.adapter.write(file, JSON.stringify(data));
	}

	async loadFile(file: string): Promise<any | null> {
		try {
			return JSON.parse(await this.app.vault.adapter.read(file));
		} catch (e) { }

		return null;
	}
}
