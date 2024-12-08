import {Quiz, QuizArguments, QuizQuestion, QuizResult} from "../../data/quiz";
import {FlashcardSide} from "../../data/flashcard";
import {PageView} from "./page";
import {ResultsController} from "../../data/controllers/resultsController";
import {getAudioBuffer} from "../../beep";
import {Platform, setIcon} from "obsidian";

export class QuizPageView extends PageView {
	resultsController: ResultsController;

	quizArguments: QuizArguments;

	onResult: (quizResult: QuizResult) => void;

	allowFullscreen: boolean = false;
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

	setAllowFullscreen(allowFullscreen: boolean) {
		this.allowFullscreen = allowFullscreen;
		return this;
	}

	render() {
		const quiz = new Quiz(this.resultsController, this.quizArguments);

		if (Platform.isMobile && this.allowFullscreen) {
			const closeIcon = this.container.createSpan({
				cls: "large-icon absolute-top-right cursor-pointer",
			});
			setIcon(closeIcon, "shrink");

			closeIcon.on("click", "span", () => {
				document.exitFullscreen().then(() => {
					container.classList.remove("default-background");
					closeIcon.hide();
				});
			})

			closeIcon.hide();

			this.container.requestFullscreen().then(() => {
				container.classList.add("default-background");
				closeIcon.show();
			});
		}

		let container = this.container.createDiv({
			cls: "full-height flex-space-between-column"
		});

		const questions = quiz.getQuestions();

		this.renderQuestions(container, questions).then(() => {
			let result = quiz.calculateResult(questions);

			document.exitFullscreen()
				.then(() => {})
				.catch(() => {})
				.finally(() => {
					this.onResult(result);
				});
		}).catch(() => {});
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

		const questionsContainer = container.createDiv({
			cls: "full-height full-width flex-space-between-column padding-left-medium padding-right-medium"
		});

		for (let i = 0; i < questions.length; i++){
			const question = questions[i];
			let answer = await this.renderQuestion(questionsContainer, question, questions.length, i + 1);
			question.setAnswer(answer);
			questionsContainer.empty();

			if(this.soundFeedback) {
				soundFeedback();
			}

			if(this.vibrateFeedback) {
				vibrateFeedback();
			}
		}
	}

	async renderQuestion(container: HTMLElement, question: QuizQuestion, questionsCount: number, currentQuestion: number) {
		container.createEl("h5", {
			cls: "secondary-text disable-spacing",
			text: `${currentQuestion} / ${questionsCount}`
		})
		let questionList = question.side === FlashcardSide.LEFT
			? question.flashcard.question.left : question.flashcard.question.right;

		const questionContainer = container.createDiv({
			cls: "flex-center-column flex-fill"
		});

		questionContainer.createEl("h2", {
			cls: "only-top-margin",
			text: questionList[0]
		})

		questionContainer.createEl("h4", {
			cls: "only-top-margin normal-text",
			text: questionList.length > 1 ? questionList.slice(1).join("; ") : ""
		});

		const bottomContainer = container.createDiv({
			cls: "full-width flex-space-between-column padding-bottom-large"
		});

		let textarea = bottomContainer.createEl("textarea", {
			cls: "margin-medium padding-medium full-width medium-large-text container-style " +
				"padding-top-small disable-outline always-primary-border static-height"
		});
		textarea.focus();

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

			if(Platform.isMobile) {
				bottomContainer.addClass("margin-bottom-large");
			}

			if(!Platform.isMobile) {
				textarea.on("keydown", "textarea", (event) => {
					if (event.key == "Enter" && event.shiftKey) {
						event.preventDefault();
						resolve(textarea.value);
					}
				});
				textarea.setAttribute("placeholder", "Press Shift + Enter to submit answer");
			}
		})
	}
}
