import {FlashcardSide} from "../data/flashcards";
import {Quiz, QuizQuestion, QuizResult} from "../data/quiz";

export class ModalQuizPageView {
	container: HTMLElement;

	quiz: Quiz;

	onResult: (quizResult: QuizResult) => void;

	constructor(container: HTMLElement) {
		this.container = container;
		this.quiz = new Quiz();

		this.onResult = (quizResult: QuizResult) => {};
	}

	setQuiz(quiz: Quiz) {
		this.quiz = quiz;
		return this;
	}

	setOnResult(onResult: (quizResult: QuizResult) => void) {
		this.onResult = onResult;
		return this;
	}

	render() {
		let container = this.container.createDiv({
			cls: "quiz-question-container"
		});

		const questions = this.quiz.getQuestions();
		this.renderQuestions(container, questions).then(() => {
			let result = this.quiz.calculateResult(questions);
			this.onResult(result);
		});
	}

	async renderQuestions(container: HTMLElement, questions: QuizQuestion[]) {
		for (const question of questions) {
			let answer = await this.renderQuestion(container, question);
			question.setAnswer(answer);
			container.empty();
		}
	}

	async renderQuestion(container: HTMLElement, question: QuizQuestion) {
		let questionList = question.side === FlashcardSide.LEFT
			? question.flashcard.question?.left : question.flashcard.question?.right;

		if(!questionList) {
			questionList = ["error"]
		}

		container.createEl("h2", {
			text: questionList[0]
		})
		for(let i = 1; i < questionList.length; i++) {
			container.createEl("h3", {
				text: questionList[i]
			})
		}
		container.createEl("hr", {
			cls: "quiz-question-middle-hr"
		})

		let textarea = container.createEl("textarea", {
			cls: "quiz-question-input-text"
		});

		container.createEl("hr", {
			cls: "quiz-question-end-hr"
		})

		let buttonContainer = container.createDiv({
			cls: "quiz-question-button-container",
		});
		let skipButton = buttonContainer.createEl("button", {
			text: "Skip",
			cls: "quiz-question-button-secondary"
		});

		let answerButton = buttonContainer.createEl("button", {
			text: "Next",
			cls: "quiz-question-button"
		});

		return new Promise((resolve, reject) => {
			skipButton.on("click", "button", () => {
				resolve(null);
			});

			answerButton.on("click", "button", () => {
				resolve(textarea.value);
			});
		})
	}
}
