import {ResultsController} from "../../data/controllers/resultsController";
import {setIcon} from "obsidian";
import {MarkdownBase} from "./base";
import {StreakView} from "../streak";

export class MarkdownTodayView extends MarkdownBase {
	resultsController: ResultsController;

	showStartButton: boolean = false;

	setResultsController(resultsController: ResultsController) {
		this.resultsController = resultsController;
		return this;
	}

	setShowStartButton(showStartButton: boolean) {
		this.showStartButton = showStartButton;
		return this;
	}

	render() {
		if (!this.resultsController.enabled) {
			return;
		}

		const todayResults = this.resultsController.getTodayResults();

		let baseContainer = this.getBaseContainer();
		baseContainer.primaryTitle.setText("Today");
		setIcon(baseContainer.icon, "chart-column-big");

		const renderIcon = (icon: string, text: string) => {
			let streakIcon = baseContainer.actionsContainer.createSpan({
				cls: "medium-icon margin-left-medium"
			})
			setIcon(streakIcon, icon);
			baseContainer.actionsContainer.createEl("h2", {
				cls: "margin-left-small",
				text: text
			})
		}

		renderIcon("calendar-check-2", todayResults.streak.toString());
		renderIcon("gallery-horizontal-end", todayResults.cardsToday.toString());
		renderIcon("dices", todayResults.quizzesToday.toString());

		if(this.showStartButton) {
			this.createStartIcon(baseContainer.actionsContainer, () => {
				this.onOpen();
			})
		}

		new StreakView(baseContainer.container)
			.setTodayResults(todayResults)
			.render();
	}
}
