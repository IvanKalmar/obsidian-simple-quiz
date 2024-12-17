import {View} from "./view";
import {GroupsController} from "../data/controllers/groupsController";
import {GroupsListPageView} from "./pages/groups/list";
import {GroupsUpdatePageView} from "./pages/groups/update";


export class GroupsView extends View {
	groupsController: GroupsController;

	setGroupsController(groupsController: GroupsController) {
		this.groupsController = groupsController;
		return this;
	}

	render() {
		const container = this.container.createDiv({
			cls: "full-width full-height"
		});

		const groupsList = new GroupsListPageView(container)
			.setGroups(this.groupsController.getGroups());

		const groupsCreate = new GroupsUpdatePageView(container)
			.setOnBack(() => {
				container.empty();
				groupsList.render();
			})
			.setGroupsController(this.groupsController);

		groupsCreate.setOnCreate((title: string, condition: string) => {
			this.groupsController.addGroup(title, condition);

			container.empty();
			groupsList
				.setGroups(this.groupsController.getGroups())
				.render();
		});

		groupsList.setOnCreate(() => {
			container.empty();
			groupsCreate
				.setTitle("")
				.setCondition("")
				.render();
		}).setOnUpdate((value) => {
			const group = this.groupsController.getGroup(value);

			if(group) {
				container.empty();

				groupsCreate
					.setTitle(group.title)
					.setCondition(group.condition)
					.render();
			}
		}).setOnDelete((value) => {
			this.groupsController.removeGroup(value);

			container.empty();
			groupsList
				.setGroups(this.groupsController.getGroups())
				.render();
		});

		groupsList.render();
	}
}
