import {FlashcardsManager} from "../../data/flashcardsManager";
import {setIcon} from "obsidian";
import {MarkdownBase} from "./base";
import {Flashcard} from "../../data/flashcard";

export class MarkdownCardsPlaceholderView extends MarkdownBase {
	flashcards: Flashcard[] = [];
	error: string | null = null;

	minify: boolean = false;

	setFlashcards(flashcards: Flashcard[]) {
		this.flashcards = flashcards;
		return this;
	}

	setError(error: string | null) {
		this.error = error;
		return this;
	}

	setMinify(minify: boolean) {
		this.minify = minify;
		return this;
	}

	render() {
		const flashcards = new FlashcardsManager()
			.setFlashcards(this.flashcards);

		let baseContainer = this.getBaseContainer(
			this.minify,
			this.minify,
			this.minify,
			this.minify,
			this.minify,
			false
		);

		if(!this.minify) {
			baseContainer.primaryTitle.setText("Flashcards");
			setIcon(baseContainer.icon, "gallery-horizontal-end");
		}

		if (this.error) {
			baseContainer.container.createEl("h3", {
				text: this.error,
				cls: "error-text"
			});

			return;
		}

		if(!this.minify) {
			this.createStartIcon(baseContainer.actionsContainer, () => {
				this.onOpen();
			})

			baseContainer.secondaryTitle.setText(flashcards.getTotalCount().toString());
		}

		const renderDataRow = (icon: string, title: string, text: string, secondaryText: string) => {
			let dataContainer = baseContainer.container.createDiv({
				cls: "card-placeholder-data"
			})
			let iconElement = dataContainer.createSpan({
				cls: "medium-icon"
			});
			setIcon(iconElement, icon);

			dataContainer.createEl("h4", {
				cls: "margin-left-medium",
				text: title,
			});

			dataContainer.createEl("h4", {
				cls: "margin-left-small secondary-text",
				text: text
			});

			dataContainer.createEl("h4", {
				cls: "margin-left-small secondary-text",
				text: secondaryText,
			});
		}

		if(!this.minify) {
			if (flashcards.getPools().length > 0) {
				const pools = "[" + flashcards.getPools().slice(0, 3).join(", ") +
					(flashcards.getPools().length > 3 ? ", ..." : "") + "]";

				renderDataRow("group", "Pools", flashcards.getPools().length.toString(), pools);
			}

			if (flashcards.getTags().length > 0) {
				const tags = "[" + flashcards.getTags().slice(0, 3).join(", ") +
					(flashcards.getTags().length > 3 ? ", ..." : "") + "]";

				renderDataRow("tag", "Tags", flashcards.getTags().length.toString(), tags);
			}
		}

		if(this.minify) {
			const renderIcon = (icon: string, text: string) => {
				let streakIcon = baseContainer.actionsContainer.createSpan({
					cls: "medium-icon margin-left-medium"
				})
				setIcon(streakIcon, icon);
				baseContainer.actionsContainer.createEl("h2", {
					cls: "margin-left-small margin-right-medium",
					text: text
				})
			}

			renderIcon("gallery-horizontal-end", flashcards.getTotalCount().toString());
			renderIcon("group", flashcards.getPools().length.toString());
			renderIcon("tags", flashcards.getTags().length.toString());
		}
	}

}


