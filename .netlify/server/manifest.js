export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Collin.jpg","favicon.png","robots.txt"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.fkEk33N9.js","app":"_app/immutable/entry/app.RRFWPwge.js","imports":["_app/immutable/entry/start.fkEk33N9.js","_app/immutable/chunks/scheduler.aWavPrPv.js","_app/immutable/chunks/singletons.T04h9596.js","_app/immutable/chunks/paths.NpxNCnu_.js","_app/immutable/chunks/parse.RrI1B0B4.js","_app/immutable/entry/app.RRFWPwge.js","_app/immutable/chunks/scheduler.aWavPrPv.js","_app/immutable/chunks/index.gqNGKEWV.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js'))
		],
		routes: [
			{
				id: "/people",
				pattern: /^\/people\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/people/explorer",
				pattern: /^\/people\/explorer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/people/immigrants",
				pattern: /^\/people\/immigrants\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/people/immigrants/bevins-bolt",
				pattern: /^\/people\/immigrants\/bevins-bolt\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/people/surnames",
				pattern: /^\/people\/surnames\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/sverdle",
				pattern: /^\/sverdle\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
