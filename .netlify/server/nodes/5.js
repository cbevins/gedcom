import * as universal from '../entries/pages/about/notation/_page.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about/notation/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/about/notation/+page.js";
export const imports = ["_app/immutable/nodes/5.yoSG5UKA.js","_app/immutable/chunks/environment.30ImaL5r.js","_app/immutable/chunks/scheduler.aWavPrPv.js","_app/immutable/chunks/index.gqNGKEWV.js","_app/immutable/chunks/Title1.BpDEW3qJ.js"];
export const stylesheets = ["_app/immutable/assets/Title1.5ciNeusx.css"];
export const fonts = [];
