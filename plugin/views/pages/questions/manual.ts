import {FlashcardSide} from "../../../data/flashcard";
import {InputQuestion} from "./input";

export class ManualQuestion extends InputQuestion {
	answerContainer: HTMLElement;
	failedButton: HTMLElement;
	successButton: HTMLElement;

	render() {
		const baseLayout = this.renderBaseQuestionLayout();

		const question = this.question;

		let questions = question.side === FlashcardSide.LEFT
			? question.flashcard.question.left : question.flashcard.question.right;

		let answers = question.side === FlashcardSide.LEFT
			? question.flashcard.question.right : question.flashcard.question.left;

		const textContainer = baseLayout.centerContainer.createDiv({
			cls: "full-width flex-center-column static-height",
		});

		this._renderText(textContainer, questions);

		textContainer.createEl("hr", {
			cls: "full-width margin-top-medium margin-bottom-medium"
		});

		this.answerContainer = textContainer.createDiv();

		if(!this.previewMode) {
			this.answerContainer.classList.add("manual-question-hide");
		}

		this._renderText(this.answerContainer, answers);

		if(!this.previewMode) {
			let answersContainer = createDiv({
				cls: "full-width flex-space-between",
			});

			baseLayout.buttonsContainer.prepend(answersContainer);

			this.failedButton = answersContainer.createEl("button", {
				text: "Failed",
				cls: "flex-fill margin-right-medium button red-border padding-medium"
			});
			this.failedButton.hide();

			this.successButton = answersContainer.createEl("button", {
				text: "Success",
				cls: "flex-fill button green-border padding-medium"
			});
			this.successButton.hide();

			this.answerButton.setText("Show answer");
		}
	}

	async onAnswer(resolve: any, reject?: any): Promise<void> {
		return Promise.resolve(undefined);
	}

	async setAnswer(): Promise<any> {
		return new Promise((resolve, reject) => {
			this.answerContainer.classList.remove("manual-question-hide");

			this.failedButton.show();
			this.successButton.show();

			this.skipButton.hide();
			this.answerButton.hide();

			this.failedButton.on("click", "button", () => { resolve(false); })
			this.successButton.on("click", "button", () => { resolve(true); })
		});
	}
}
