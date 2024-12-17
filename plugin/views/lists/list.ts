import {View} from "../view";
import {setIcon} from "obsidian";

export enum ListActionSide {
	LEFT, RIGHT
}

export interface ListAction {
	side?: ListActionSide,
	icon: string,
	classes: string[],
	onClick: (event: MouseEvent) => void
}


export interface ListItems {
	text: string
	actions: ListAction[]
}


export class ListView extends View {
	selectListContainer: HTMLDivElement;
	searchPlaceholder: string = ""
	items: ListItems[];
	actions: ListAction[];

	setSearchPlaceholder(searchPlaceholder: string): this {
		this.searchPlaceholder = searchPlaceholder;
		return this;
	}

	setItems(items: ListItems[]): this {
		this.items = items;
		return this;
	}

	setActions(actions: ListAction[]): this {
		this.actions = actions;
		return this;
	}

	empty() {
		if(this.selectListContainer) {
			this.selectListContainer.remove();
		}
	}

	render() {
		this.empty();

		this.selectListContainer = this.container.createDiv({
			cls: "full-height select-list-container"
		});

		const inputContainer = this.selectListContainer.createDiv({
			cls: "select-list-input-container margin-bottom-medium"
		});

		const actionsLeft = inputContainer.createDiv({
			cls: "flex-center"
		})
		for(const action of this.actions) {
			if(action.side != ListActionSide.LEFT) {
				continue;
			}

			const icon = actionsLeft.createSpan({
				cls: "margin-right-medium flex-center small-icon cursor-pointer",
			});
			setIcon(icon, action.icon);
			icon.on("click", "span", action.onClick);
		}

		const searchField = inputContainer.createEl("input", {
			cls: "flex-fill",
			type: "text",
			placeholder: this.searchPlaceholder
		});

		const actionsRight = inputContainer.createDiv({
			cls: "flex-center"
		})
		for(const action of this.actions) {
			if(action.side != ListActionSide.RIGHT) {
				continue;
			}

			const icon = actionsRight.createSpan({
				cls: "margin-left-medium flex-center small-icon cursor-pointer",
			});
			setIcon(icon, action.icon);
			icon.on("click", "span", action.onClick);
		}

		let itemsContainer = this.selectListContainer.createDiv({
			cls: "flex-fill static-height",
		}).createDiv({
			cls: "container-style search-list-items-container"
		});

		const limit: number = 20;
		let offset: number = 0;

		let currentItems = this.items;

		const addItems = () => {
			for(const item of currentItems.slice(offset, offset + limit)) {
				const itemElement = itemsContainer.createDiv({
					cls: `search-list-item cursor-pointer padding-medium`,
					text: item.text
				});

				const actions = itemElement.createDiv({
					cls: "flex-center"
				})
				for(const action of item.actions) {
					const icon = actions.createSpan({
						cls: "margin-left-medium icon-button " + action.classes.join(" "),
					});
					setIcon(icon, action.icon);
					icon.on("click", "span", action.onClick);
				}
			}
			offset += limit;
		}

		const clearContainer = () => {
			itemsContainer.empty();
			itemsContainer.scrollTo(0, 0);
			offset = 0;
			addItems();
		}

		itemsContainer.on("scroll", "div", () => {
			if((itemsContainer.scrollTop + itemsContainer.offsetHeight) > itemsContainer.scrollHeight * 0.95) {
				addItems();
			}
		});

		let timer: any = null;
		searchField.on("input", "input", () => {
			if(timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				let searchString = searchField.value ? searchField.value : "";
				searchString = searchString.toLocaleLowerCase().trim();

				currentItems = this.items.filter((item) => item.text.toLocaleLowerCase().includes(searchString));

				clearContainer();

				timer = null;
			}, 500);
		});

		addItems();
	}
}
