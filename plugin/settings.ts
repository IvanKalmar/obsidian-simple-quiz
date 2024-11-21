import {App, PluginSettingTab, Setting} from "obsidian";
import SimpleQuizPlugin from "./plugin";
import {readableDate} from "./utils";

export interface SimpleQuizPluginSettings {
	dataJSONTag: string;
	dataJSTag: string;
	todayStatisticsTag: string;

	indexing: boolean;
	saveResults: boolean;
	enableJS: boolean;

	showCardsPlaceholder: boolean;
}

export const DEFAULT_SETTINGS: SimpleQuizPluginSettings = {
	dataJSONTag: "quizjson",
	dataJSTag: "quizjs",
	todayStatisticsTag: "quiztoday",

	indexing: true,
	saveResults: true,
	enableJS: false,

	showCardsPlaceholder: true,
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

		new Setting(containerEl)
			.setName('Show cards placeholder')
			.setDesc('Placeholder at card definition place')
			.addToggle(text => text
				.setValue(this.plugin.settings.showCardsPlaceholder)
				.onChange(async (value) => {
					this.plugin.settings.showCardsPlaceholder = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Load cards using JS')
			.addToggle(text => text
				.setValue(this.plugin.settings.enableJS)
				.onChange(async (value) => {
					this.plugin.settings.enableJS = value;
					await this.plugin.saveSettings();
					this.display();
				}));


		new Setting(containerEl).setName('Cache').setHeading();

		new Setting(containerEl)
			.setName('Indexing flashcards')
			.setDesc('If enabled, flashcards must be updated manually by button bellow or command')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.indexing)
				.onChange(async (value) => {
					this.plugin.settings.indexing = value;
					await this.plugin.saveSettings();
					this.display();
				}));

		if(this.plugin.settings.indexing) {
			let indexUpdateAt = "null";
			let indexUpdateAtDate = this.plugin.index.updatedAt;
			if(indexUpdateAtDate) {
				indexUpdateAt = readableDate(indexUpdateAtDate);
			}
			new Setting(containerEl)
				.setName('Repeat indexing')
				.setDesc(`Recollect flashcards from vault, last update: ${indexUpdateAt}`)
				.addButton(button => button
					.setButtonText("Update flashcards index")
					.setWarning()
					.onClick(async () => {
						await this.plugin.index.reindex();
						this.display();
				}));
		}


		new Setting(containerEl)
			.setName('Save results')
			.setDesc('If enabled, results will be saved')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.saveResults)
				.onChange(async (value) => {
					this.plugin.settings.saveResults = value;
					await this.plugin.saveSettings();
				}));
		if(this.plugin.settings.saveResults) {
			new Setting(containerEl)
				.setName('Clear results')
				.addButton(button => button
					.setButtonText("Clear")
					.setWarning()
					.onClick(async () => {
						await this.plugin.results.clear();
					}));
		}


		new Setting(containerEl).setName('Tags').setHeading();

		new Setting(containerEl)
			.setName('Cards from JSON tag')
			.addText(text => text
				.setValue(this.plugin.settings.dataJSONTag)
				.onChange(async (value) => {
					this.plugin.settings.dataJSONTag = value;
					await this.plugin.saveSettings();
				}));

		if(this.plugin.settings.enableJS) {
			new Setting(containerEl)
				.setName('Cards from JS tag')
				.addText(text => text
					.setValue(this.plugin.settings.dataJSTag)
					.onChange(async (value) => {
						this.plugin.settings.dataJSTag = value;
						await this.plugin.saveSettings();
					}));
		}

		if(this.plugin.settings.saveResults) {
			new Setting(containerEl)
				.setName('Today statistics tag')
				.addText(text => text
					.setValue(this.plugin.settings.todayStatisticsTag)
					.onChange(async (value) => {
						this.plugin.settings.todayStatisticsTag = value;
						await this.plugin.saveSettings();
					}));
		}

	}
}
