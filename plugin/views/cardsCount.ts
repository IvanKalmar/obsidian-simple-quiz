import {View} from "./view";
import {setIcon} from "obsidian";

export class CardsCountView extends View {
	count: number = 5;

	onCountUpdate: (count: number) => void;

	setOnCountUpdate(onCountUpdate: (count: number) => void): this {
		this.onCountUpdate = onCountUpdate;
		return this;
	}

	render() {
		const container = this.container.createDiv({
			cls: "cards-count-container"
		})

		let minusIcon = container.createSpan({
			cls: "margin-right-small cursor-pointer medium-icon"
		});
		setIcon(minusIcon, "minus");

		let count = container.createEl("h1", {
			cls: "normal-text-weight large-text disable-spacing",
			text: this.count.toString()
		});

		let plusIcon = container.createSpan({
			cls: "margin-left-small cursor-pointer medium-icon"
		});
		setIcon(plusIcon, "plus");

		minusIcon.on("click", "span", () => {
			let step = this.count <= 5 ? 1 : 5;
			this.count = (this.count - step) < 1 ? 1 : this.count - step;
			count.setText(this.count.toString());
			this.onCountUpdate(this.count);
		});

		plusIcon.on("click", "span", () => {
			let step = this.count < 5 ? 1 : 5;
			this.count = (this.count + step) > 150 ? 150 : this.count + step;
			count.setText(this.count.toString());
			this.onCountUpdate(this.count);
		});

		this.onCountUpdate(this.count);
	}
}
