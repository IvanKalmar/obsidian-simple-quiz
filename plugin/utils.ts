// For filtering arrays
export function isNotEmpty<Any>(value: Any | null | undefined): value is Any {
	// https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array

	return value !== null && value !== undefined;
}

// Flashcards auto id
export function getStringHashCode(str: string): number {
	// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
	let hash = 0;
	for (let i = 0, len = str.length; i < len; i++) {
		let chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}


export function round(num: number, digits: number = 2) {
	return Math.round((num + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);
}


// Dates

export function getReadableDate(d: Date, enableTime: boolean = false): string {
	// https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript

	let date = ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2) + "." +
		d.getFullYear();
	if(enableTime) {
		date += " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
	}

	return date;
}

export function getDateStartTimestamp(d: Date = new Date()): number {
	let dateCopy = new Date(d);

	dateCopy.setHours(0);
	dateCopy.setMinutes(0);
	dateCopy.setSeconds(0);
	dateCopy.setMilliseconds(0);

	return Math.floor(+ dateCopy / 1000);
}


// Colors

export function addAlphaToHex(color: string, opacity: number) {
	// https://stackoverflow.com/questions/19799777/how-to-add-transparency-information-to-a-hex-color-code
	// coerce values, so it is between 0 and 1.
	let _opacity = Math.round(Math.min(Math.max(opacity ?? 1, 0), 1) * 255);
	return color + _opacity.toString(16).toUpperCase();
}
