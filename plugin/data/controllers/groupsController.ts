import {DataController} from "./dataController";
import {FlashcardStatus, ResultsController} from "./resultsController";
import {Controller} from "./controller";
import {getStringHashCode, isNumeric} from "../../utils";
import {Flashcard} from "../flashcard";
import {inflate} from "node:zlib";

export class GroupsController extends Controller {
	resultsController: ResultsController;
	dataController: DataController;

	defaultGroups: Group[] = [];
	userGroups: {[key in string]: Group} = {};

	async load() {
		this.resultsController = this.plugin.resultsController;
		this.dataController = this.plugin.dataController;

		await this._load();
	}

	getGroups(flashcards: Flashcard[]): Group[] {
		this._updateDefaultGroups(flashcards);

		return [
			...this.defaultGroups,
			...this._loadFlashcardsIDs(Object.values(this.userGroups), flashcards)
		];
	}

	getUserGroups(): Group[] {
		return Object.values(this.userGroups);
	}

	getGroup(groupID: string): Group | null {
		if(!this.userGroups.hasOwnProperty(groupID)) {
			return null;
		}

		return this.userGroups[groupID]
	}

	async addGroup(title: string, condition: string) {
		const group = new Group(title, condition);
		this.userGroups[group.id] = group;
		await this._save();
	}

	async updateGroup(groupID: string, title: string, condition: string) {
		if(this.userGroups.hasOwnProperty(groupID)) {
			this.userGroups[groupID].title = title;
			this.userGroups[groupID].condition = condition;
			await this._save();
		}
	}

	async removeGroup(groupID: string) {
		if(this.userGroups.hasOwnProperty(groupID)) {
			delete this.userGroups[groupID];
			await this._save();
		}
	}

	_updateDefaultGroups(flashcards: Flashcard[] | null) {
		if(this.resultsController.enabled) {
			let last: string[] = [];
			let failed: string[] = [];
			let middle: string[] = [];
			let success: string[] = [];

			if(flashcards) {
				const flashcardsIDs = flashcards.map(f => f.id);

				last = this.resultsController.getLastFlashcardsIDs()
					.filter(flashcardID => flashcardsIDs.includes(flashcardID));

				flashcardsIDs.forEach(flashcardID => {
					switch (this.resultsController.getCardStatus(flashcardID)) {
						case FlashcardStatus.FAILED: {
							failed.push(flashcardID);
							break;
						}
						case FlashcardStatus.MIDDLE: {
							middle.push(flashcardID);
							break;
						}
						case FlashcardStatus.SUCCESS: {
							success.push(flashcardID);
							break;
						}
					}
				});

			} else {
				last = this.resultsController.getLastFlashcardsIDs();
				failed = this.resultsController.getFlashcardsIDsByStatus(FlashcardStatus.FAILED);
				middle = this.resultsController.getFlashcardsIDsByStatus(FlashcardStatus.MIDDLE);
				success = this.resultsController.getFlashcardsIDsByStatus(FlashcardStatus.SUCCESS);
			}

			this.defaultGroups = [
				new Group("Last quiz", 	"",	last),
				new Group("Failed score",	"",	failed),
				new Group("Middle score",	"", 	middle),
				new Group("Success score",	"", 	success),
			]
		}
	}

	_loadFlashcardsIDs(groups_: Group[], flashcards_: Flashcard[]): Group[] {
		const flashcards = flashcards_.map(flashcard => {
			return Object.assign({
				score: this.resultsController.getCardScore(flashcard.id),
				status: this.resultsController.getCardStatus(flashcard.id),
			}, flashcard);
		});

		return groups_.map(group => {
			group.flashcardsIDs = flashcards.filter(flashcard => {
				return this._calculateCondition((' ' + group.condition).slice(1), flashcard)
			}).map(flashcard => flashcard.id);

			return group;
		});
	}

	_calculateCondition(condition: string, flashcard_: any): boolean {
		let brackets = null;
		do {
			brackets = /(\((?:\(??[^\(]*?\)))/.exec(condition);
			if (brackets) {
				condition = condition.substring(0, brackets.index) + " " +
					this._calculateCondition(brackets[0].substring(1, brackets[0].length - 1), flashcard_).toString() + " " +
					condition.substring(brackets[0].length);
			}
		} while (brackets != null)

		let result: boolean | null = null;
		let lastOperation = null;
		do {
			let subSentence: string;
			const globalOperation = /(\s(or|and)\s)(?=[^"]*(?:"[^"]*"[^"]*)*$)/ig.exec(condition);
			if (globalOperation) {
				lastOperation = globalOperation[0].trim();
				subSentence = condition.substring(0, globalOperation.index).trim();
				condition = condition.substring(globalOperation.index + globalOperation[0].length).trim();
			} else {
				subSentence = condition;
			}

			let leftOperand, rightOperand;
			const sentenceOperation = /(\s(in|>|>=|<|<=|==)\s)(?=[^"]*(?:"[^"]*"[^"]*)*$)/ig.exec(subSentence);
			if (sentenceOperation) {
				leftOperand = castOperand(subSentence.substring(0, sentenceOperation.index).trim(), flashcard_);
				rightOperand = castOperand(subSentence.substring(sentenceOperation.index + sentenceOperation[0].length).trim(), flashcard_);

				//console.log(subSentence.substring(0, sentenceOperation.index).trim(), leftOperand);
				//console.log(subSentence.substring(sentenceOperation.index + sentenceOperation[0].length).trim(), rightOperand);

				switch (sentenceOperation[0].trim()) {
					case "in": {
						leftOperand = leftOperand.includes(rightOperand);
						break;
					}
					case ">": {
						leftOperand = leftOperand > rightOperand;
						break;
					}
					case ">=": {
						leftOperand = leftOperand >= rightOperand;
						break;
					}
					case "<": {
						leftOperand = leftOperand < rightOperand;
						break;
					}
					case "<=": {
						leftOperand = leftOperand <= rightOperand;
						break;
					}
					case "==": {
						leftOperand = leftOperand == rightOperand;
						break;
					}
				}
			} else {
				leftOperand = castOperand(subSentence, flashcard_);
			}

			if (result == null) {
				result = Boolean(leftOperand);
			} else {
				switch (lastOperation) {
					case "and": {
						result = result && Boolean(leftOperand);
						break;
					}
					case "or": {
						result = result || Boolean(leftOperand);
						break;
					}
				}
			}

			if (!globalOperation) {
				lastOperation = null;
			}
		} while (lastOperation != null)

		return Boolean(result);
	}

	async _save() {
		await this.dataController.saveGroups(this.userGroups);
	}

	async _load() {
		this.userGroups = {};

		const groups = await this.dataController.loadGroups();
		if(groups) {
			this.userGroups = groups as {[key in string]: Group};
		}
	}
}

export class Group {
	id: string;
	title: string;
	condition: string;
	flashcardsIDs: string[];

	constructor(title: string, condition: string, flashcardsIDs: string[] = []) {
		this.id = "id:" + getStringHashCode(title);
		this.title = title;
		this.condition = condition;
		this.flashcardsIDs = flashcardsIDs;
	}
}

function castOperand(operand: string, variables: object): any {
	if((operand[0] == "[") && (operand[operand.length - 1] == "]")) {  // Array
		return operand.substring(1, operand.length - 1).split(",").map(value => {
			return castOperand(value.trim(), variables);
		})
	} else if(isNumeric(operand)) {  // Number
		return Number(operand);
	} else if(/(true|false)/.test(operand)) {  // Boolean
		return operand == "true";
	} else if (
		(operand[0] == "'" || operand[0] == '"') &&
		(operand[operand.length - 1] == "'" || operand[operand.length - 1] == '"')
	) {  // String
		return operand.substring(1, operand.length - 1);
	}

	if(variables.hasOwnProperty(operand)) {
		// @ts-ignore
		return variables[operand];
	}

	return null;
}
