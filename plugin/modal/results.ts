import {Results} from "../data/results";

import {QuizResult} from "../data/quiz";
import {setIcon} from "obsidian";
import {FlashcardSide} from "../data/flashcards";

export class ModalResultsPageView {
	container: HTMLElement

	quizResults: QuizResult;
	globalResults: Results;

	onContinue: () => void;

	constructor(container: HTMLElement) {
		this.container = container;
		this.quizResults = new QuizResult();
	}

	setQuizResults(quizResult: QuizResult) {
		this.quizResults = quizResult;
		return this;
	}

	setResults(globalResults: Results) {
		this.globalResults = globalResults;
		return this;
	}

	setOnContinue(onContinue: () => void) {
		this.onContinue = onContinue;
		return this;
	}

	render() {
		let answersContainer = this.container.createDiv({
			cls: "quiz-answers-container"
		});
		for(const question of this.quizResults.questions) {
			let answerContainer = answersContainer.createDiv({
				cls: "quiz-answer-el"
			});

			let startContainer = answerContainer.createDiv({
				attr: {
					style: "display: flex; justify-content: flex-start; align-items: center;"
				}
			});

			let icon = startContainer.createSpan({
				cls: "card-placeholder-title-icon",
			});
			if(question.result) {
				icon.addClass("quiz-answer-el-success");
				setIcon(icon, "badge-check")
			} else {
				icon.addClass("quiz-answer-el-fail");
				setIcon(icon, "badge-alert")
			}

			let questionList = question.side === FlashcardSide.LEFT
				? question.flashcard.question?.left : question.flashcard.question?.right;
			if(!questionList) {
				questionList = ["error"]
			}

			let answerList = question.side === FlashcardSide.LEFT
				? question.flashcard.question?.right : question.flashcard.question?.left;
			if(!answerList) {
				answerList = ["error"]
			}

			startContainer.createEl("h4", {
				text: questionList[0]
			});

			let dataContainer = answerContainer.createDiv({
				cls: "quiz-answer-el-data"
			});

			const successRate = Math.round(this.globalResults.getCardScore(question.flashcard.id) * 100);

			let color = "error-text";
			if(successRate > 20) {
				color = "warning-text";
			}
			if(successRate > 80) {
				color = "success-text";
			}

			dataContainer.createEl("h4", {
				text: `\t${successRate}%`,
				cls: color,
			})

			answersContainer.createEl("h5", {
				cls: "quiz-answer-user-answer",
				text: question.answer
			})

			answersContainer.createEl("h6", {
				cls: "quiz-answer-question-answers",
				text: `[${answerList.slice(0, 3).join(", ")}${answerList.length > 3 ? ", ..." : ""}]`
			})
		}

		this.container.createEl("hr", {
			cls: "quiz-answer-end-hr"
		})

		let buttonContainer = this.container.createDiv({
			cls: "quiz-answer-button-container",
		});
		let retryButton = buttonContainer.createEl("button", {
			text: "Retry",
			cls: "quiz-answer-button"
		});
		retryButton.on("click", "button", () => {
			this.onContinue();
		});
	}
}
