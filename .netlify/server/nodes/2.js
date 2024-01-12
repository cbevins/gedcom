import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.GS4KuVrz.js","_app/immutable/chunks/scheduler.aWavPrPv.js","_app/immutable/chunks/index.gqNGKEWV.js","_app/immutable/chunks/Surname._t-EMYjp.js","_app/immutable/chunks/Title1.BpDEW3qJ.js"];
export const stylesheets = ["_app/immutable/assets/Surname.xudbTIb4.css","_app/immutable/assets/Title1.5ciNeusx.css"];
export const fonts = [];
