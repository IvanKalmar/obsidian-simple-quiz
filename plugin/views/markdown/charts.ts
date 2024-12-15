import {
	FlashcardStatus,
	MonthProgression,
	ResultsController,
	YearProgression
} from "../../data/controllers/resultsController";
import {setIcon} from "obsidian";
import {MarkdownBase} from "./base";
import {StreakView} from "../streak";
import {addAlphaToHex, getReadableDate} from "../../utils";
import {DataController} from "../../data/controllers/dataController";


const Chart = require("libs/chart.umd").Chart;


export class MarkdownChartsViewSettings {
	sources: string[] | null = null;
	minify: boolean = false;
}


export class MarkdownChartsView extends MarkdownBase {
	dataController: DataController;
	resultsController: ResultsController;

	showStartButton: boolean = false;

	sources: string[] | null = null;
	minify: boolean = false;

	setResultsController(resultsController: ResultsController) {
		this.resultsController = resultsController;
		return this;
	}

	setDataController(dataController: DataController) {
		this.dataController = dataController;
		return this;
	}

	setSettings(markdownTodayViewSettings: MarkdownChartsViewSettings) {
		this.sources = markdownTodayViewSettings.sources;
		this.minify = markdownTodayViewSettings.minify;

		return this;
	}

	render() {
		if (!this.resultsController.enabled) {
			return;
		}

		const statistics = this.resultsController.getStatistics();
		if(!statistics) {
			return;
		}

		let baseContainer = this.getBaseContainer(
			this.minify,
			this.minify,
			this.minify,
			this.minify,
			this.minify,
			this.minify
		);

		baseContainer.primaryTitle.setText("Charts");
		setIcon(baseContainer.icon, "chart-area");

		const style = getComputedStyle(document.body);

		const chartsContainer = baseContainer.container.createDiv({
			cls: "margin-top-large flex-center flex-wrap"
		});

		const monthChart = chartsContainer.createDiv({
			cls: "margin-top-medium margin-bottom-medium width-68 height-15vh",
		}).createEl("canvas");

		const cardsChart = chartsContainer.createDiv({
			cls: "margin-top-medium margin-bottom-medium width-28 height-15vh margin-left-4",
		}).createEl("canvas");

		const yearChart = chartsContainer.createDiv({
			cls: "full-width margin-top-medium margin-bottom-medium height-15vh",
		}).createEl("canvas");

		this.dataController.getAllData(this.sources).then((flashcards) => {
			const allFlashcardsCount = flashcards.flashcards.length;

			this._renderMonthDaysChart(monthChart, style, statistics.month);
			this._renderCardsChart(cardsChart, style, statistics.countByStatus, allFlashcardsCount);
			this._renderYearProgressionChart(yearChart, style, statistics.year, allFlashcardsCount);
		});
	}

	_renderMonthDaysChart(canvas: HTMLCanvasElement, styles: CSSStyleDeclaration,
						  monthStatistics: MonthProgression) {
		const days: number[] = [...Array(monthStatistics.days.length).keys()].map(day => day + 1);
		const data: number[] = days.map((day) => monthStatistics.days[day - 1].flashcardsCount);

		const min = Math.min.apply(null, data);
		let max = Math.max.apply(null, data);
		max = Math.round(max / 5) * 5 + 5;

		new Chart(canvas, {
			type: 'line',
			data: {
				labels: days,
				datasets: [{
					label: 'Cards at day',
					data: data,
					fill: false,
					borderColor: styles.getPropertyValue('--color-accent'),
					borderWidth: 2,
					tension: 0.2,
				}]
			},
			options: {
				maintainAspectRatio: false,
				aspectRatio: 4 / 1,
				plugins: {
					title: {
						display: !this.minify,
						text: "Repeated cards by days",
					},
					subtitle: {
						display: false,
					},
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false
					},
				},
				elements: {
					point: {
						radius: 0
					}
				},
				scales: {
					y: {
						min: min,
						max: max,
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							stepSize: max - min
						},
						border: {
							display:false
						},
					},
					x: {
						grid: {
							display: false,
							drawBorder: false,
						},
						border: {
							display:false
						},
					}
				}
			}
		});
	}

	_renderCardsChart(canvas: HTMLCanvasElement, styles: CSSStyleDeclaration,
					  statusCount: {[key: string]: number}, allFlashcardsCount: number) {
		const redColor = styles.getPropertyValue('--color-red');
		const yellowColor = styles.getPropertyValue('--color-yellow');
		const greenColor = styles.getPropertyValue('--color-green');
		const grayColor = styles.getPropertyValue('--color-base-35');

		const failedCount = statusCount[FlashcardStatus.FAILED];
		const middleCount = statusCount[FlashcardStatus.MIDDLE];
		const successCount = statusCount[FlashcardStatus.SUCCESS];
		let emptyCount = allFlashcardsCount - (failedCount + middleCount + successCount);
		emptyCount = emptyCount < 0 ? 0 : emptyCount;

		new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: ["Failed", "Middle", "Success", "Empty"],
				datasets: [{
					label: 'Cards at day',
					data: [failedCount, middleCount, successCount, emptyCount],
					backgroundColor: [
						addAlphaToHex(redColor, 0.9),
						addAlphaToHex(yellowColor, 0.9),
						addAlphaToHex(greenColor, 0.9),
						addAlphaToHex(grayColor, 0.9),
					],
					borderWidth: 0,
					reverse: true
				}]
			},
			options: {
				aspectRatio: 1,
				plugins: {
					title: {
						display: !this.minify,
						text: "Total card statuses"
					},
					subtitle: {
						display: false,
					},
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false
					},
				},
				elements: {
					point: {
						radius: 0
					}
				},
				scales: {
					y: {
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							display: false
						},
						border: {
							display:false
						},
					},
					x: {
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							display: false
						},
						border: {
							display:false
						},
					}
				}
			}
		});
	}

	_renderYearProgressionChart(canvas: HTMLCanvasElement, styles: CSSStyleDeclaration,
								yearProgression: YearProgression, allFlashcardsCount: number) {
		const redColor = styles.getPropertyValue('--color-red');
		const yellowColor = styles.getPropertyValue('--color-yellow');
		const greenColor = styles.getPropertyValue('--color-green');
		const grayColor = styles.getPropertyValue('--color-base-35');

		let days: number[] = [];
		let total: number[] = [];
		let failed: number[] = [];
		let middle: number[] = [];
		let success: number[] = [];
		let max = -1;

		for(const [month, days_] of Object.entries(yearProgression.yearDays)) {
			for(const [dayString, countByStatuses] of Object.entries(days_)) {
				const day = Number(dayString);
				days.push(day);
				total.push(allFlashcardsCount);

				const failed_ = countByStatuses[FlashcardStatus.FAILED];
				const middle_ = countByStatuses[FlashcardStatus.MIDDLE];
				const success_ = countByStatuses[FlashcardStatus.SUCCESS];

				max = Math.max(
					Math.max(failed_, middle_, success_),
					max
				);

				failed.push(failed_);
				middle.push(middle_ + failed_);
				success.push(success_ + middle_ + failed_);
			}
		}

		max = Math.max(max, allFlashcardsCount);
		max = Math.round(max / 5) * 5 + 5;

		const borderWidth = 2;
		const tension = 0.6;

		new Chart(canvas, {
			type: 'line',
			data: {
				labels: days,
				datasets: [{
					label: 'Total',
					data: total,
					fill: false,
					borderColor: grayColor,
					borderWidth: borderWidth,
					tension: tension / 2,
				}, {
					label: 'Failed',
					data: failed,
					fill: true,
					borderColor: redColor,
					backgroundColor: redColor,
					borderWidth: borderWidth,
					tension: tension,
				}, {
					label: 'Middle',
					data: middle,
					fill: true,
					borderColor: yellowColor,
					backgroundColor: yellowColor,
					borderWidth: borderWidth,
					tension: tension,
				}, {
					label: 'Success',
					data: success,
					fill: true,
					borderColor: greenColor,
					backgroundColor: greenColor,
					borderWidth: borderWidth,
					tension: tension,
				}]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					title: {
						display: !this.minify,
						text: "Cards statuses progression in year"
					},
					subtitle: {
						display: false,
					},
					legend: {
						display: false,
					},
					tooltip: {
						enabled: false
					},
				},
				elements: {
					point: {
						radius: 0
					}
				},
				scales: {
					y: {
						min: 0,
						max: max,
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							stepSize: max
						},
						border: {
							display:false
						},
					},
					x: {
						grid: {
							display: false,
							drawBorder: false,
						},
						ticks: {
							display: false
						},
						border: {
							display:false
						},
					}
				}
			}
		});
	}
}


