import {MarkdownPostProcessorContext, Plugin} from 'obsidian';
import {Flashcard} from "./data/flashcards";
import {DEFAULT_SETTINGS, SimpleQuizPluginSettings, SimpleQuizSettingTab} from "./settings";
import {Parser} from "./parser";
import {SimpleQuizModal} from "./modal/modal";
import {DataController} from "./data/controller";
import {Results} from "./data/results";
import {MarkdownPlaceholderBlockView, MarkdownResultsView} from "./markdown";
import {Index} from "./data";


export default class SimpleQuizPlugin extends Plugin {
	settings: SimpleQuizPluginSettings;

	parser: Parser;
	dataController: DataController;

	index: Index;
	results: Results;

	async onload() {
		await this.loadSettings();

		this.parser = new Parser(this.app, this);
		this.dataController = new DataController(this.app, this);

		this.index = new Index(this.dataController, this.settings.indexing);
		this.results = new Results(this.dataController, this.settings.saveResults);

		this.registerMarkdownCodeBlockProcessor(
			this.settings.dataJSONTag,
			this.getMarkdownCodeBlockProcessor((source) => this.parser.parseCardsJSON(source))
		);

		window.CodeMirror.defineMode(this.settings.dataJSONTag,
			config => window.CodeMirror.getMode(config, "application/json"));

		if(this.settings.enableJS) {
			this.registerMarkdownCodeBlockProcessor(
				this.settings.dataJSTag,
				this.getMarkdownCodeBlockProcessor((source) => this.parser.parseCardsJS(source))
			);
		} else {
			this.registerMarkdownCodeBlockProcessor(
				this.settings.dataJSTag,
				(source, el, ctx) => {
					el.setText("JS scripts disabled, enable from settings")
				}
			);
		}


		window.CodeMirror.defineMode(this.settings.dataJSTag,
			config => window.CodeMirror.getMode(config, "text/javascript"));

		this.registerMarkdownCodeBlockProcessor(this.settings.todayStatisticsTag,
			(source_: string, el_: HTMLElement, ctx_: MarkdownPostProcessorContext) => {
				let results = new MarkdownResultsView(el_)
					.setResults(this.results)
					.setOnOpen(async () => {
						this.openQuizModal(await this.dataController.loadAllFlashcards())
					});

				if(this.results) {
					results.setResults(this.results)
				}

				results.render();
			});

		this.addSettingTab(new SimpleQuizSettingTab(this.app, this));

		const runQuiz = async () => {
			this.openQuizModal(
				this.settings.indexing ?
					this.index.getFlashcards() :
					await this.dataController.loadAllFlashcards()
			);
		}

		this.addRibbonIcon('play', 'Run quiz!', runQuiz);

		this.addCommand({
			id: 'run-quiz',
			name: 'Run quiz!',
			callback: runQuiz
		});
	}

	getMarkdownCodeBlockProcessor(parser: (source_: string) => AsyncGenerator<Flashcard>):
		(source_: string, el_: HTMLElement, ctx_: MarkdownPostProcessorContext) => void {
		return (source, el, ctx) => {
			const flashcardsPromise: Promise<Flashcard[]> = new Promise(async (resolve, reject) => {
				let flashcards: Flashcard[] = [];

				try {
					for await (const flashcard of parser(source)) {
						flashcards.push(flashcard);
					}
				} catch (e) { reject(e.toString()); }

				resolve(flashcards)
			});

			if(this.settings.showCardsPlaceholder) {
				const markdownView = new MarkdownPlaceholderBlockView(el);
				flashcardsPromise.then((flashcards: Flashcard[]) => {
					markdownView.setFlashcards(flashcards).setOnOpen(() => {
						this.openQuizModal(flashcards);
					})
				}).catch((error) => {
					console.error(error);
					markdownView.setError(error);
				}).finally(() => {
					markdownView.render();
				})
			}
		}
	}

	openQuizModal(flashcards: Flashcard[]) {
		new SimpleQuizModal(this.app, this, flashcards).open();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.index.setIndexing(this.settings.indexing);
		this.results.setSaveResults(this.settings.saveResults);
	}
}


