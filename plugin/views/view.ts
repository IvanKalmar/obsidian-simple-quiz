export abstract class View {
	container: HTMLElement;

	constructor(container: HTMLElement) {
		this.container = container;
	}

	abstract render(): void;
}
