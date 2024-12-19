import {View} from "../../view";
import {QuizQuestion} from "../../../data/quiz";
import {Platform} from "obsidian";

export class BaseQuestionLayout {
	centerContainer: HTMLElement;
	bottomContainer: HTMLElement;
	buttonsContainer: HTMLElement;

	constructor(centerContainer: HTMLElement, bottomContainer: HTMLElement, buttonsContainer: HTMLElement) {
		this.centerContainer = centerContainer;
		this.bottomContainer = bottomContainer;
		this.buttonsContainer = buttonsContainer;
	}
}

export abstract class Question extends View {
	previewMode: boolean = false;

	nextButton: HTMLElement;
	previousButton: HTMLElement;

	skipButton: HTMLButtonElement;
	answerButton: HTMLButtonElement;

	question: QuizQuestion;
	questionsCount: number;
	currentQuestionIndex: number;

	setPreviewMode(previewMode: boolean) {
		this.previewMode = previewMode;
		return this;
	}

	setQuestion(question: QuizQuestion) {
		this.question = question;
		return this;
	}

	setQuestionsCount(questionsCount: number) {
		this.questionsCount = questionsCount;
		return this;
	}

	setCurrentQuestionIndex(currentQuestionIndex: number) {
		this.currentQuestionIndex = currentQuestionIndex;
		return this;
	}

	renderBaseQuestionLayout(): BaseQuestionLayout {
		const container = this.container;

		container.createDiv({
			cls: "margin-top-small"
		}).createEl("h5", {
			cls: "secondary-text disable-spacing",
			text: `${this.currentQuestionIndex} / ${this.questionsCount}`
		});

		const centerContainer = container.createDiv({
			cls: "full-width flex-center-column padding-bottom-large padding-top-large",
		})

		const bottomContainer = container.createDiv({
			cls: `full-width flex-space-between-column ` +
				`${Platform.isMobile ? "margin-bottom-large" : "" }`
		})

		let buttonContainer = bottomContainer.createDiv({
			cls: "full-width flex-space-between flex-wrap",
		});

		let secondButtonContainer = buttonContainer.createDiv({
			cls: "full-width flex-space-between"
		})

		if(this.previewMode) {
			this.previousButton = secondButtonContainer.createEl("button", {
				text: "Previous",
				cls: "flex-fill margin-right-medium button primary-border padding-medium"
			});

			this.nextButton = secondButtonContainer.createEl("button", {
				text: "Next",
				cls: "flex-fill button primary-border padding-medium"
			});
		} else {
			this.skipButton = secondButtonContainer.createEl("button", {
				text: "Skip",
				cls: "flex-fill margin-right-medium button red-border padding-medium"
			});

			this.answerButton = secondButtonContainer.createEl("button", {
				text: "Next",
				cls: "flex-fill button primary-border padding-medium"
			});
		}

		return new BaseQuestionLayout(centerContainer, bottomContainer, buttonContainer);
	}

	abstract onAnswer(resolve: any, reject?: any): Promise<void>

	abstract setAnswer(): Promise<any>;

	getAnswer(): Promise<any> {
		return new Promise(async (resolve, reject) => {
			await this.onAnswer(resolve, reject);

			this.skipButton.on("click", "button", async () => {
				resolve(null);
			});

			this.answerButton.on("click", "button", async () => {
				resolve(await this.setAnswer());
			});
		});
	}

	getPreview(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			this.nextButton.on("click", "button", () => {
				resolve(true);
			});

			this.previousButton.on("click", "button", () => {
				resolve(false);
			});
		});
	}
}
