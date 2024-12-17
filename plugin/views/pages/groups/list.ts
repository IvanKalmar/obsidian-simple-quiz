import {PageView} from "../page";
import {Group} from "../../../data/controllers/groupsController";
import {ListActionSide, ListView} from "../../lists/list";


export class GroupsListPageView extends PageView {
	groups: Group[];

	onBack: () => void;
	onCreate: () => void;
	onUpdate: (groupID: string) => void;
	onDelete: (groupID: string) => void;

	setGroups(groups: Group[]) {
		this.groups = groups;
		return this;
	}

	setOnBack(onBack: () => void) {
		this.onBack = onBack;
		return this;
	}

	setOnCreate(onCreate: () => void) {
		this.onCreate = onCreate;
		return this;
	}

	setOnUpdate(onUpdate: (groupID: string) => void) {
		this.onUpdate = onUpdate;
		return this;
	}

	setOnDelete(onDelete: (groupID: string) => void) {
		this.onDelete = onDelete;
		return this;
	}

	render() {
		const container = this.container.createDiv({
			cls: "full-width"
		});

		new ListView(container)
			.setSearchPlaceholder("Groups")
			.setActions([{
				side: ListActionSide.LEFT,
				icon: 'arrow-big-left-dash',
				classes: [],
				onClick: this.onBack
			}, {
				side: ListActionSide.RIGHT,
				icon: 'plus',
				classes: [],
				onClick: this.onCreate
			}])
			.setItems(this.groups.map(group => {
				return {
					text: group.title,
					actions: [{
						icon: "square-pen",
						classes: ["yellow-icon"],
						onClick: () => {
							this.onUpdate(group.id);
						}
					}, {
						icon: "delete",
						classes: ["red-icon"],
						onClick: () => {
							this.onDelete(group.id)
						}
					}]
				}
			}))
			.render()
	}
}


