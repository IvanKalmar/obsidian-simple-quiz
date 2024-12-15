import {MarkdownPostProcessorContext, Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, SimpleQuizPluginSettings, SimpleQuizSettingTab} from "./settings";
import {Parser, ParserResult} from "./parser";
import {SimpleQuizModal} from "./modal";
import {DataController} from "./data/controllers/dataController";
import {ResultsController} from "./data/controllers/resultsController";
import {MarkdownCardsPlaceholderView} from "./views/markdown/cardsPlaceholder";
import {MarkdownTodayView, MarkdownTodayViewSettings} from "./views/markdown/today";
import {MarkdownQuizView, MarkdownQuizViewSettings} from "./views/markdown/quiz";
import {Flashcard} from "./data/flashcard";
import {GroupsController} from "./data/controllers/groupsController";
import {QuizViewSettings} from "./views/quiz";
import {MarkdownChartsView, MarkdownChartsViewSettings} from "./views/markdown/charts";


export default class SimpleQuizPlugin extends Plugin {
	settings: SimpleQuizPluginSettings;

	dataController: DataController;
	groupsController: GroupsController;
	resultsController: ResultsController;

	parser: Parser;

	async onload() {
		await this.loadSettings();

		this.parser = new Parser(this.app, this);

		this.dataController = new DataController().setPlugin(this);
		this.resultsController = new ResultsController().setPlugin(this);
		this.groupsController = new GroupsController().setPlugin(this);

		this.dataController.load().then(() => {
			return this.resultsController.load();
		}).then(() => {
			this.groupsController.load();
		});


		// Load JSON cards
		this.registerMarkdownCodeBlockProcessor(
			this.settings.dataJSONTag,
			this.getCardsBlockMarkdownProcessor((source) => this.parser.parseCardsJSON(source))
		);

		// JSON highlighting
		window.CodeMirror.defineMode(
			this.settings.dataJSONTag,
			config => window.CodeMirror.getMode(config, "application/json")
		);

		// Load JS cards
		if(this.settings.enableJS) {
			this.registerMarkdownCodeBlockProcessor(
				this.settings.dataJSTag,
				this.getCardsBlockMarkdownProcessor((source) => this.parser.parseCardsJS(source))
			);
		} else {
			this.registerMarkdownCodeBlockProcessor(
				this.settings.dataJSTag,
				(source, el, ctx) => {
					new MarkdownCardsPlaceholderView(el)
						.setError("JS scripts disabled, enable from settings")
						.render();
				}
			);
		}

		// JS highlighting
		window.CodeMirror.defineMode(
			this.settings.dataJSTag,
			config => window.CodeMirror.getMode(config, "text/javascript")
		);


		// Today tag
		this.registerMarkdownCodeBlockProcessor(
			this.settings.todayTag, (source_: string, el_: HTMLElement, ctx_: MarkdownPostProcessorContext) => {
				let settings = {};
				try {
					settings = JSON.parse(source_);
				} catch (e) { }

				let results = new MarkdownTodayView(el_)
					.setSettings(Object.assign(new MarkdownTodayViewSettings(), settings))
					.setDataController(this.dataController)
					.setResultsController(this.resultsController)
					.setOnOpen(() => { this.quizWithAllCards(); });

				results.render();
			});

		// Today json highlighting
		window.CodeMirror.defineMode(
			this.settings.todayTag,
			config => window.CodeMirror.getMode(config, "application/json")
		);


		// Charts tag
		this.registerMarkdownCodeBlockProcessor(
			this.settings.chartsTag, (source_: string, el_: HTMLElement, ctx_: MarkdownPostProcessorContext) => {
				let settings = {};
				try {
					settings = JSON.parse(source_);
				} catch (e) { }

				let charts = new MarkdownChartsView(el_)
					.setSettings(Object.assign(new MarkdownChartsViewSettings(), settings))
					.setDataController(this.dataController)
					.setResultsController(this.resultsController);

				charts.render();
			});

		// Charts json highlighting
		window.CodeMirror.defineMode(
			this.settings.chartsTag,
			config => window.CodeMirror.getMode(config, "application/json")
		);


		// Quiz tag
		this.registerMarkdownCodeBlockProcessor(
			this.settings.quizTag, async (source_: string, el_: HTMLElement, ctx_: MarkdownPostProcessorContext) => {
				let settings = {};
				try {
					settings = JSON.parse(source_);
				} catch (_) { }

				const markdownQuizViewSettings = Object.assign(new MarkdownQuizViewSettings(), settings);

				const quizViewSettings = new QuizViewSettings(
					this.settings.allowFullscreen,
					this.settings.soundFeedback,
					this.settings.vibrateFeedback
				);

				new MarkdownQuizView(el_)
					.setDataController(this.dataController)
					.setResultsController(this.resultsController)
					.setGroupsController(this.groupsController)
					.setParserResult(await this.dataController.getAllData(
						markdownQuizViewSettings.sources
					))
					.setMarkdownQuizViewSettings(markdownQuizViewSettings)
					.setQuizViewSettings(quizViewSettings)
					.render();
			});

		// Quiz json settings highlighting
		window.CodeMirror.defineMode(
			this.settings.quizTag,
			config => window.CodeMirror.getMode(config, "application/json")
		);


		this.addSettingTab(new SimpleQuizSettingTab(this.app, this));


		this.addRibbonIcon(
			'play',
			'Run quiz!',
			() => { this.quizWithAllCards(); }
		);

		this.addCommand({
			id: 'run-quiz',
			name: 'Run quiz!',
			callback: () => { this.quizWithAllCards(); }
		});
	}

	getCardsBlockMarkdownProcessor(parser: (source_: string) => Promise<ParserResult>):
		(source_: string, el_: HTMLElement, ctx_: MarkdownPostProcessorContext) => void {
		return async (source, el, ctx) => {
			if(!this.settings.showCardsPlaceholder) {
				return;
			}

			const view = new MarkdownCardsPlaceholderView(el)
				.setMinify(this.settings.minifyCardPlaceholder);

			new Promise(async (resolve, reject) => {
				try {
					resolve((await parser(source)).flashcards);
				} catch (e) { reject(e.toString()); }
			}).then((flashcards: Flashcard[]) => {
				view.setFlashcards(flashcards).setOnOpen(() => {
					this.openQuizModal(flashcards);
				});
			}).catch((error) => {
				view.setError(error);
			}).finally(() => {
				view.render();
			});
		}
	}

	async quizWithAllCards() {
		const flashcards  = (await this.dataController.getAllData()).flashcards;
		this.openQuizModal(flashcards);
	}

	openQuizModal(flashcards: Flashcard[]) {
		new SimpleQuizModal(this.app, this, flashcards).open();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
		await this.resultsController.setEnabled(this.settings.saveResults);
	}
}


