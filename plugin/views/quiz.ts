import {View} from "./view";
import {FlashcardsManager} from "../data/flashcardsManager";
import {IndexPageView} from "./pages";
import {QuizPageView} from "./pages/quiz";
import {ResultsPageView} from "./pages/results";
import {ResultsController} from "../data/controllers/resultsController";
import {DataController} from "../data/controllers/dataController";
import {GroupsController} from "../data/controllers/groupsController";
import {GroupsListPageView} from "./pages/groups/list";
import {GroupsUpdatePageView} from "./pages/groups/update";

export class QuizViewSettings {
	jsEnabled: boolean
	allowFullscreen: boolean;
	soundFeedback: boolean;
	vibrateFeedback: boolean;

	constructor(jsEnabled: boolean, allowFullscreen: boolean,
				soundFeedback: boolean, vibrateFeedback: boolean) {
		this.jsEnabled = jsEnabled;
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

	updateTitle: (title: string) => void = () => {};

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

	setUpdateTitle(updateTitle: (title: string) => void) {
		this.updateTitle = updateTitle;
		return this;
	}

	render() {
		const container = this.container.createDiv({
			cls: "full-width full-height"
		})

		const indexPage = new IndexPageView(container)
			.setJsEnabled(this.quizViewSettings.jsEnabled)
			.setResultsController(this.resultsController)
			.setGroupsController(this.groupsController)
			.setFlashcardsManager(this.flashcardsManager);

		const quizPage = new QuizPageView(container)
			.setResultsController(this.resultsController)
			.setAllowFullscreen(this.quizViewSettings.allowFullscreen)
			.setSoundFeedback(this.quizViewSettings.soundFeedback)
			.setVibrateFeedback(this.quizViewSettings.vibrateFeedback);

		const resultsPage = new ResultsPageView(container)
			.setResultsController(this.resultsController);

		indexPage.setOnQuizStart((previewMode, quizArguments) => {
			container.empty();

			indexPage
				.setQuestionsCount(quizArguments.questionsCount);

			quizPage
				.setPreviewMode(previewMode)
				.setQuizArguments(quizArguments)
				.render();
		});

		quizPage.setOnResult(async (previewMode, quizResult) => {
			container.empty();

			if(previewMode) {
				indexPage.render();
			} else {
				await this.resultsController.appendQuizResult(quizResult);

				resultsPage
					.setQuizResults(quizResult)
					.render();
			}
		});

		resultsPage.setOnContinue(() => {
			container.empty();

			indexPage.render();
		})


		const groupsListPage = new GroupsListPageView(container);
		const groupsUpdatePage = new GroupsUpdatePageView(container)
			.setGroupsController(this.groupsController);

		const openGroupsList = () => {
			this.updateTitle("Groups settings")

			container.empty();

			groupsListPage
				.setGroups(this.groupsController.getUserGroups())
				.render();
		}


		if(this.quizViewSettings.jsEnabled) {
			indexPage.setOnGroupSettingsIconClick(openGroupsList);

			groupsUpdatePage.setOnBack(openGroupsList)

			groupsListPage
				.setOnBack(() => {
					this.updateTitle("Quiz")

					container.empty();

					indexPage.render();
				})
				.setOnCreate(() => {
					container.empty();

					groupsUpdatePage
						.setTitle("")
						.setCondition("")
						.setOnCreate(async (title, condition) => {
							await this.groupsController.addGroup(title, condition);
							openGroupsList();
						})
						.render();
				}).setOnUpdate((groupID) => {
				const group = this.groupsController.getGroup(groupID);

				if(group) {
					container.empty();

					groupsUpdatePage
						.setTitle(group.title)
						.setCondition(group.condition)
						.setOnCreate(async (title, condition) => {
							await this.groupsController.updateGroup(group.id, title, condition);
							openGroupsList();
						})
						.render();
				}
			}).setOnDelete(async (groupID: string) => {
				await this.groupsController.removeGroup(groupID);
				openGroupsList();
			});
		}


		this.updateTitle("Quiz")

		indexPage.render();
	}
}
