import {Question} from "./question";

export class MatchQuestion extends Question {
    onAnswer(resolve: any, reject?: any): Promise<void> {
        return Promise.resolve(undefined);
    }

    setAnswer(): Promise<any> {
        return new Promise((resolve, reject) => {
			resolve(null)
		})
    }

    render(): void {
    }
}
