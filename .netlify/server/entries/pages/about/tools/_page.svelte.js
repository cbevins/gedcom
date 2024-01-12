import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { T as Title1 } from "../../../../chunks/Title1.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Title1, "Title1").$$render($$result, { title: "Tools" }, {}, {})} <div class="story" data-svelte-h="svelte-1hrxu5c"><ul>Genealogy Tools
			<li>Ancenstery.com</li> <li>FamilySearch.com</li></ul> <ul>Web Development Tools
			<li>Visual Studio Code</li> <li>SvelteKit</li> <li>Bootstrap 5</li></ul></div></div>`;
});
export {
  Page as default
};
