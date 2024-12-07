import {View} from "./view";
import {StreakDayStatus, TodayResults} from "../data/controllers/resultsController";
import {setIcon} from "obsidian";

export class StreakView extends View {
	todayResults: TodayResults

	setTodayResults(todayResults: TodayResults): this {
		this.todayResults = todayResults;
		return this;
	}

	render() {
		let streakContainer = this.container.createDiv({
			cls: "streak-container"
		});

		for (const streakDay of this.todayResults.streakDays) {
			let streakDayContainer = streakContainer.createDiv({
				cls: "streak-container-item"
			});

			let dayIconClass = "streak-day-icon margin-bottom-small";
			let dayIconIcon = "";
			switch (streakDay.status) {
				case StreakDayStatus.MISSED: {
					dayIconClass += " red-icon";
					dayIconIcon = "circle";
					break;
				}
				case StreakDayStatus.DONE: {
					dayIconClass += " green-icon";
					dayIconIcon += "circle-check-big";
					break;
				}
				case StreakDayStatus.CURRENT: {
					dayIconClass += " yellow-icon";
					dayIconIcon += "circle-dot-dashed";
					break;
				}
				case StreakDayStatus.NEXT: {
					dayIconClass += " gray-icon";
					dayIconIcon = "circle-dashed";
					break;
				}
			}

			let dayIcon = streakDayContainer.createSpan({
				cls: dayIconClass
			});
			setIcon(dayIcon, dayIconIcon);

			streakDayContainer.createDiv({
				cls: "streak-day-title",
				text: streakDay.day.substring(0, 3)
			});
		}
	}
}
