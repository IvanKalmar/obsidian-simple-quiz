import {Flashcard, FlashcardsManager} from "../data/flashcards";
import {setIcon} from "obsidian";
import {QuizArguments, QuizParams} from "../data/quiz";
import {notEmpty} from "../utils";

export class ModalIndexPageView {
	container: HTMLElement;

	questionsCount: number;
	flashcardsManager: FlashcardsManager;

	onStart: (quizArguments: QuizArguments) => void;

	constructor(container: HTMLElement) {
		this.container = container;
		this.questionsCount = 1;
		this.flashcardsManager = new FlashcardsManager();

		this.onStart = (quizArguments: QuizArguments) => {};
	}

	setFlashcardsManager(flashcardsManager: FlashcardsManager) {
		this.flashcardsManager = flashcardsManager;
		return this;
	}

	setOnStart(onStart: (quizArguments: QuizArguments) => void) {
		this.onStart = onStart;
		return this;
	}

	setQuizParams(quizParams: QuizParams) {
		this.questionsCount = quizParams.questionsCount;
		this.flashcardsManager.selectedFlashcards = new Set(Array.from(quizParams.selectedFlashcards).map(flashcardID => {
			return this.flashcardsManager.byID[flashcardID]
		}).filter(notEmpty));
		this.flashcardsManager.selectedPools = quizParams.selectedPools;
		this.flashcardsManager.selectedTags = quizParams.selectedTags;
	}

	render() {
		let container = this.container.createDiv({
			cls: "quiz-index-container"
		});

		let cardsContainer = container.createDiv({
			cls: "quiz-index-container-cards"
		});

		this.renderCards(cardsContainer);

		let selectorsContainer = container.createDiv({
			cls: "quiz-index-container-selectors"
		});

		this.renderQuestionsCount(selectorsContainer);
		this.renderPoolsSelector(selectorsContainer)
		this.renderTagsSelector(selectorsContainer)
	}

	renderCards(container: HTMLElement) {
		let searchContainer = container.createDiv({
			cls: "quiz-index-search-container"
		});

		let cardSearch = searchContainer.createEl("input", {
			type: "text",
			cls: "quiz-index-cards-search",
			placeholder: "Card"
		});

		let searchIcon = searchContainer.createSpan({
			cls: "quiz-index-search-clear-cards"
		});
		setIcon(searchIcon, "circle-off");

		let cardsContainer = container.createDiv({
			cls: "quiz-index-cards-container"
		});

		const limit = 10;
		let currentOffset = 0;

		let currentFlashcards = this.flashcardsManager.flashcards;
		let selectedFlashcards: Set<Flashcard> = this.flashcardsManager.selectedFlashcards;
		let cards: HTMLElement[] = [];

		const addCards = () => {
			for(const flashcard of currentFlashcards.slice(currentOffset, currentOffset + limit)) {
				let title = flashcard.title ? flashcard.title : "";

				let cardContainer = cardsContainer.createDiv({
					cls: `quiz-index-card-element-container ${selectedFlashcards.has(flashcard) ? "quiz-index-select-container-selected" : ""}`,
				});
				cardContainer.createDiv({
					text: title
				});
				cardContainer.createDiv({
					text: flashcard.question?.left.join(", ")
				});
				cardContainer.createDiv({
					text: flashcard.question?.right.join(", ")
				});
				cardContainer.on("click", "div", () => {
					if(selectedFlashcards.has(flashcard)) {
						selectedFlashcards.delete(flashcard);
						cardContainer.classList.remove("quiz-index-select-container-selected");
					} else {
						selectedFlashcards.add(flashcard);
						cardContainer.classList.add("quiz-index-select-container-selected");
					}

					this.flashcardsManager.selectedFlashcards = selectedFlashcards;
				});
				cards.push(cardContainer);
			}

			currentOffset += limit;
		}

		cardsContainer.on("scroll", "div", () => {
			if((cardsContainer.scrollTop + cardsContainer.offsetHeight) > cardsContainer.scrollHeight * 0.95) {
				addCards();
			}
		});

		cardSearch.on("change", "input", () => {
			let searchString = cardSearch.value ? cardSearch.value : "";
			searchString = searchString.toLocaleLowerCase().trim();
			currentFlashcards = this.flashcardsManager.flashcards.filter((flashcard) => {
				let values: string[] = [];
				let left = flashcard.question?.left;
				if(left) {
					values = [...values, ...left]
				}

				let right = flashcard.question?.right;
				if(right) {
					values = [...values, ...right]
				}

				for(const v of values) {
					if(v.toLocaleLowerCase().includes(searchString)) {
						return true;
					}
				}

				return false;
			});
			cardsContainer.empty();
			cardsContainer.scrollTo(0, 0);
			currentOffset = 0;
			cards = [];
			addCards();
		});

		searchIcon.on("click",  "span", () => {
			selectedFlashcards.clear();
			this.flashcardsManager.selectedFlashcards.clear();
			for(const card of cards) {
				card.classList.remove("quiz-index-select-container-selected");
			}
		})

		addCards();

		let startButton = container.createEl("button", {
			cls: "quiz-index-start-button",
			text: "Start"
		});
		startButton.on("click", "button", () => {
			const arguments_ = new QuizArguments()
				.setQuestionsCount(this.questionsCount);
			this.onStart(arguments_);
		});
	}

	renderQuestionsCount(container: HTMLElement) {
		container = container.createDiv({
			cls: "quiz-index-container-selectors-count"
		})

		let minusIcon = container.createSpan({
			cls: "quiz-index-container-selectors-count-icon"
		});
		setIcon(minusIcon, "minus");

		let count = container.createSpan({
			cls: "quiz-index-container-selectors-count-text",
			text: this.questionsCount.toString()
		});

		let plusIcon = container.createSpan({
			cls: "quiz-index-container-selectors-count-icon"
		});
		setIcon(plusIcon, "plus");

		minusIcon.on("click", "span", () => {
			let step = this.questionsCount < 5 ? 1 : 5;
			this.questionsCount = (this.questionsCount - step) < 1 ? 1 : this.questionsCount - step;
			count.innerHTML = this.questionsCount.toString();
		});

		plusIcon.on("click", "span", () => {
			let step = this.questionsCount < 5 ? 1 : 5;
			this.questionsCount = (this.questionsCount + step) > 100 ? 100 : this.questionsCount + step;
			count.innerHTML = this.questionsCount.toString();
		});
	}

	renderPoolsSelector(container: HTMLElement) {
		return this.renderSelector(container, "quiz-index-container-selectors-pools", "Pool",
			this.flashcardsManager.getPools(), this.flashcardsManager.selectedPools, (selectedElements: Set<string>) => {
				this.flashcardsManager.selectedPools = selectedElements;
			}
		);
	}

	renderTagsSelector(container: HTMLElement) {
		return this.renderSelector(container, "quiz-index-container-selectors-tags", "Tag",
			this.flashcardsManager.getTags(), this.flashcardsManager.selectedTags, (selectedElements: Set<string>) => {
				this.flashcardsManager.selectedTags = selectedElements;
			}
		);
	}

	renderSelector(container: HTMLElement, rootClass: string, containerName: string, elements: string[],
				  	 selectedElements_: Set<string>, onSelectedElementsChange: (selectedElements: Set<string>) => void
	) {
		container = container.createDiv({
			cls: rootClass
		});

		let searchContainer = container.createDiv({
			cls: "quiz-index-search-container"
		});

		let search = searchContainer.createEl("input", {
			cls: "quiz-index-search",
			type: "text",
			placeholder: containerName
		});

		let searchIcon = searchContainer.createSpan({
			cls: "quiz-index-search-clear"
		});
		setIcon(searchIcon, "circle-off")

		let selectContainer = container.createDiv( {
			cls: "quiz-index-select",
		});

		let currentElements = elements;

		const selectedElements: Set<string> = selectedElements_;

		let htmlElements: HTMLElement[] = [];

		const renderList = () => {
			for(const element of currentElements.slice(0, 10)) {
				let elementContainer = selectContainer.createDiv({
					cls: `quiz-index-select-container ${selectedElements.has(element) ? "quiz-index-select-container-selected" : ""}`,
					text: element
				});
				elementContainer.on("click", "div", () => {
					if(selectedElements.has(element)) {
						selectedElements.delete(element);
						elementContainer.classList.remove("quiz-index-select-container-selected");
					} else {
						selectedElements.add(element);
						elementContainer.classList.add("quiz-index-select-container-selected");
					}
					onSelectedElementsChange(selectedElements);
				});
				htmlElements.push(elementContainer);
			}
		}

		search.on("change", "input", () => {
			let searchString = search.value ? search.value : "";
			searchString = searchString.toLocaleLowerCase().trim();
			currentElements = elements.filter(el => el.toLocaleLowerCase().includes(searchString));
			selectContainer.empty();
			htmlElements = [];
			renderList();
		});

		searchIcon.on("click", "span", () => {
			selectedElements.clear();
			onSelectedElementsChange(selectedElements);
			for(const el of htmlElements) {
				el.classList.remove("quiz-index-select-container-selected");
			}
		});

		renderList();
	}
}
