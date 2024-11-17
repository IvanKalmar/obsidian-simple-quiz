export function notEmpty<Any>(value: Any | null | undefined): value is Any {
	return value !== null && value !== undefined;
}

export function readableDate(d: Date): string {
	// https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript

	return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
		d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
}
