import {Quiz, QuizArguments, QuizQuestion, QuizResult} from "../../data/quiz";
import {FlashcardSide, FlashcardType} from "../../data/flashcard";
import {PageView} from "./page";
import {ResultsController} from "../../data/controllers/resultsController";
import {getAudioBuffer} from "../../beep";
import {Platform, setIcon} from "obsidian";
import {Question} from "./questions/question";
import {InputQuestion} from "./questions/input";
import {ManualQuestion} from "./questions/manual";

export class QuizPageView extends PageView {
	resultsController: ResultsController;

	quizArguments: QuizArguments;

	onResult: (previewMode: boolean, quizResult: QuizResult) => void;

	previewMode: boolean = false;
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

	setOnResult(onResult: (previewMode: boolean, quizResult: QuizResult) => void) {
		this.onResult = onResult;
		return this;
	}

	setPreviewMode(previewMode: boolean) {
		this.previewMode = previewMode;
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
					this.onResult(this.previewMode, result);
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
			let question = this.renderQuestion(
				questionsContainer, questions[i],
				questions.length, i + 1
			);

			if(this.previewMode) {
				if(i == 0) {
					question.previousButton.hide();
				} else {
					question.previousButton.show();
				}

				if(i == questions.length - 1){
					question.nextButton.setText("Finish")
				} else {
					question.nextButton.setText("Next");
				}

				const next = await question.getPreview();

				if(!next) {
					if(i > 0) {
						i -= 2;
					} else {
						i = -1;
					}
				}
			} else {
				questions[i].setAnswer(await question.getAnswer());

				if(this.soundFeedback) {
					soundFeedback();
				}

				if(this.vibrateFeedback) {
					vibrateFeedback();
				}
			}

			questionsContainer.empty();
		}
	}

	renderQuestion(container: HTMLElement, question: QuizQuestion,
						 questionsCount: number, currentQuestion: number): Question {
		let questionView: Question;
		switch (question.flashcard.type) {
			case FlashcardType.INPUT: {
				questionView = new InputQuestion(container);
				break;
			}
			case FlashcardType.MANUAL: {
				questionView = new ManualQuestion(container);
				break;
			}
			default: {
				questionView = new InputQuestion(container);
				break;
			}
		}

		questionView
			.setQuestion(question)
			.setQuestionsCount(questionsCount)
			.setCurrentQuestionIndex(currentQuestion)
			.setPreviewMode(this.previewMode);

		questionView.render();

		return questionView;
	}
}
