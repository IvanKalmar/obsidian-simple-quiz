import {App, Modal, Notice} from "obsidian";
import {Flashcard, FlashcardsManager} from "../data/flashcards";
import SimpleQuizPlugin from "../plugin";
import {ModalIndexPageView} from "./index";
import {ModalQuizPageView} from "./quiz";
import {ModalResultsPageView} from "./results";
import {QuizParams} from "../data/quiz";
import {notEmpty} from "../utils";


export class SimpleQuizModal extends Modal {
	baseTitle: string
	plugin: SimpleQuizPlugin
	flashcardsManager: FlashcardsManager

	constructor(app: App, plugin: SimpleQuizPlugin, flashcards: Flashcard[]) {
		super(app);
		this.plugin = plugin;
		this.baseTitle = "Quiz!";
		this.flashcardsManager = new FlashcardsManager()
			.setFlashcards(flashcards);
	}

	onOpen() {
		const {contentEl} = this;
		this.start(contentEl);
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}

	async start(contentEl: HTMLElement) {
		this.setTitle(this.baseTitle);

		let indexPage = new ModalIndexPageView(contentEl);
		let quizPage = new ModalQuizPageView(contentEl);
		let resultsPage = new ModalResultsPageView(contentEl);

		indexPage.setFlashcardsManager(this.flashcardsManager);

		let quizParams = await this.plugin.dataController.loadQuizParamsObject();
		if(quizParams) {
			indexPage.setQuizParams(QuizParams.from(quizParams));
		}

		indexPage.setOnStart(async (quizArguments) => {
			let flashcards = this.flashcardsManager.getQuizFlashcards();
			if (flashcards.length == 0) {
				new Notice('At least one flashcard must be selected');
				return;
			}

			await this.plugin.dataController.saveQuizParamsObject(new QuizParams(
				this.flashcardsManager.selectedPools,
				this.flashcardsManager.selectedTags,
				new Set(Array.from(this.flashcardsManager.selectedFlashcards).map(f => f.id).filter(notEmpty)),
				quizArguments.questionsCount
			).to());

			contentEl.empty();

			quizPage.setQuiz(this.flashcardsManager.getQuiz(quizArguments, this.plugin.results))
				.setOnResult(quizResult => {
					resultsPage
						.setQuizResults(quizResult)
						.setResults(this.plugin.results)
						.setOnContinue(() => {
							contentEl.empty();
							indexPage.render();
						}).render();
					this.plugin.results.appendQuizResult(quizResult);
				}).render();
		});

		indexPage.render();
	}
}
