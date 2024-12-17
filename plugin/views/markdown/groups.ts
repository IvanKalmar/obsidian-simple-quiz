import {ResultsController} from "../../data/controllers/resultsController";
import {MarkdownBase} from "./base";
import {FlashcardsManager} from "../../data/flashcardsManager";
import {setIcon} from "obsidian";
import {QuizView} from "../quiz";
import {GroupsView} from "../groups";
import {base} from "w3c-keyname";
import {GroupsController} from "../../data/controllers/groupsController";


export class MarkdownGroupsViewSettings {
	minify: boolean = false;
	hideCounters: boolean = false;
}


export class MarkdownGroupsView extends MarkdownBase {
	groupsController: GroupsController;

	minify: boolean = false;

	setGroupsController(groupsController: GroupsController) {
		this.groupsController = groupsController;
		return this;
	}
	setSettings(markdownGroupsViewSettings: MarkdownGroupsViewSettings) {
		this.minify = markdownGroupsViewSettings.minify;

		return this;
	}

	render() {
		const baseContainer = this.getBaseContainer(
			this.minify,
			this.minify,
			this.minify,
			this.minify,
			this.minify,
			this.minify,
		);

		if(!this.minify) {
			baseContainer.primaryTitle.setText("Quiz groups");
			setIcon(baseContainer.icon, "boxes");
		}

		new GroupsView(baseContainer.container)
			.setGroupsController(this.groupsController)
			.render()
	}
}


