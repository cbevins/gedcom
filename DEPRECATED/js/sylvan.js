export const _SylvanSingleton = {singleton: null}
export function getSylvan() { return _SylvanSingleton.singleton }
export function setSylvan(sylvan) { _SylvanSingleton.singleton = sylvan }
