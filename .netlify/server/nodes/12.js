import * as server from '../entries/pages/sverdle/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sverdle/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/sverdle/+page.server.js";
export const imports = ["_app/immutable/nodes/12.SGQS_O--.js","_app/immutable/chunks/scheduler.aWavPrPv.js","_app/immutable/chunks/each.Er4cDRtD.js","_app/immutable/chunks/index.gqNGKEWV.js","_app/immutable/chunks/parse.RrI1B0B4.js","_app/immutable/chunks/singletons.QDB2usBv.js","_app/immutable/chunks/paths.RGVxvMAl.js"];
export const stylesheets = ["_app/immutable/assets/12.zpJKtCAG.css"];
export const fonts = [];
