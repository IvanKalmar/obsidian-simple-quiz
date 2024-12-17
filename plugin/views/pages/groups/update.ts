import {PageView} from "../page";
import {GroupsController} from "../../../data/controllers/groupsController";
import {setIcon} from "obsidian";

export class GroupsUpdatePageView extends PageView {
	groupsController: GroupsController;
	title: string = "";
	condition: string = "";

	onBack: () => void;
	onCreate: (title: string, condition: string) => void;

	setGroupsController(groupsController: GroupsController) {
		this.groupsController = groupsController;
		return this;
	}

	setTitle(title: string) {
		this.title = title;
		return this;
	}

	setCondition(condition: string) {
		this.condition = condition;
		return this;
	}

	setOnBack(onBack: () => void) {
		this.onBack = onBack;
		return this;
	}

	setOnCreate(onCreate: (title: string, condition: string) => void) {
		this.onCreate = onCreate;
		return this;
	}

	render() {
		const container = this.container.createDiv({
			cls: "full-width"
		});

		const inputContainer = container.createDiv({
			cls: "full-width flex-center margin-bottom-medium"
		});

		const backIcon = inputContainer.createSpan({
			cls: "margin-right-medium small-icon flex-center cursor-pointer"
		});
		setIcon(backIcon, "arrow-big-left-dash");

		const titleField = inputContainer.createEl("input", {
			cls: "flex-fill",
			type: "text",
			value: this.title,
			placeholder: "Title"
		});

		const createIcon = inputContainer.createSpan({
			cls: "margin-left-medium small-icon flex-center cursor-pointer"
		});
		setIcon(createIcon, "check");

		let textarea = container.createEl("textarea", {
			cls: "padding-medium full-width medium-large-text container-style " +
				"disable-outline static-height",
			text: this.condition,
			attr: {
				placeholder: "Condition"
			}
		});

		backIcon.on("click", "span", () => {
			this.onBack();
		});

		createIcon.on("click", "span", () => {
			this.onCreate(titleField.value, textarea.value);
		})
	}
}
