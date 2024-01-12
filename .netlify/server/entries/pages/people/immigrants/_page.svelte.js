import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { S as Surname } from "../../../../chunks/Surname.js";
import { T as Title1 } from "../../../../chunks/Title1.js";
const Immigrants = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Title1, "Title1").$$render(
    $$result,
    {
      title: "Bevins-Heddens Immigrants to North America"
    },
    {},
    {}
  )} <p data-svelte-h="svelte-1b5bv3t">One of my motives for researching my family genealogy
        is to discover when our direct ancestors
        arrived in North America and from whence they came.
        It would furthermore be interesting to identify some of
        the historical, political, economic, or personal factors
        compelling someone to leave their generational home
        for an unknown land across the sea.  Indeed, tracing the
        stories of our grandparents provides a very personal lens
        through which to view some well known events in history.</p> <p data-svelte-h="svelte-1vw57bz">Here are the Bevins-Heddens family migration routes:</p> <ul><li><a class="text-black" href="/people/immigrants/bevins-bolt">1854: ${validate_component(Surname, "Surname").$$render($$result, { name: "Bevins-Bolt" }, {}, {})} from Lancaster, England to New York</a></li></ul> </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container">${validate_component(Immigrants, "Immigrants").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
