import {ResultsController} from "../../data/controllers/resultsController";
import {setIcon} from "obsidian";
import {MarkdownBase} from "./base";
import {StreakView} from "../streak";
import {DataController} from "../../data/controllers/dataController";


export class MarkdownTodayViewSettings {
	minify: boolean = false;
	hideCounters: boolean = false;
}


export class MarkdownTodayView extends MarkdownBase {
	dataController: DataController;
	resultsController: ResultsController;

	showStartButton: boolean = false;

	sources: string[] | null = null;
	minify: boolean = false;
	hideCounters: boolean = false;
	hideCharts: boolean = false;

	setResultsController(resultsController: ResultsController) {
		this.resultsController = resultsController;
		return this;
	}

	setDataController(dataController: DataController) {
		this.dataController = dataController;
		return this;
	}

	setSettings(markdownTodayViewSettings: MarkdownTodayViewSettings) {
		this.minify = markdownTodayViewSettings.minify;
		this.hideCounters = markdownTodayViewSettings.hideCounters;

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
			this.hideCounters,
		);

		baseContainer.primaryTitle.setText("Today");
		setIcon(baseContainer.icon, "chart-column-big");

		const renderIcon = (icon: string, text: string) => {
			let streakIcon = baseContainer.actionsContainer.createSpan({
				cls: "medium-icon margin-left-medium"
			})
			setIcon(streakIcon, icon);
			baseContainer.actionsContainer.createEl("h2", {
				cls: "margin-left-small margin-right-medium",
				text: text
			})
		}

		if(!this.hideCounters) {
			renderIcon("calendar-check-2", statistics.today.streak.toString());
			renderIcon("gallery-horizontal-end", statistics.today.cardsToday.toString());
			renderIcon("dices", statistics.today.quizzesToday.toString());
		}

		if(!this.minify) {
			this.createStartIcon(baseContainer.actionsContainer, () => {
				this.onOpen();
			})
		}

		new StreakView(baseContainer.container.createDiv({
			cls: "margin-top-large margin-bottom-large"
		})).setWeekStreak(statistics.week).render();
	}
}


