

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/people/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.MB9Ok8gz.js","_app/immutable/chunks/scheduler.aWavPrPv.js","_app/immutable/chunks/index.gqNGKEWV.js"];
export const stylesheets = [];
export const fonts = [];
