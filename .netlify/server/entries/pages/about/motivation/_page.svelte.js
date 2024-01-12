import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { S as Surname } from "../../../../chunks/Surname.js";
import { T as Title1 } from "../../../../chunks/Title1.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Title1, "Title1").$$render($$result, { title: "Motivation" }, {}, {})} <div class="story"><p data-svelte-h="svelte-17wcb37">A lot of people are interested in exploring their family genealogy
			to see if they have any celebrity or famous relatives,
			or if they are descended royalty and own any castles.</p> <p>My initial motiviation was to discover where the ${validate_component(Surname, "Surname").$$render($$result, { name: "Bevins" }, {}, {})} surname originated.
			It seems to be a fairly uncommon surname in the United States, and there are conflicting
			statements whether it is English or Welsh.
			(The answer for our Bevins name, <a href="/people/surnames" data-svelte-h="svelte-s3lg9r">is here</a>.)</p> <p data-svelte-h="svelte-wxe2hz">My second motiviating factor was to discover where my direct ancestors
			came from.  I had heard various ratios of English, Norwegian, Irish,
			Scottish, German, etc, but wanted a more quantitative answer.</p> <p data-svelte-h="svelte-1h6bdz6">But once I started exploring the question of <em>where</em> my
			grand parents came from, the obvious question arises of <em>why</em>
			did they leave their ancestoral homeland to undertake a dangerous
			sea crossing onto an unexplored continent?  Were they driven here
			by political and economic forces?  Or were they adventurers
			seeking their fortunes in a New World?</p> <p data-svelte-h="svelte-36o2rl">So while I have always been interested in history,
			exploring my family genealogy offers a personal perspective
			on how historical events impacted my direct ancestors,
			thereby determining who I am and how I got here.
			It is also a great way to understand on a personal scale
			the important political, economic, and religious events
			that seemed so remote in school text books.</p> <p data-svelte-h="svelte-164ohil">Finally, finding a unique way to present my research results
			allows me to keep my web development skills sharp and current.</p></div></div>`;
});
export {
  Page as default
};
