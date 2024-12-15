import {PageView} from "./page";
import {Notice, setIcon} from "obsidian";
import {CardsCountView} from "../cardsCount";
import {SelectListItems, SelectListView} from "../selectList";
import {FlashcardsManager} from "../../data/flashcardsManager";
import {QuizArguments} from "../../data/quiz";
import {GroupsController} from "../../data/controllers/groupsController";

export class IndexPageView extends PageView {
	groupsController: GroupsController;

	flashcardsManager: FlashcardsManager;
	count: number = 5;
	onQuizStart: (quizArguments: QuizArguments) => void

	setGroupsController(groupsController: GroupsController) {
		this.groupsController = groupsController;
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

		const quizSettingsHeader = mainContainer.createDiv( {
			cls: "full-width flex-center",
		});
		const flashcardsCountContainer = quizSettingsHeader.createDiv({
			cls: "flex-center margin-right-medium"
		});

		const clearIcon = flashcardsCountContainer.createSpan({
			cls: "margin-right-medium medium-icon cursor-pointer red-icon"
		});
		setIcon(clearIcon, "trash-2");

		const selectedCount = flashcardsCountContainer.createSpan({
			cls: "very-large-text",
			text: this.flashcardsManager.getSelectedCount().toString()
		});

		setIcon(quizSettingsHeader.createSpan({
			cls: "medium-icon transparent-icon margin-right-medium margin-left-medium",
		}), "ellipsis-vertical");

		const questionsCountContainer = quizSettingsHeader.createDiv({
			cls: "margin-left-medium"
		});

		const cardsCountView = new CardsCountView(questionsCountContainer);
		cardsCountView.setOnCountUpdate((count) => {
			this.count = count;
		}).render();

		setIcon(quizSettingsHeader.createSpan({
			cls: "medium-icon transparent-icon margin-right-medium margin-left-medium",
		}), "ellipsis-vertical");

		let startIcon = quizSettingsHeader.createSpan({
			cls: "large-icon green-icon cursor-pointer margin-left-medium"
		});
		setIcon(startIcon, "play");

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

		const groupsButton = addButton("Groups", false, true, groups,
			this.flashcardsManager.selectedGroups, (selectedGroups) => {
				this.flashcardsManager.updateSelectedGroups(selectedGroups);
				selectedCount.setText(this.flashcardsManager.getSelectedCount().toString());
		});
		groupsButton.dispatchEvent(new Event("click"));

		addButton("Flashcards", false, true, flashcards,
			this.flashcardsManager.selectedFlashcards, (selectedFlashcards) => {
				this.flashcardsManager.updateSelectedFlashcardsIDs(selectedFlashcards);
				selectedCount.setText(this.flashcardsManager.getSelectedCount().toString());
		});

		addButton("Pools", false, true, pools,
			this.flashcardsManager.selectedPools, (selectedPools) => {
				this.flashcardsManager.updateSelectedPools(selectedPools);
				selectedCount.setText(this.flashcardsManager.getSelectedCount().toString());
		});

		addButton("Tags", false, false, tags,
			this.flashcardsManager.selectedTags, (selectedTags) => {
				this.flashcardsManager.updateSelectedTags(selectedTags);
				selectedCount.setText(this.flashcardsManager.getSelectedCount().toString());
		});

		clearIcon.on("click", "span", () => {
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
