import { c as create_ssr_component, a as subscribe, e as each, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const css = {
  code: ".nav-pills.svelte-evgpip>li.svelte-evgpip+li.svelte-evgpip{margin-left:10px}",
  map: null
};
function menuButtonHtml(route, label) {
  let html = '<a class="nav-link dropdown-toggle text-black bg-success"';
  html += 'data-bs-toggle="dropdown"';
  html += `href="${route}">${label}</a>`;
  return html;
}
const NavBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const about = [
    ["/", "Home"],
    ["/about/motivation", "Motivation"],
    ["/about/notation", "Notation"],
    ["/about/tools", "Tools"]
  ];
  const people = [
    ["/people/explorer", "Explorer"],
    ["/people/immigrants", "Immigrants"],
    ["/people/surnames", "Surnames"]
  ];
  const Menus = [["/about", "About", about], ["/people", "People", people]];
  function menuHtml(props) {
    const [route, label, items] = props;
    let html = menuButtonHtml(route, label);
    html += '<ul class="dropdown-menu text-black bg-success">';
    for (let i = 0; i < items.length; i++) {
      const [href, text] = items[i];
      html += menuItemHtml(href, text);
    }
    html += "</ul>";
    return html;
  }
  function menuItemHtml(href, text) {
    return `<a class="dropdown-item text-black bg-success" aria-current=${$page.url.pathname === href ? "page" : void 0} href="${href}">${text}</a>`;
  }
  $$result.css.add(css);
  $$unsubscribe_page();
  return `<div><ul class="nav nav-pills nav-justified justify-content-center svelte-evgpip">${each(Menus, (menu) => {
    return `<li class="nav-item dropdown svelte-evgpip"><!-- HTML_TAG_START -->${menuHtml(menu)}<!-- HTML_TAG_END --> </li>`;
  })}</ul> </div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="container-fluid"><div class="row">${validate_component(NavBar, "NavBar").$$render($$result, {}, {}, {})}</div> <main>${slots.default ? slots.default({}) : ``}</main> <footer data-svelte-h="svelte-sjry9h"></footer></div>`;
});
export {
  Layout as default
};
