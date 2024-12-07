import {App, PluginSettingTab, Setting} from "obsidian";
import SimpleQuizPlugin from "./plugin";

export interface SimpleQuizPluginSettings {
	quizTag: string;
	dataJSONTag: string;
	dataJSTag: string;
	todayTag: string;

	indexing: boolean;
	saveResults: boolean;

	minimumCardNonRepetitionTime: number;
	maximumCardNonRepetitionTime: number;

	lowestCardThreshold: number;

	enableJS: boolean;

	showCardsPlaceholder: boolean;
	showStartButtonInPlaceholder: boolean;
	showDataInPlaceholder: boolean;

	showStartButtonInStatistics: boolean;

	soundFeedback: boolean;
	vibrateFeedback: boolean;
}

export const DEFAULT_SETTINGS: SimpleQuizPluginSettings = {
	quizTag: "quiz",
	dataJSONTag: "quizjson",
	dataJSTag: "quizjs",
	todayTag: "quiztoday",

	indexing: true,
	saveResults: true,

	minimumCardNonRepetitionTime: 7 * 24 * 3600,
	maximumCardNonRepetitionTime: 31 * 24 * 3600,

	lowestCardThreshold: 0.2,

	enableJS: false,

	showCardsPlaceholder: true,
	showStartButtonInPlaceholder: false,
	showDataInPlaceholder: false,

	showStartButtonInStatistics: false,

	soundFeedback: false,
	vibrateFeedback: false
}

export class SimpleQuizSettingTab extends PluginSettingTab {
	plugin: SimpleQuizPlugin;

	constructor(app: App, plugin: SimpleQuizPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl).setName('Placeholders').setHeading();

		new Setting(containerEl)
			.setName('Show cards placeholder')
			.addToggle(text => text
				.setValue(this.plugin.settings.showCardsPlaceholder)
				.onChange(async (value) => {
					this.plugin.settings.showCardsPlaceholder = value;
					await this.plugin.saveSettings();
					this.display();
				}));

		if(this.plugin.settings.showCardsPlaceholder) {
			new Setting(containerEl)
				.setName('Show start button in card placeholder')
				.addToggle(text => text
					.setValue(this.plugin.settings.showStartButtonInPlaceholder)
					.onChange(async (value) => {
						this.plugin.settings.showStartButtonInPlaceholder = value;
						await this.plugin.saveSettings();
					}));

			new Setting(containerEl)
				.setName('Show data in card placeholder')
				.addToggle(text => text
					.setValue(this.plugin.settings.showDataInPlaceholder)
					.onChange(async (value) => {
						this.plugin.settings.showDataInPlaceholder = value;
						await this.plugin.saveSettings();
						this.display();
					}));
		}

		new Setting(containerEl)
			.setName('Show start button in statistics')
			.addToggle(text => text
				.setValue(this.plugin.settings.showStartButtonInStatistics)
				.onChange(async (value) => {
					this.plugin.settings.showStartButtonInStatistics = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl).setName('Results').setHeading();

		new Setting(containerEl)
			.setName('Enable saving results')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.saveResults)
				.onChange(async (value) => {
					this.plugin.settings.saveResults = value;
					await this.plugin.saveSettings();
				}));

		if(this.plugin.settings.saveResults) {
			new Setting(containerEl)
				.setName('Lowest cards rate threshold')
				.addSlider(slider => slider
					.setDynamicTooltip()
					.setLimits(0, 1, 0.05)
					.setValue(this.plugin.settings.lowestCardThreshold)
					.onChange(async (value) => {
						this.plugin.settings.lowestCardThreshold = value;
						await this.plugin.saveSettings();
					}));

			new Setting(containerEl)
				.setName('Minimum card non repetition time, in seconds')
				.addText(text => text
					.setValue(this.plugin.settings.minimumCardNonRepetitionTime.toString())
					.onChange(async (value) => {
						this.plugin.settings.minimumCardNonRepetitionTime = parseInt(value);
						await this.plugin.saveSettings();
					}));

			new Setting(containerEl)
				.setName('Maximum card non repetition time, in seconds')
				.addText(text => text
					.setValue(this.plugin.settings.maximumCardNonRepetitionTime.toString())
					.onChange(async (value) => {
						this.plugin.settings.maximumCardNonRepetitionTime = parseInt(value);
						await this.plugin.saveSettings();
					}));

			new Setting(containerEl)
				.setName('Clear results')
				.addButton(button => button
					.setButtonText("Clear")
					.setWarning()
					.onClick(async () => {
						await this.plugin.resultsController.clear();
					}));
		}

		new Setting(containerEl).setName('JS Functions').setHeading();

		new Setting(containerEl)
			.setName('Enable load cards using JS')
			.addToggle(text => text
				.setValue(this.plugin.settings.enableJS)
				.onChange(async (value) => {
					this.plugin.settings.enableJS = value;
					await this.plugin.saveSettings();
					this.display();
				}));


		new Setting(containerEl).setName('Feedback').setHeading();

		new Setting(containerEl)
			.setName('Sound feedback on answer input')
			.addToggle(text => text
				.setValue(this.plugin.settings.soundFeedback)
				.onChange(async (value) => {
					this.plugin.settings.soundFeedback = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Vibrate feedback on answer input')
			.addToggle(text => text
				.setValue(this.plugin.settings.vibrateFeedback)
				.onChange(async (value) => {
					this.plugin.settings.vibrateFeedback = value;
					await this.plugin.saveSettings();
					this.display();
				}));


		new Setting(containerEl).setName('Tags').setHeading();

		new Setting(containerEl)
			.setName('Quiz tag')
			.addText(text => text
				.setValue(this.plugin.settings.quizTag)
				.onChange(async (value) => {
					this.plugin.settings.quizTag = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('JSON cards tag')
			.addText(text => text
				.setValue(this.plugin.settings.dataJSONTag)
				.onChange(async (value) => {
					this.plugin.settings.dataJSONTag = value;
					await this.plugin.saveSettings();
				}));

		if(this.plugin.settings.enableJS) {
			new Setting(containerEl)
				.setName('JS cards tag')
				.addText(text => text
					.setValue(this.plugin.settings.dataJSTag)
					.onChange(async (value) => {
						this.plugin.settings.dataJSTag = value;
						await this.plugin.saveSettings();
					}));
		}

		if(this.plugin.settings.saveResults) {
			new Setting(containerEl)
				.setName('Today streak tag')
				.addText(text => text
					.setValue(this.plugin.settings.todayTag)
					.onChange(async (value) => {
						this.plugin.settings.todayTag = value;
						await this.plugin.saveSettings();
					}));
		}

	}
}
