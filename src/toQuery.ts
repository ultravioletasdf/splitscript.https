export default function (obj: object) {
	const queryString = Object.entries(obj)
		.map(([key, val]) => {
			let stringified = JSON.stringify(val);
			return `${key}=${encodeURIComponent(stringified)}`;
		})
		.join('&');
	return '?' + queryString;
}
