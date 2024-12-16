import {PageView} from "./page";
import {Notice, setIcon} from "obsidian";
import {CardsCountView} from "../cardsCount";
import {SelectListItems, SelectListView} from "../selectList";
import {FlashcardsManager} from "../../data/flashcardsManager";
import {QuizArguments} from "../../data/quiz";
import {GroupsController} from "../../data/controllers/groupsController";
import {FlashcardStatus, ResultsController} from "../../data/controllers/resultsController";

export class IndexPageView extends PageView {
	groupsController: GroupsController;
	resultsController: ResultsController;

	flashcardsManager: FlashcardsManager;
	count: number = 5;
	onQuizStart: (quizArguments: QuizArguments) => void

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

	setOnQuizStart(onQuizStart: (quizArguments: QuizArguments) => void): this {
		this.onQuizStart = onQuizStart;
		return this;
	}

	setQuestionsCount(questionsCount: number): this {
		this.count = questionsCount;
		return this;
	}

	_start() {
		if((this.count == 0) || (this.flashcardsManager.getSelectedCount() == 0)) {
			new Notice("At least one flashcard must be selected");
			return;
		}

		this.onQuizStart(new QuizArguments(this.flashcardsManager, this.count));
	}

	render() {
		this.flashcardsManager.setGroups(this.groupsController.getGroups());

		const mainContainer = this.container.createDiv({
			cls: "full-height full-width flex-center-column"
		});

		const grid = mainContainer.createDiv({
			cls: "grid-3-col full-width"
		});

		const selectedStatus = grid.createSpan({
			cls: "flex-center-column justify-self-center"
		});
		const failedCardsCount = selectedStatus.createEl("p", {
			cls: "error-text disable-spacing",
			text: "0"
		});
		const mediumCardsCount = selectedStatus.createEl("p", {
			cls: "warning-text disable-spacing",
			text: "0"
		});
		const successCardsCount = selectedStatus.createEl("p", {
			cls: "success-text disable-spacing",
			text: "0"
		});

		setIcon(grid.createSpan({
			cls: "medium-icon transparent-icon justify-self-center",
		}), "ellipsis-vertical");

		let startIcon = grid.createSpan({
			cls: "large-icon green-icon cursor-pointer justify-self-center"
		});
		setIcon(startIcon, "play");


		const flashcardsCountContainer = grid.createDiv({
			cls: "flex-center justify-self-center"
		});

		const clearIcon = flashcardsCountContainer.createSpan({
			cls: "margin-right-medium medium-icon cursor-pointer red-icon"
		});
		setIcon(clearIcon, "trash-2");

		const selectedCount = flashcardsCountContainer.createSpan({
			cls: "very-large-text",
			text: this.flashcardsManager.getSelectedCount().toString()
		});

		setIcon(grid.createSpan({
			cls: "medium-icon transparent-icon justify-self-center",
		}), "ellipsis-vertical");

		const questionsCountContainer = grid.createDiv({
			cls: "justify-self-center"
		});

		const cardsCountView = new CardsCountView(questionsCountContainer);
		cardsCountView.setOnCountUpdate((count) => {
			this.count = count;
		}).render();


		const buttonsContainer = mainContainer.createDiv({
			cls: "full-width flex-center margin-top-medium",
		})

		const selectListViewContainer = mainContainer.createDiv({
			cls: "full-width flex-fill margin-top-medium"
		})
		const selectListView = new SelectListView(selectListViewContainer);

		const addButton = (title: string, marginLeft: boolean, marginRight: boolean,
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
			selectedCount.setText(flashcards.length.toString());

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
				}
			});

			failedCardsCount.setText(failed.toString());
			mediumCardsCount.setText(middle.toString());
			successCardsCount.setText(success.toString());
		}

		const groupsButton = addButton("Groups", false, true, groups,
			this.flashcardsManager.selectedGroups, (selectedGroups) => {
				this.flashcardsManager.updateSelectedGroups(selectedGroups);
				updateSelected();
		});
		groupsButton.dispatchEvent(new Event("click"));

		addButton("Flashcards", false, true, flashcards,
			this.flashcardsManager.selectedFlashcards, (selectedFlashcards) => {
				this.flashcardsManager.updateSelectedFlashcardsIDs(selectedFlashcards);
				updateSelected();
		});

		addButton("Pools", false, true, pools,
			this.flashcardsManager.selectedPools, (selectedPools) => {
				this.flashcardsManager.updateSelectedPools(selectedPools);
				updateSelected();
		});

		addButton("Tags", false, false, tags,
			this.flashcardsManager.selectedTags, (selectedTags) => {
				this.flashcardsManager.updateSelectedTags(selectedTags);
				updateSelected();
		});

		clearIcon.on("click", "span", () => {
			failedCardsCount.setText("0");
			mediumCardsCount.setText("0");
			successCardsCount.setText("0");

			selectedCount.setText("0");
			this.flashcardsManager.reset();
			selectListView.empty();
			selectListView.render();
		})

		startIcon.on("click", "span", () => {
			this._start();
		});
	}
}
