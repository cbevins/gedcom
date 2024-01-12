import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { T as Title1 } from "../../../../chunks/Title1.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Title1, "Title1").$$render($$result, { title: "Notation" }, {}, {})} <div class="story" data-svelte-h="svelte-2jl55l"><p>Notations such as [5th GGM, #128], for example, indicate
			a 5th great grandmother with pedigree number 128.
			Pedigree number start with the children of William Bevins
			and Meartia Heddens, so Collin Douglas, Karen Margaret,
			Mark William, and Laura Lee may all identify as #1.
			Their father William is #2 and mother Meartia is #3.
			Grandparents are #4 Samuel Bevins, #5 Hattie Collins,
			#6 Vernon Heddens, and #7 Margaret Eva Nattress. And so forth.</p></div></div>`;
});
export {
  Page as default
};
