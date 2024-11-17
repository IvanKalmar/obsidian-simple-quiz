import {DataController} from "./controller";
import {Notice} from "obsidian";
import {Flashcard} from "./flashcards";

class IndexData {
	flashcards: Flashcard[];
	updatedAt: number;
}

export class Index {
	dataController: DataController;
	indexing: boolean;
	indexData: IndexData;
	updatedAt: Date;

	constructor(dataController: DataController, indexing: boolean) {
		this.dataController = dataController;
		this.indexing = indexing;
		this.indexData = new IndexData();

		if(this.indexing) {
			this.dataController.loadIndexObject().then((indexObject) => {
				if(indexObject) {
					this.indexData = Object.assign(new IndexData(), indexObject);
					this.updatedAt = new Date(this.indexData.updatedAt * 1000);
				} else {
					this.reindex().then();
				}
			});
		}
	}

	setIndexing(indexing: boolean) {
		this.indexing = indexing;
	}

	async reindex() {
		let flashcards = await this.dataController.loadAllFlashcards();

		new Notice(`Indexed ${flashcards.length} flashcards`);

		this.updatedAt = new Date();
		this.indexData = new IndexData();
		this.indexData.flashcards = flashcards;
		this.indexData.updatedAt = Math.floor( (+ this.updatedAt) / 1000);

		this.dataController.saveIndexObject(this.indexData).then();
	}

	getFlashcards(): Flashcard[] {
		return this.indexData.flashcards
	}
}
