import {App, Modal} from "obsidian";
import {FlashcardsManager} from "./data/flashcardsManager";
import SimpleQuizPlugin from "./plugin";
import {Flashcard} from "./data/flashcard";
import {QuizView, QuizViewSettings} from "./views/quiz";


export class SimpleQuizModal extends Modal {
	baseTitle: string
	plugin: SimpleQuizPlugin
	flashcardsManager: FlashcardsManager

	constructor(app: App, plugin: SimpleQuizPlugin, flashcards: Flashcard[]) {
		super(app);
		this.plugin = plugin;
		this.baseTitle = "Quiz";
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
		this.modalEl.classList.add("quiz-modal-container");
		contentEl.classList.add("full-width")

		this.setTitle(this.baseTitle);

		const quizViewSettings = new QuizViewSettings(
			this.plugin.settings.soundFeedback,
			this.plugin.settings.vibrateFeedback
		);

		new QuizView(contentEl)
			.setDataController(this.plugin.dataController)
			.setResultsController(this.plugin.resultsController)
			.setGroupsController(this.plugin.groupsController)
			.setFlashcardsManager(this.flashcardsManager)
			.setQuizViewSettings(quizViewSettings)
			.render();
	}
}
