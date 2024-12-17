import {View} from "../view";
import {setIcon} from "obsidian";
import {it} from "node:test";

export interface SelectListItems {
	text: string
	value: string
}

export interface SelectListAction {
	icon: string,
	onClick: () => void
}

export class SelectListView extends View {
	selectListContainer: HTMLDivElement;
	actions: SelectListAction[] = [];
	searchPlaceholder: string = ""
	items: SelectListItems[];
	selectedItems: Set<string>;
	onSelectedItemsChanged: (selectedItems: Set<string>) => void;

	setActions(actions: SelectListAction[]) {
		this.actions = actions;
		return this;
	}

	setSearchPlaceholder(searchPlaceholder: string): this {
		this.searchPlaceholder = searchPlaceholder;
		return this;
	}

	setItems(items: SelectListItems[]): this {
		this.items = items;
		return this;
	}

	setSelectedItems(selectedItems: Set<string>): this {
		this.selectedItems = selectedItems;
		return this;
	}

	setOnSelectedItemsChanged(onSelectedItemsChanged: (selectedItems: Set<string>) => void): this {
		this.onSelectedItemsChanged = onSelectedItemsChanged;
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

		const actions = inputContainer.createDiv({
			cls: "flex-center"
		})
		for(const action of this.actions) {
			const icon = actions.createSpan({
				cls: "margin-right-medium flex-center small-icon cursor-pointer",
			});
			setIcon(icon, action.icon);
			icon.on("click", "span", action.onClick);
		}

		const searchField = inputContainer.createEl("input", {
			cls: "flex-fill",
			type: "text",
			placeholder: this.searchPlaceholder
		})

		const selectedCountElement = inputContainer.createDiv({
			cls: "margin-left-medium"
		}).createEl("h5", {
			cls: "secondary-text disable-spacing",
			text: "0"
		});

		const clearIcon = inputContainer.createSpan({
			cls: "margin-left-medium small-icon flex-center cursor-pointer red-icon"
		});
		setIcon(clearIcon, "circle-x");

		const updateSelectedItems = () => {
			selectedCountElement.setText(this.selectedItems.size.toString());
		}

		updateSelectedItems();

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
				const selected: string = this.selectedItems.has(item.value) ? "search-list-item-selected" : "";
				const itemElement = itemsContainer.createDiv({
					cls: `search-list-item cursor-pointer padding-medium ${selected}`,
					text: item.text
				});

				itemElement.on("click", "div", () => {
					if(!this.selectedItems.has(item.value)) {
						this.selectedItems.add(item.value);
						itemElement.classList.add("search-list-item-selected");
					} else {
						this.selectedItems.delete(item.value);
						itemElement.classList.remove("search-list-item-selected");
					}
					updateSelectedItems();
					this.onSelectedItemsChanged(this.selectedItems);
				});
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

		clearIcon.on("click",  "span", () => {
			currentItems = this.items;
			this.selectedItems.clear();
			clearContainer();
			updateSelectedItems();
			this.onSelectedItemsChanged(this.selectedItems);
		});

		addItems();
	}
}
