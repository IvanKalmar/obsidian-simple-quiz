import {Flashcard} from "./flashcard";
import {Group} from "./controllers/groupsController";


export class FlashcardsManager {
	flashcards: Flashcard[] = [];

	byID: {[key: string]: Flashcard} = {};
	byPool: {[key: string]: Flashcard[]} = {};
	byTag: {[key: string]: Flashcard[]} = {};

	selectedGroups: Set<string> = new Set();
	selectedPools: Set<string> = new Set();
	selectedTags: Set<string> = new Set();
	selectedFlashcards: Set<string> = new Set();

	_groups: {[key: string]: Group} = {};

	setFlashcards(flashcards: Flashcard[]): this {
		this.flashcards = flashcards;

		this.byID = {}
		this.byPool = {};
		this.byTag = {};

		for (const flashcard of Array.from(this.flashcards)) {
			this.byID[flashcard.id] = flashcard;

			if(flashcard.pool) {
				const pool = flashcard.pool;
				if (!this.byPool.hasOwnProperty(pool)) {
					this.byPool[pool] = [];
				}
				this.byPool[pool].push(flashcard);
			}

			if(flashcard.tags) {
				for (const tag of flashcard.tags) {
					if (!this.byTag.hasOwnProperty(tag)) {
						this.byTag[tag] = [];
					}
					this.byTag[tag].push(flashcard);
				}
			}
		}

		return this;
	}

	setGroups(groups: Group[]) {
		this._groups = {};

		for(const group of groups) {
			this._groups[group.id] = group;
		}

		this.selectedGroups.clear();
	}

	getFlashcards(): Flashcard[] {
		return this.flashcards;
	}

	getPools(): string[] {
		return Object.keys(this.byPool);
	}

	getTags(): string[] {
		return Object.keys(this.byTag);
	}

	getGroups(): Group[] {
		return Object.values(this._groups);
	}

	getSelectedCount(): number {
		return this.getQuizFlashcards().length;
	}

	getTotalCount(): number {
		return this.flashcards.length;
	}

	updateSelectedGroups(selectedGroups: Set<string>) {
		this._updateSet(selectedGroups, this.selectedGroups);
	}

	updateSelectedPools(selectedPools: Set<string>) {
		this._updateSet(selectedPools, this.selectedPools);
	}

	updateSelectedTags(selectedTags: Set<string>) {
		this._updateSet(selectedTags, this.selectedTags);
	}

	updateSelectedFlashcardsIDs(selectedCards: Set<string>) {
		this._updateSet(selectedCards, this.selectedFlashcards);
	}

	getQuizFlashcards(): Flashcard[] {
		if((this.selectedPools.size + this.selectedTags.size
			+ this.selectedFlashcards.size + this.selectedGroups.size) == 0) {
			return [];
		}

		let flashcards: Set<Flashcard> = new Set();

		for(const flashcardID of this.selectedFlashcards) {
			if(this.byID.hasOwnProperty(flashcardID)) {
				flashcards.add(this.byID[flashcardID]);
			}
		}

		for(const pool of this.selectedPools) {
			if(this.byPool.hasOwnProperty(pool)) {
				for(const flashcard of this.byPool[pool]) {
					flashcards.add(flashcard);
				}
			}
		}

		for(const tag of this.selectedTags) {
			if(this.byTag.hasOwnProperty(tag)) {
				for(const flashcard of this.byTag[tag]) {
					flashcards.add(flashcard);
				}
			}
		}

		for(const group of this.selectedGroups) {
			if(this._groups.hasOwnProperty(group)) {
				for(const flashcardID of this._groups[group].flashcardsIDs) {
					if(this.byID.hasOwnProperty(flashcardID)) {
						flashcards.add(this.byID[flashcardID]);
					}
				}
			}
		}

		return Array.from(flashcards);
	}

	reset() {
		this.selectedPools.clear();
		this.selectedTags.clear();
		this.selectedFlashcards.clear();
		this.selectedGroups.clear();
	}

	_updateSet(sourceSet: Set<string>, targetSet: Set<string>) {
		for(const item of sourceSet) {
			targetSet.add(item);
		}
	}
}
