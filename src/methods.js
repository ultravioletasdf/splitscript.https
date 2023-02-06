const https = require('node:https');
const toQuery = require('./toQuery.js');
module.exports = {
	/**
	 * Send a HTTPS request
	 * @param {object} options Config for request
	 */
	request: function (options) {
		return new Promise((resolve, reject) => {
			const request = https.request(options, (res) => {
				let data = '';
				res.on('data', (chunk) => (data += chunk));
				res.on('close', () => resolve(JSON.parse(data)));
			});
			request.on('error', (err) => reject(err));
			request.end();
		});
	},
	/**
	 * Send a GET request
	 * @param      {string}       url       URL to send request to
	 * @param      {object}       params    URL Parameters to send. Must be plain object
	 * @param      {?object}      options   additional config for the request. E.g: headers
	 */
	get: function (url, params, options) {
		return new Promise((resolve, reject) => {
			if (typeof params === 'object') url += toQuery(params); // Add optional query params

			const request = https.request(
				url,
				{ method: 'GET', ...options },
				(res) => {
					let data = '';
					res.on('data', (chunk) => (data += chunk));
					res.on('close', () => resolve(JSON.parse(data)));
				}
			);
			request.on('error', (err) => reject(err));
			request.end();
		});
	},
	/**
	 * Send a POST request
	 * @param      {string}       url       URL to send request to
	 * @param      {any}          data      data to send with request
	 * @param      {?object}      options   additional config for the request. E.g: headers
	 */
	post: async function (url, data, options) {
		return new Promise((resolve, reject) => {
			const request = https.request(
				url,
				{ method: 'POST', ...options },
				(res) => {
					let data = '';

					res.on('data', (chunk) => {
						data += chunk;
					});
					res.on('close', () => {
						resolve(JSON.parse(data));
					});
				}
			);

			request.write(JSON.stringify(data)); // Send request data
			request.on('error', (err) => reject(err));
			request.end();
		});
	},
	/**
	 * Send a PUT request
	 * @param      {string}       url       URL to send request to
	 * @param      {any}          data      data to send with request
	 * @param      {?object}      options   additional config for the request. E.g: headers
	 */
	put: async function (url, data, options) {
		return new Promise((resolve, reject) => {
			const request = https.request(
				url,
				{ method: 'PUT', ...options },
				(res) => {
					let data = '';

					res.on('data', (chunk) => {
						data += chunk;
					});
					res.on('close', () => {
						resolve(JSON.parse(data));
					});
				}
			);

			request.write(JSON.stringify(data)); // Send request data
			request.on('error', (err) => reject(err));
			request.end();
		});
	},
	/**
	 * Send a PATCH request
	 * @param      {string}       url       URL to send request to
	 * @param      {any}          data      data to send with request
	 * @param      {object}       options   additional config for the request. E.g: headers
	 */
	patch: async function (url, data, options) {
		return new Promise((resolve, reject) => {
			const request = https.request(
				url,
				{ method: 'PATCH', ...options },
				(res) => {
					let data = '';

					res.on('data', (chunk) => {
						data += chunk;
					});
					res.on('close', () => {
						resolve(JSON.parse(data));
					});
				}
			);

			request.write(JSON.stringify(data)); // Send request data
			request.on('error', (err) => reject(err));
			request.end();
		});
	},
	/**
	 * Send a DELETE request
	 * @param      {string}       url       URL to send request to
	 * @param      {object}       options   additional config for the request. E.g: headers
	 */
	delete: async function (url, options) {
		return new Promise((resolve, reject) => {
			const request = https.request(
				url,
				{ method: 'DELETE', ...options },
				(res) => {
					let data = '';

					res.on('data', (chunk) => {
						data += chunk;
					});
					res.on('close', () => {
						resolve(JSON.parse(data));
					});
				}
			);

			request.on('error', (err) => reject(err));
			request.end();
		});
	},
};
