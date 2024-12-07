import {ResultsController} from "../../data/controllers/resultsController";

import {QuizResult} from "../../data/quiz";
import {setIcon} from "obsidian";

import {FlashcardSide} from "../../data/flashcard";
import {PageView} from "./page";

export class ResultsPageView extends PageView{
	quizResults: QuizResult;
	resultsController: ResultsController;

	onContinue: () => void;

	setQuizResults(quizResult: QuizResult) {
		this.quizResults = quizResult;
		return this;
	}

	setResultsController(globalResults: ResultsController) {
		this.resultsController = globalResults;
		return this;
	}

	setOnContinue(onContinue: () => void) {
		this.onContinue = onContinue;
		return this;
	}

	render() {
		const container = this.container.createDiv({
			cls: "full-width full-height flex-space-between-column "
		});

		let answersContainer = container.createDiv({
			cls: "flex-fill full-width margin-medium padding-left-medium padding-bottom-small padding-right-medium " +
				"static-height overflow-y container-style-border"
		});

		for (let i = 0; i < this.quizResults.questions.length; i++){
			const question = this.quizResults.questions[i];

			let answerContainer = answersContainer.createDiv({
				cls: `flex-space-between ${i == 0 ? "" : "margin-top-large"}`
			});

			let startContainer = answerContainer.createDiv({
				cls: "flex-start"
			});

			let icon = startContainer.createSpan({
				cls: `medium-icon ${question.result ? "green-icon" : "red-icon"} margin-right-medium`,
			});
			setIcon(icon, question.result ? "badge-check" : "badge-alert");

			let questionList = question.side === FlashcardSide.LEFT
				? question.flashcard.question.left : question.flashcard.question.right;

			let answerList = question.side === FlashcardSide.LEFT
				? question.flashcard.question.right : question.flashcard.question.left;

			let anotherQuestions = questionList.slice(1).join(', ').trim();
			if(anotherQuestions.length > 0) {
				anotherQuestions = " - " + anotherQuestions;
			}

			startContainer.createEl("h3", {
				cls: "normal-text",
				text: `${questionList[0]}${anotherQuestions}`,
			});

			const successRate = Math.round(this.resultsController.getCardScore(question.flashcard.id) * 100);

			let color = "error-text";
			if(successRate > 20) {
				color = "warning-text";
			}
			if(successRate > 80) {
				color = "success-text";
			}

			answerContainer.createEl("h4", {
				text: `\t${successRate}%`,
				cls: color,
			})

			answersContainer.createEl("h5", {
				cls: "disable-spacing margin-bottom-small margin-small secondary-text",
				text: `[${answerList.join(", ")}]`
			})

			answersContainer.createEl("h5", {
				cls: `disable-spacing margin-bottom-small margin-small ${question.answer ? "normal-text" : "warning-text"}`,
				text: question.answer ? question.answer : "..."
			})
		}

		let buttonContainer = container.createDiv({
			cls: "full-width flex-end",
		});
		let continueButton = buttonContainer.createEl("button", {
			text: "Continue",
			cls: "flex-fill button primary-border padding-medium"
		});
		continueButton.on("click", "button", () => {
			this.onContinue();
		});
	}
}
