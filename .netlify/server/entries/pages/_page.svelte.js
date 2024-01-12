import { c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
import { S as Surname } from "../../chunks/Surname.js";
import { T as Title1 } from "../../chunks/Title1.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1ct7rho_START -->${$$result.title = `<title>Bevins-Riley</title>`, ""}<meta name="description" content="Bevins-Heddens & Riley-Trombley Genealogy"><!-- HEAD_svelte-1ct7rho_END -->`, ""} <div class="container-fluid">${validate_component(Title1, "Title1").$$render(
    $$result,
    {
      title: "Welcome to Collin's Genealogy Site"
    },
    {},
    {}
  )} <p>This is where I organize the information I collect
		while researching my family tree
		(${validate_component(Surname, "Surname").$$render($$result, { name: "Bevins-Heddens" }, {}, {})}),
		and the family tree of my wife, Barbara Riley
		(${validate_component(Surname, "Surname").$$render($$result, { name: "Riley-Trombley" }, {}, {})}).
		So it is a continuous work-in-progress.</p> <p data-svelte-h="svelte-1jo0jwt">Explore the menus to see what I&#39;ve collected so far!</p></div>`;
});
export {
  Page as default
};
