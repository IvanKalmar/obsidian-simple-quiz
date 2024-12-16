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

		const totalSuccess = this.quizResults.questions
			.map(question => question.result)
			.reduce((acc, result) => {
				return acc + (result ? 1 : 0);
			}, 0);

		container.createEl("h4", {
			cls: "normal-text disable-spacing",
			text: `${totalSuccess} / ${this.quizResults.questions.length}`
		});

		let answersContainer = container.createDiv({
			cls: "flex-fill full-width margin-medium padding-left-medium padding-bottom-small padding-right-medium " +
				"static-height overflow-y container-style-border"
		});

		const questions = this.quizResults.questions.map(question => {
			return {
				question: question,
				score: this.resultsController.getCardScore(question.flashcard.id)
			}
		}).sort((a, b) => {
			if (a.score < b.score) {
				return -1;
			} else if (a.score > b.score) {
				return 1;
			}
			return 0;
		});

		for (let i = 0; i < questions.length; i++){
			const question = questions[i].question;
			const score = questions[i].score;

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

			startContainer.createEl("h2", {
				cls: "normal-text flex-start",
				text: questionList[0],
			});

			if(questionList.length > 1) {
				const anotherQuestionsContainer = answersContainer.createDiv({
					cls: "flex-start flex-wrap margin-bottom-small normal-text"
				});

				for (let j = 1; j < questionList.length; j++){
					anotherQuestionsContainer.createEl("h4", {
						cls: "normal-text disable-spacing",
						text: questionList[j]
					});

					if(j < questionList.length - 1) {
						const divider = anotherQuestionsContainer.createEl("span", {
							cls: "small-icon gray-icon"
						});
						setIcon(divider, "dot")
					}
				}
			}

			let color = "warning-text";
			if(score < this.resultsController.lowestCardThreshold) {
				color = "error-text";
			} else if (score > this.resultsController.successCardThreshold) {
				color = "success-text";
			}

			answerContainer.createEl("h4", {
				text: `\t${Math.round(score * 100)}%`,
				cls: color,
			})

			const answers = answersContainer.createEl("div", {
				cls: "flex-start flex-wrap margin-bottom-small secondary-text"
			})

			for(let j = 0; j < answerList.length; j++) {
				answers.createEl("h5", {
					cls: "secondary-text disable-spacing",
					text: answerList[j]
				});

				if(j < (answerList.length - 1)) {
					const divider = answers.createEl("span", {
						cls: "small-icon transparent-icon"
					});
					setIcon(divider, "dot")
				}
			}

			answersContainer.createEl("h5", {
				cls: `disable-spacing ${question.answer ? "success-text" : "warning-text"}`,
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
