import {DataController} from "./dataController";
import {FlashcardStatus, ResultsController} from "./resultsController";
import {Controller} from "./controller";
import {getStringHashCode} from "../../utils";

export class GroupsController extends Controller {
	resultsController: ResultsController;
	dataController: DataController;

	defaultGroups: Group[] = [];
	userGroups: Group[] = [];

	async load() {
		this.resultsController = this.plugin.resultsController;
		this.dataController = this.plugin.dataController;

		this._updateDefaultGroups();
	}



	getGroups(): Group[] {
		this._updateDefaultGroups();
		return [...this.defaultGroups, ...this.userGroups];
	}

	addGroup(group: Group) {
		// Todo maybe
	}

	_updateDefaultGroups() {
		if(this.resultsController.enabled) {
			this.defaultGroups = [
				new Group("Last quiz", this.resultsController.getLastFlashcardsIDs()),
				new Group("Failed score", this.resultsController.getFlashcardsIDsByStatus(FlashcardStatus.FAILED)),
				new Group("Middle score", this.resultsController.getFlashcardsIDsByStatus(FlashcardStatus.MIDDLE)),
				new Group("Success score", this.resultsController.getFlashcardsIDsByStatus(FlashcardStatus.SUCCESS)),
			]
		}
	}
}

export class Group {
	id: string;
	title: string;
	flashcardsIDs: string[];

	constructor(title: string, flashcardsIDs: string[] = []) {
		this.id = "id:" + getStringHashCode(title);
		this.title = title;
		this.flashcardsIDs = flashcardsIDs;
	}
}
