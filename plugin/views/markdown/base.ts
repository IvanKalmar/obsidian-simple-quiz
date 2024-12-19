import {View} from "../view";
import {setIcon} from "obsidian";

export class MarkdownBaseContainer {
	icon: HTMLSpanElement;
	primaryTitle: HTMLHeadingElement;
	secondaryTitle: HTMLSpanElement;
	actionsContainer: HTMLDivElement;
	container: HTMLDivElement;

	constructor(icon: HTMLSpanElement, primaryTitle: HTMLHeadingElement, secondaryTitle: HTMLSpanElement,
				actionsContainer: HTMLDivElement, container: HTMLDivElement) {
		this.icon = icon;
		this.primaryTitle = primaryTitle;
		this.secondaryTitle = secondaryTitle;
		this.actionsContainer = actionsContainer;
		this.container = container;
	}
}

export abstract class MarkdownBase extends View {
	onOpen: () => void;

	setOnOpen(onOpen: () => void) {
		this.onOpen = onOpen;
		return this;
	}

	getBaseContainer(
		simpleContainer: boolean = false,
		centerHeader: boolean = false,
		hideIcon: boolean = false,
		hidePrimaryTitle: boolean = false,
		hideSecondaryTitle: boolean = false,
		hideActionsContainer: boolean = false,
	): MarkdownBaseContainer {
		let container = this.container.createDiv({
			cls: "simple-quiz"
		}).createDiv({
			cls: simpleContainer ? "markdown-base-block-minify" : "markdown-base-block"
		});

		let headerContainer = container.createDiv({
			cls: centerHeader ? "flex-center" : "markdown-base-block-header-container"
		});

		let headerTitleContainer = headerContainer.createDiv({
			cls: "markdown-base-block-header-container-title"
		});

		let icon = headerTitleContainer.createSpan({
			cls: "medium-icon"
		});

		const primaryTitle = headerTitleContainer.createEl("h2", {
			cls: "margin-left-medium",
			text: ""
		});

		const secondaryTitle = headerTitleContainer.createEl("h2", {
			cls: "secondary-text margin-left-medium"
		});

		let actionsContainer = headerContainer.createDiv({
			cls: "markdown-base-block-header-actions-container"
		});

		if(hideIcon) { icon.remove(); }
		if(hidePrimaryTitle) { primaryTitle.remove(); }
		if(hideSecondaryTitle) { secondaryTitle.remove(); }
		if(hideActionsContainer) { actionsContainer.remove(); }

		return new MarkdownBaseContainer(
			icon, primaryTitle, secondaryTitle,
			actionsContainer, container
		);
	}

	createStartIcon(container: HTMLElement, onClick: () => void) {
		let startIcon = container.createSpan({
			cls: "large-icon green-icon cursor-pointer margin-left-large"
		});
		setIcon(startIcon, "play");

		startIcon.on("click", "span", () => {
			onClick();
		});
	}
}
