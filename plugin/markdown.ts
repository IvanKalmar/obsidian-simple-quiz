import {Flashcard, FlashcardsManager} from "./data/flashcards";
import {setIcon} from "obsidian";
import {Results, StreakDayStatus} from "./data/results";

export class MarkdownPlaceholderBlockView {
	flashcards: Flashcard[];
	error: string | null;

	container: HTMLElement;

	onOpen: () => void

	constructor(container: HTMLElement) {
		this.flashcards = [];
		this.error = null;

		this.container = container;
	}

	setFlashcards(flashcards: Flashcard[]) {
		this.flashcards = flashcards;
		return this;
	}

	setError(error: string | null) {
		this.error = error;
		return this;
	}

	setOnOpen(onOpen: () => void) {
		this.onOpen = onOpen;
		return this;
	}

	render() {
		const flashcards = new FlashcardsManager()
			.setFlashcards(this.flashcards);

		let container = this.container.createDiv({cls: "card-placeholder"});
		let headerContainer = container.createDiv({cls: "card-placeholder-title-container"});
		let headerTitleContainer = headerContainer.createDiv({cls: "card-placeholder-title"});

		let icon = headerTitleContainer.createSpan({cls: "card-placeholder-title-icon"});
		setIcon(icon, "gallery-horizontal-end");

		let titleHeader = headerTitleContainer.createEl("h2", {
			text: `Flashcards\t`
		});

		if (this.error) {
			container.createEl("h3", {
				text: this.error,
				cls: "error-text"
			});

			return;
		}

		let startIcon = headerContainer.createSpan({cls: "card-placeholder-start-icon"});
		setIcon(startIcon, "play");

		startIcon.on("click", "span", () => {
			this.onOpen();
		});

		titleHeader.createEl("span", {
			text: `${flashcards.getTotalCount()}`,
			cls: "secondary-text"
		})

		if (flashcards.getPools().length > 0) {
			let dataContainer = container.createDiv({
				cls: "card-placeholder-data"
			})

			let icon = dataContainer.createSpan({
				cls: "card-placeholder-title-icon"
			});
			setIcon(icon, "group");

			dataContainer
				.createEl("h4", {text: `Pools\t`})
				.createEl("span", {
					text: `${flashcards.getPools().length}\t`,
					cls: "secondary-text"
				}).createEl("span", {
					text: `[${flashcards.getPools().slice(0, 3).join(", ")}${flashcards.getPools().length > 3 ? ", ..." : ""}]`,
					cls: "secondary-text"
				});
		}

		if (flashcards.getTags().length > 0) {
			let dataContainer = container.createDiv({
				cls: "card-placeholder-data"
			})

			let icon = dataContainer.createSpan({
				cls: "card-placeholder-title-icon"
			});
			setIcon(icon, "tag");

			dataContainer.createEl("h4", {text: `Tags\t`})
				.createEl("span", {
					text: `${flashcards.getTags().length}\t[${flashcards.getTags().slice(0, 3).join(", ")}${flashcards.getTags().length > 3 ? ", ..." : ""}]`,
					cls: "secondary-text"
				});
		}
	}

}

export class MarkdownResultsView {
	container: HTMLElement;
	results: Results;
	onOpen: () => void;

	constructor(container: HTMLElement) {
		this.container = container;
	}

	setResults(results: Results) {
		this.results = results;
		return this;
	}

	setOnOpen(onOpen: () => void ) {
		this.onOpen = onOpen;
		return this;
	}

	render() {
		if(!this.results.saveResults) {
			return;
		}

		const today = this.results.getToday();

		let container = this.container.createDiv({cls: "card-placeholder"});
		let headerContainer = container.createDiv({cls: "card-placeholder-title-container"});
		let headerTitleContainer = headerContainer.createDiv({cls: "card-placeholder-title"});

		let icon = headerTitleContainer.createSpan({cls: "card-placeholder-title-icon"});
		setIcon(icon, "chart-column-big");

		headerTitleContainer.createEl("h2", {
				text: `Today\t`
		});

		let headerDataContainer = headerContainer.createDiv({
			cls: "today-data"
		});

		let streakIcon = headerDataContainer.createSpan({
			cls: "card-placeholder-title-icon"
		})
		setIcon(streakIcon, "calendar-check-2");
		headerDataContainer.createEl("h2", {
			text: `${today.streak}`
		})

		let cardsIcon = headerDataContainer.createSpan({
			cls: "card-placeholder-title-icon"
		})
		setIcon(cardsIcon, "gallery-horizontal-end");
		headerDataContainer.createEl("h2", {
			text: `${today.cardsToday}`
		})

		let quizzesIcon = headerDataContainer.createSpan({
			cls: "card-placeholder-title-icon"
		})
		setIcon(quizzesIcon, "dices");
		headerDataContainer.createEl("h2", {
			text: `${today.quizzesToday}`
		});

		let startIcon = headerDataContainer.createSpan({
			cls: "card-placeholder-start-icon",
			attr: {
				style: "margin-left: 32px;"
			}
		});
		setIcon(startIcon, "play");

		startIcon.on("click", "span", () => {
			this.onOpen();
		});

		let streakContainer = container.createDiv({
			cls: "today-streak-container"
		});
		for (const streakDay of today.streakDays) {
			let streakDayContainer = streakContainer.createDiv({
				cls: "today-streak-container-item"
			});

			let dayIconClass = "today-streak-day-icon";
			let dayIconIcon = "";
			switch (streakDay.status) {
				case StreakDayStatus.MISSED: {
					dayIconClass += " streak-missed-day";
					dayIconIcon = "circle";
					break;
				}
				case StreakDayStatus.DONE: {
					dayIconClass += " streak-done-day";
					dayIconIcon += "circle-check-big";
					break;
				}
				case StreakDayStatus.CURRENT: {
					dayIconClass += " streak-current-day";
					dayIconIcon += "circle-dot-dashed";
					break;
				}
				case StreakDayStatus.NEXT: {
					dayIconClass += " streak-next-day";
					dayIconIcon = "circle-dashed";
					break;
				}
			}

			let dayIcon = streakDayContainer.createSpan({
				cls: dayIconClass
			});
			setIcon(dayIcon, dayIconIcon);

			streakDayContainer.createDiv({
				cls: "today-streak-day-title",
				text: streakDay.day.substring(0, 3)
			});
		}
	}
}


