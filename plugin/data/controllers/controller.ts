import SimpleQuizPlugin from "../../plugin";

export abstract class Controller {
	plugin: SimpleQuizPlugin;

	setPlugin(plugin: SimpleQuizPlugin): this {
		this.plugin = plugin;
		return this;
	}

	abstract load(): Promise<void>;
}
