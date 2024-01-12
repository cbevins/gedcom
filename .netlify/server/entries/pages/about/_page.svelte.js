import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h3 data-svelte-h="svelte-14vaxdg">routes/about/+page.svelte</h3> <p data-svelte-h="svelte-aqebdo">This page should not be displayed,
	Only its child &#39;about/motivation&#39;, &#39;about/notation&#39;, and &#39;about/tools&#39;
	pages should be accessible.</p>`;
});
export {
  Page as default
};
