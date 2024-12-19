import {PageView} from "./page";
import {Notice, setIcon} from "obsidian";
import {CardsCountView} from "../cardsCount";
import {SelectListAction, SelectListItems, SelectListView} from "../lists/select";
import {FlashcardsManager} from "../../data/flashcardsManager";
import {QuizArguments} from "../../data/quiz";
import {GroupsController} from "../../data/controllers/groupsController";
import {FlashcardStatus, ResultsController} from "../../data/controllers/resultsController";

export class IndexPageView extends PageView {
	groupsController: GroupsController;
	resultsController: ResultsController;

	flashcardsManager: FlashcardsManager;
	count: number = 5;
	onQuizStart: (previewMode: boolean, quizArguments: QuizArguments) => void;

	jsEnabled: boolean = false;

	onGroupSettingsIconClick: () => void;

	setGroupsController(groupsController: GroupsController) {
		this.groupsController = groupsController;
		return this;
	}

	setResultsController(resultsController: ResultsController) {
		this.resultsController = resultsController;
		return this;
	}

	setFlashcardsManager(flashcardsManager: FlashcardsManager): this {
		this.flashcardsManager = flashcardsManager;
		return this;
	}

	setOnQuizStart(onQuizStart: (previewMode: boolean, quizArguments: QuizArguments) => void): this {
		this.onQuizStart = onQuizStart;
		return this;
	}

	setOnGroupSettingsIconClick(onGroupSettingsIconClick: () => void) {
		this.onGroupSettingsIconClick = onGroupSettingsIconClick;
		return this;
	}

	setQuestionsCount(questionsCount: number): this {
		this.count = questionsCount;
		return this;
	}

	setJsEnabled(jsEnabled: boolean) {
		this.jsEnabled = jsEnabled;
		return this;
	}

	_start(previewMode: boolean = false) {
		if((this.count == 0) || (this.flashcardsManager.getSelectedCount() == 0)) {
			new Notice("At least one flashcard must be selected");
			return;
		}

		this.onQuizStart(previewMode, new QuizArguments(this.flashcardsManager, this.count));
	}

	render() {
		this.flashcardsManager.setGroups(
			this.groupsController.getGroups(
				this.flashcardsManager.getFlashcards()
			)
		);

		const mainContainer = this.container.createDiv({
			cls: "full-height full-width flex-center-column"
		});


		const controls = mainContainer.createDiv({
			cls: "flex-center flex-wrap justify-self-center margin-top-medium margin-bottom-medium"
		});

		const allCount = controls.createDiv({
			cls: "flex-center margin-top-small margin-bottom-small"
		});
		const clearIcon = allCount.createSpan({
			cls: "small-icon cursor-pointer red-icon justify-self-center margin-right-small"
		});
		setIcon(clearIcon, "x");
		const allCardsCount = allCount.createEl("h1", {
			cls: "normal-text-weight normal-text disable-spacing",
			text: "0"
		});
		setIcon(allCount.createEl("span", {
			cls: "small-icon transparent-icon margin-left-small margin-right-small"
		}), "move-right");

		const counts = controls.createDiv({
			cls: "flex-center margin-top-small margin-bottom-small"
		})
		const emptyCardsCount = counts.createEl("h1", {
			cls: "normal-text-weight secondary-text disable-spacing",
			text: "0"
		});
		setIcon(counts.createEl("span", {
			cls: "small-icon transparent-icon"
		}), "dot");
		const failedCardsCount = counts.createEl("h1", {
			cls: "normal-text-weight error-text disable-spacing",
			text: "0"
		});
		setIcon(counts.createEl("span", {
			cls: "small-icon transparent-icon"
		}), "dot");
		const middleCardsCount = counts.createEl("h1", {
			cls: "normal-text-weight warning-text disable-spacing",
			text: "0"
		});
		setIcon(counts.createEl("span", {
			cls: "small-icon transparent-icon"
		}), "dot");
		const successCardsCount = counts.createEl("h1", {
			cls: "normal-text-weight success-text disable-spacing",
			text: "0"
		});
		setIcon(counts.createEl("span", {
			cls: "small-icon transparent-icon margin-left-small margin-right-small"
		}), "move-right");

		const cardsCountContainer = controls.createDiv({
			cls: "flex-center margin-top-small margin-bottom-small"
		});
		const cardsCountView = new CardsCountView(cardsCountContainer);
		cardsCountView.setOnCountUpdate((count) => {
			this.count = count;
		}).render();
		setIcon(cardsCountContainer.createEl("span", {
			cls: "small-icon transparent-icon margin-left-small margin-right-small"
		}), "move-right");

		const previewContainer = controls.createDiv({
			cls: "flex-center margin-top-small margin-bottom-small"
		});
		let previewIcon = previewContainer.createSpan({
			cls: "medium-icon gray-icon cursor-pointer justify-self-center"
		});
		setIcon(previewIcon, "scan-eye");
		setIcon(previewContainer.createEl("span", {
			cls: "small-icon transparent-icon margin-left-small margin-right-small"
		}), "move-right");

		const startContainer = controls.createDiv({
			cls: "flex-center margin-top-small margin-bottom-small"
		});
		let startIcon = startContainer.createSpan({
			cls: "large-icon green-icon cursor-pointer justify-self-center"
		});
		setIcon(startIcon, "play");


		const buttonsContainer = mainContainer.createDiv({
			cls: "full-width flex-center margin-top-medium",
		})

		const selectListViewContainer = mainContainer.createDiv({
			cls: "full-width flex-fill margin-top-medium"
		})
		const selectListView = new SelectListView(selectListViewContainer);


		const addButton = (title: string, actions: SelectListAction[],
						   marginLeft: boolean, marginRight: boolean,
						   items: SelectListItems[], selectedItems: Set<string>,
						   onSelectedItemsChanged: (selectedItems: Set<string>) => void) => {
			const button = buttonsContainer.createEl("button", {
				cls: `flex-fill cursor-pointer ${marginLeft ? "margin-left-medium" : ""} ${marginRight ? "margin-right-medium" : ""}`,
				text: title
			});

			button.on("click", "button", () => {
				selectListView.empty();
				selectListView
					.setSearchPlaceholder(title)
					.setActions(actions)
					.setItems(items)
					.setSelectedItems(selectedItems)
					.setOnSelectedItemsChanged(onSelectedItemsChanged)
					.render()
			});

			return button;
		}

		const pools: SelectListItems[]  = this.flashcardsManager.getPools()
			.map(pool => ({text: pool, value: pool}));
		const tags: SelectListItems[]  = this.flashcardsManager.getTags()
			.map(tag => ({text: tag, value: tag}));
		const flashcards: SelectListItems[]  = this.flashcardsManager.getFlashcards()
			.map(flashcard => ({text: flashcard.getDefaultTitle(), value: flashcard.id}));
		const groups: SelectListItems[]  = this.flashcardsManager.getGroups()
			.map(group => ({text: group.title, value: group.id}));

		const updateSelected = () => {
			const flashcards = this.flashcardsManager.getQuizFlashcards();
			allCardsCount.setText(flashcards.length.toString());

			let empty = 0;
			let failed = 0;
			let middle = 0;
			let success = 0;

			flashcards.forEach(flashcard => {
				switch (this.resultsController.getCardStatus(flashcard.id)) {
					case FlashcardStatus.SUCCESS: {
						success++;
						break;
					}
					case FlashcardStatus.MIDDLE: {
						middle++;
						break;
					}
					case FlashcardStatus.FAILED: {
						failed++;
						break;
					}
					case FlashcardStatus.EMPTY: {
						empty++;
						break;
					}
				}
			});

			emptyCardsCount.setText(empty.toString());
			failedCardsCount.setText(failed.toString());
			middleCardsCount.setText(middle.toString());
			successCardsCount.setText(success.toString());
		}

		const clear = () => {
			emptyCardsCount.setText("0");
			failedCardsCount.setText("0");
			middleCardsCount.setText("0");
			successCardsCount.setText("0");

			allCardsCount.setText("0");

			this.flashcardsManager.reset();

			selectListView.empty();
			selectListView.render();
		}

		const groupsActions: SelectListAction[] = [];
		if(this.jsEnabled) {
			groupsActions.push({
				icon: "settings-2",
				onClick: () => this.onGroupSettingsIconClick()
			})
		}

		const groupsButton = addButton("Groups", groupsActions, false, true, groups,
			this.flashcardsManager.selectedGroups, (selectedGroups) => {
				this.flashcardsManager.updateSelectedGroups(selectedGroups);
				updateSelected();
		});

		addButton("Flashcards", [], false, true, flashcards,
			this.flashcardsManager.selectedFlashcards, (selectedFlashcards) => {
				this.flashcardsManager.updateSelectedFlashcardsIDs(selectedFlashcards);
				updateSelected();
		});

		addButton("Pools",  [],false, true, pools,
			this.flashcardsManager.selectedPools, (selectedPools) => {
				this.flashcardsManager.updateSelectedPools(selectedPools);
				updateSelected();
		});

		addButton("Tags", [], false, false, tags,
			this.flashcardsManager.selectedTags, (selectedTags) => {
				this.flashcardsManager.updateSelectedTags(selectedTags);
				updateSelected();
		});

		clearIcon.on("click", "span", () => {
			clear();
		})

		startIcon.on("click", "span", () => {
			this._start();
		});

		previewIcon.on("click", "span", () => {
			this._start(true);
		})


		if(groups.length > 0) {
			this.flashcardsManager.reset();
			this.flashcardsManager.updateSelectedGroups(new Set([groups[0].value]));
		}
		updateSelected();

		groupsButton.click();
	}
}
