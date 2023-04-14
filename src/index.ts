import * as https from 'node:https';
import toQuery from './toQuery.js';
import { RequestOptions } from 'node:https';

/** Send a HTTPS request */
export async function request(options: RequestOptions) {
	return new Promise((resolve, reject) => {
		const request = https.request(options, (res) => {
			let data = '';
			res.on('data', (chunk) => (data += chunk));
			res.on('close', () => {
				try {
					resolve(JSON.parse(data));
				} catch (e) {
					resolve(data);
				}
			});
		});
		request.on('error', (err) => reject(err));
		request.end();
	});
}
/** Send a GET request */
export async function get(
	url: string,
	params?: object,
	options?: RequestOptions | null
) {
	return new Promise((resolve, reject) => {
		if (typeof params === 'object') url += toQuery(params); // Add optional query params

		const request = https.request(
			url,
			{ method: 'GET', ...options },
			(res) => {
				let data = '';
				res.on('data', (chunk) => (data += chunk));
				res.on('close', () => {
					try {
						resolve(JSON.parse(data));
					} catch (e) {
						resolve(data);
					}
				});
			}
		);
		request.on('error', (err) => reject(err));
		request.end();
	});
}
/** Send a POST request */
export async function post(
	url: string,
	data?: any,
	options?: RequestOptions | null
) {
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
					try {
						resolve(JSON.parse(data));
					} catch (e) {
						resolve(data);
					}
				});
			}
		);

		if (data) request.write(JSON.stringify(data)); // Send request data
		request.on('error', (err) => reject(err));
		request.end();
	});
}
/** Send a PUT request*/
export async function put(
	url: string,
	data?: any,
	options?: RequestOptions | null
) {
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
					try {
						resolve(JSON.parse(data));
					} catch (e) {
						resolve(data);
					}
				});
			}
		);

		if (data) request.write(JSON.stringify(data)); // Send request data
		request.on('error', (err) => reject(err));
		request.end();
	});
}
/** Send a PATCH request */
export async function patch(url: string, data?: any, options?: RequestOptions) {
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
					try {
						resolve(JSON.parse(data));
					} catch (e) {
						resolve(data);
					}
				});
			}
		);

		if (data) request.write(JSON.stringify(data)); // Send request data
		request.on('error', (err) => reject(err));
		request.end();
	});
}
/** Send a DELETE request */
async function _delete(url: string, options?: RequestOptions) {
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
					try {
						resolve(JSON.parse(data));
					} catch (e) {
						resolve(data);
					}
				});
			}
		);

		request.on('error', (err) => reject(err));
		request.end();
	});
}
export { _delete as delete };
