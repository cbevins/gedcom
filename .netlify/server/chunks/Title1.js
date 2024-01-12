import { c as create_ssr_component, b as escape } from "./ssr.js";
const css = {
  code: "div.svelte-1xmt1nv{background-color:gray;border:2px solid black;border-radius:5px;box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);color:black;font-size:140%;margin:20px;padding:20px;text-align:center}",
  map: null
};
const Title1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Provide a Level 1 Title" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css);
  return `<div class="container-md svelte-1xmt1nv">${escape(title)}</div>`;
});
export {
  Title1 as T
};
