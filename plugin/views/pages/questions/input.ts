import {BaseQuestionLayout, Question} from "./question";
import {FlashcardSide} from "../../../data/flashcard";
import {Platform, setIcon} from "obsidian";

export class InputQuestion extends Question {
	textarea: HTMLTextAreaElement;

	render() {
		const baseLayout = this.renderBaseQuestionLayout();

		const question = this.question;

		let questions = question.side === FlashcardSide.LEFT
			? question.flashcard.question.left : question.flashcard.question.right;

		let answers = question.side === FlashcardSide.LEFT
			? question.flashcard.question.right : question.flashcard.question.left;

		if(!this.previewMode) {
			this._renderNormal(baseLayout, questions);
		} else {
			this._renderPreview(baseLayout, questions, answers);
		}
	}

	async onAnswer(resolve: any, reject?: any): Promise<void> {
		this.textarea.on("keydown", "textarea", (event) => {
			if (event.key == "Enter" && event.shiftKey) {
				event.preventDefault();
				resolve(this.textarea.value);
			}
		});
	}

	setAnswer(): Promise<any> {
		return new Promise((resolve, reject) => {
			resolve(this.textarea.value);
		});
	}

	_renderNormal(layout: BaseQuestionLayout, questions: string[]) {
		this._renderText(layout.centerContainer, questions);

		this.textarea = createEl("textarea", {
			cls: "margin-medium padding-medium full-width medium-large-text container-style " +
				"padding-top-small disable-outline always-primary-border static-height"
		});
		layout.bottomContainer.prepend(this.textarea);
		this.textarea.focus();

		if(!Platform.isMobile) {
			this.textarea.setAttribute("placeholder", "Press Shift + Enter to submit answer");
		}
	}

	_renderPreview(layout: BaseQuestionLayout, questions: string[], answers: string[]) {
		const textContainer = layout.centerContainer.createDiv({
			cls: "full-width flex-center-column static-height",
		});

		this._renderText(textContainer, questions);

		textContainer.createEl("hr", {
			cls: "full-width margin-top-medium margin-bottom-medium"
		});

		this._renderText(textContainer, answers);
	}

	_renderText(container: HTMLElement, list: string[]) {
		const textContainer = container.createDiv({
			cls: "flex-center-column"
		});

		textContainer.createEl("h2", {
			cls: "only-top-margin",
			text: list[0]
		})

		if(list.length > 1) {
			const additionalQuestions = textContainer.createEl("h4", {
				cls: "only-top-margin normal-text flex-center flex-wrap"
			});

			for (let i = 1; i < list.length; i++){
				additionalQuestions.createEl("span", {
					text: list[i]
				});

				if(i < list.length - 1){
					const divider = additionalQuestions.createEl("span", {
						cls: "small-icon gray-icon"
					});
					setIcon(divider, "dot")
				}
			}
		}
	}
}
