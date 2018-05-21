

const mockConfig = require('./config');


module.exports = (control) => {

	let getList = {};
	let postList = {};
	let getAlwaysRun = [];
	let postAlwaysRun = [];

	let router = {
		get: (url, callback) => {
			if(url === '*') {
				getAlwaysRun.push(callback);
			}
			else {
				getList[url] = callback;
			}
		},
		post: (url, callback) => {
			if(url === '*') {
				postAlwaysRun.push(callback);
			}
			else {
				postList[url] = callback;
			}
		}
	};

	control(router);


	return async (ctx, next) => {
		let method = ctx.request.method.toUpperCase();
		let url = ctx.request.url;


		if(method === 'GET') {
			if(getList[url]) {
				await getList[url](ctx, next);
			}
			else {
				getAlwaysRun.map((fn) => {
					fn(ctx, next);
				});
			}
		}
		else if (method === 'POST'){
			if(postList[url]) {
				await postList[url](ctx, next);
			}
			else {
				postAlwaysRun.map((fn) => {
					fn(ctx, next);
				});
			}
		}

	}

};
