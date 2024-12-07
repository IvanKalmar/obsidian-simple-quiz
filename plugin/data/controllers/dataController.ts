import {App, normalizePath, TFile, TFolder, Vault} from "obsidian";
import {ParserResult} from "../../parser";
import {Controller} from "./controller";

function getFilesFromPaths(vault: Vault, paths: string[]): TFile[] {
	let files: TFile[] = [];

	paths.forEach(path => {
		const abstractFile = vault.getAbstractFileByPath(path);

		if(abstractFile instanceof TFile) {
			files.push(abstractFile);
		}

		if(abstractFile instanceof TFolder) {
			files = [...files, ...getFilesFromPaths(vault, abstractFile.children.map(af => af.path))]
		}
	})

	return files;
}

export class DataController extends Controller {
	app: App;

	pluginFolder: string;
	resultsFile: string;
	lastFile: string;

	async load(): Promise<void> {
		this.app = this.plugin.app;

		this.pluginFolder = normalizePath(this.app.vault.configDir + "/plugins/simple-quiz");

		this.resultsFile = normalizePath(this.pluginFolder + "/results.json");
		this.lastFile = normalizePath(this.pluginFolder + "/last.json");
	}

	async getAllData(filesList: string[] | null = null): Promise<ParserResult> {
		const files = filesList == null ? this.app.vault.getFiles() : getFilesFromPaths(this.app.vault, filesList);

		let parseResult = new ParserResult([], []);
		for(const file of files) {
			parseResult.append(
				await this.plugin.parser.parseFile(
					await this.app.vault.read(file)
				)
			);
		}

		return parseResult;
	}

	async loadResultsObject(): Promise<object> {
		return await this.loadFile(this.resultsFile);
	}

	async saveResultsObject(obj: object): Promise<void> {
		await this.saveFile(this.resultsFile, obj);
	}

	async saveFile(file: string, data: object): Promise<void> {
		await this.app.vault.adapter.write(file, JSON.stringify(data));
	}

	async loadFile(file: string): Promise<any | null> {
		try {
			return JSON.parse(await this.app.vault.adapter.read(file));
		} catch (e) { }

		return null;
	}
}
