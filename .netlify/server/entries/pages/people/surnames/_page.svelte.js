import { c as create_ssr_component, b as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { S as Surname } from "../../../../chunks/Surname.js";
import { T as Title1 } from "../../../../chunks/Title1.js";
const css = {
  code: "div.svelte-1asw9l5{border:2px solid black;border-radius:5px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);color:black;margin-top:0px;margin-bottom:1rem;margin-left:20px;margin-right:20px;padding:5px}p.quote.svelte-1asw9l5{font-size:80%;font-style:italic;font-weight:normal;margin-top:0px;margin-bottom:0.5rem;text-align:left}p.source.svelte-1asw9l5{font-size:80%;font-style:normal;font-weight:normal;margin-top:0rem;margin-bottom:0rem;text-align:left;text-indent:20px}",
  map: null
};
const QuoteBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { source = "Provide the source" } = $$props;
  let { text = "Provide the text" } = $$props;
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  $$result.css.add(css);
  return `<div class="svelte-1asw9l5"><p class="quote svelte-1asw9l5">${escape(text)}</p> <p class="source svelte-1asw9l5">— ${escape(source)}</p> </div>`;
});
let dafn = "Dictionary of American Family Names [2nd edition, 2022]";
const Bevins = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Title1, "Title1").$$render(
    $$result,
    {
      title: "Bevins-Heddens Surname Origin and Meaning"
    },
    {},
    {}
  )} <p>I initially started down the genealogical road
		because I wanted to discover the origin of the
		${validate_component(Surname, "Surname").$$render($$result, { name: "Bevins" }, {}, {})} surname.</p> <p>We had been told as children that our surname was English.
		But most of the sources I originally found said
		it is a Welsh patronymic surname from 
		${validate_component(Surname, "Surname").$$render($$result, { name: "ab-Evan" }, {}, {})} or
		${validate_component(Surname, "Surname").$$render($$result, { name: "ap-Evan" }, {}, {})} (&quot;son of Evan&quot;),
		and thence contracted to ${validate_component(Surname, "Surname").$$render($$result, { name: "Bevan" }, {}, {})}.</p> <p>Eventually, I found the <em>${escape(dafn)}</em>, which categorically states:</p> ${validate_component(QuoteBox, "QuoteBox").$$render(
    $$result,
    {
      text: "\r\n		Bevins Name Meaning:\r\n		English (Leicestershire of Norman origin): variant of Bevins\r\n		with post-medieval excresent -s.\r\n		There has been some confusion with Welsh Bevan and Bevans.",
      source: dafn
    },
    {},
    {}
  )} <p>The same source says the following of the surname ${validate_component(Surname, "Surname").$$render($$result, { name: "Bevin" }, {}, {})}:</p> ${validate_component(QuoteBox, "QuoteBox").$$render(
    $$result,
    {
      text: '\r\n		Bevin Name Meaning:\r\n		English (of Norman origin): nickname from Old French\r\n		"bei vin" or "boi vin" for "drink wine".',
      source: dafn
    },
    {},
    {}
  )} <p>So don&#39;t be confused, as I was, about how we were Welsh.
		Indeed, if you explore the <a href="/bevins-heddens/pedigree">the ${validate_component(Surname, "Surname").$$render($$result, { name: "Bevins" }, {}, {})} family predigree</a>,
		you will see that it goes back to Leicestershire, England for many generations,
		and <em data-svelte-h="svelte-r5iszh">not</em> to Wales.</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container">${validate_component(Bevins, "Bevins").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Page as default
};
