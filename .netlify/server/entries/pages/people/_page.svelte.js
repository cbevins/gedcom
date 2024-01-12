import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h3 data-svelte-h="svelte-1suw2yu">routes/people/+page.svelte</h3> <p data-svelte-h="svelte-11b37bg">This page should not be displayed,
	Only its child people/explorer
	page should be accessible.</p>`;
});
export {
  Page as default
};
