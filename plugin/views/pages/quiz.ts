import {Quiz, QuizArguments, QuizQuestion, QuizResult} from "../../data/quiz";
import {FlashcardSide} from "../../data/flashcard";
import {PageView} from "./page";
import {ResultsController} from "../../data/controllers/resultsController";
import {getAudioBuffer} from "../../beep";

export class QuizPageView extends PageView {
	resultsController: ResultsController;

	quizArguments: QuizArguments;

	onResult: (quizResult: QuizResult) => void;

	soundFeedback: boolean = false;
	vibrateFeedback: boolean = false;

	setResultsController(resultsController: ResultsController): this {
		this.resultsController = resultsController;
		return this;
	}

	setQuizArguments(quizArguments: QuizArguments) {
		this.quizArguments = quizArguments;
		return this;
	}

	setOnResult(onResult: (quizResult: QuizResult) => void) {
		this.onResult = onResult;
		return this;
	}

	setSoundFeedback(soundFeedback: boolean) {
		this.soundFeedback = soundFeedback;
		return this;
	}

	setVibrateFeedback(vibrateFeedback: boolean) {
		this.vibrateFeedback = vibrateFeedback;
		return this;
	}

	render() {
		const quiz = new Quiz(this.resultsController, this.quizArguments);

		let container = this.container.createDiv({
			cls: "full-height flex-space-between-column"
		});

		const questions = quiz.getQuestions();

		this.renderQuestions(container, questions).then(() => {
			let result = quiz.calculateResult(questions);
			this.onResult(result);
		});
	}

	async renderQuestions(container: HTMLElement, questions: QuizQuestion[]) {
		let soundFeedback = () => {};
		if(this.soundFeedback) {
			const context = new AudioContext();
			const gainNode = context.createGain();
			gainNode.gain.value = 0.20;
			gainNode.connect(context.destination);

			const audioBuffer = await getAudioBuffer();

			soundFeedback = () => {
				const source = context.createBufferSource();
				source.connect(gainNode);
				source.buffer = audioBuffer;
				source.start(0);
			}
		}

		let vibrateFeedback = () => {};
		if(this.vibrateFeedback) {
			vibrateFeedback = () => {
				navigator.vibrate(100);
			};
		}

		for (const question of questions) {
			let answer = await this.renderQuestion(container, question);
			question.setAnswer(answer);
			container.empty();

			if(this.soundFeedback) {
				soundFeedback();
			}

			if(this.vibrateFeedback) {
				vibrateFeedback();
			}
		}
	}

	async renderQuestion(container: HTMLElement, question: QuizQuestion) {
		let questionList = question.side === FlashcardSide.LEFT
			? question.flashcard.question.left : question.flashcard.question.right;

		const questionContainer = container.createDiv({
			cls: "flex-center-column flex-fill"
		});

		questionContainer.createEl("h2", {
			text: questionList[0]
		})

		for(let i = 1; i < questionList.length; i++) {
			questionContainer.createEl("h3", {
				text: questionList[i]
			})
		}

		const bottomContainer = container.createDiv({
			cls: "full-width flex-center-column"
		});

		let textarea = bottomContainer.createEl("textarea", {
			cls: "margin-medium padding-medium full-width medium-large-text container-style disable-outline always-primary-border static-height"
		});

		bottomContainer.createEl("hr", {
			cls: "full-width margin-top-large margin-bottom-large"
		})

		let buttonContainer = bottomContainer.createDiv({
			cls: "full-width flex-space-between",
		});
		let skipButton = buttonContainer.createEl("button", {
			text: "Skip",
			cls: "flex-fill margin-right-medium button red-border padding-medium"
		});

		let answerButton = buttonContainer.createEl("button", {
			text: "Next",
			cls: "flex-fill button primary-border padding-medium"
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
