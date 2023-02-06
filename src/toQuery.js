module.exports = function (obj) {
	const queryString = Object.entries(obj)
		.map(([key, val]) => {
			let stringified =
				typeof val === 'object' ? JSON.stringify(val) : val;
			return `${key}=${encodeURIComponent(stringified)}`;
		})
		.join('&');
	return '?' + queryString;
};
