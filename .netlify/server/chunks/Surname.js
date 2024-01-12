import { c as create_ssr_component, b as escape } from "./ssr.js";
const css = {
  code: "span.svelte-1qatfkl{font-size:100%;font-weight:bold}",
  map: null
};
const Surname = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = "Provide a surname" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$result.css.add(css);
  return `<span class="svelte-1qatfkl">${escape(name)}</span>`;
});
export {
  Surname as S
};
