import {View} from "./view";
import {FlashcardsManager} from "../data/flashcardsManager";
import {IndexPageView} from "./pages";
import {QuizPageView} from "./pages/quiz";
import {ResultsPageView} from "./pages/results";
import {ResultsController} from "../data/controllers/resultsController";
import {DataController} from "../data/controllers/dataController";
import {GroupsController} from "../data/controllers/groupsController";

export class QuizViewSettings {
	allowFullscreen: boolean;
	soundFeedback: boolean;
	vibrateFeedback: boolean;

	constructor(allowFullscreen: boolean, soundFeedback: boolean, vibrateFeedback: boolean) {
		this.allowFullscreen = allowFullscreen;
		this.soundFeedback = soundFeedback;
		this.vibrateFeedback = vibrateFeedback;
	}
}

export class QuizView extends View {
	dataController: DataController;
	resultsController: ResultsController;
	groupsController: GroupsController;

	flashcardsManager: FlashcardsManager;

	quizViewSettings: QuizViewSettings;

	setDataController(dataController: DataController): this {
		this.dataController = dataController;
		return this;
	}

	setResultsController(resultsController: ResultsController): this {
		this.resultsController = resultsController;
		return this;
	}

	setGroupsController(groupsController: GroupsController) {
		this.groupsController = groupsController;
		return this;
	}

	setFlashcardsManager(flashcardsManager: FlashcardsManager): this {
		this.flashcardsManager = flashcardsManager;
		return this;
	}

	setQuizViewSettings(quizViewSettings: QuizViewSettings) {
		this.quizViewSettings = quizViewSettings;
		return this;
	}

	render() {
		const container = this.container.createDiv({
			cls: "full-width full-height"
		})

		const indexPage = new IndexPageView(container)
			.setGroupsController(this.groupsController)
			.setFlashcardsManager(this.flashcardsManager);

		const quizPage = new QuizPageView(container)
			.setResultsController(this.resultsController)
			.setAllowFullscreen(this.quizViewSettings.allowFullscreen)
			.setSoundFeedback(this.quizViewSettings.soundFeedback)
			.setVibrateFeedback(this.quizViewSettings.vibrateFeedback);

		const resultsPage = new ResultsPageView(container)
			.setResultsController(this.resultsController);

		indexPage.setOnQuizStart((quizArguments) => {
			container.empty();

			quizPage
				.setQuizArguments(quizArguments)
				.render();
		});

		quizPage.setOnResult(async (quizResult) => {
			container.empty();

			await this.resultsController.appendQuizResult(quizResult);

			resultsPage
				.setQuizResults(quizResult)
				.render();
		});

		resultsPage.setOnContinue(() => {
			container.empty();

			indexPage.render();
		})

		indexPage.render();
	}
}
