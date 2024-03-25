export const __Singletons = {
    personSelectors: null,
    sylvan: null
}

export function getPersonSelectors() { return __Singletons.personSelectors }
export function setPersonSelectors(personSelectors) { __Singletons.personSelectors = personSelectors }

export function getSylvan() { return __Singletons.sylvan }
export function setSylvan(sylvan) { __Singletons.sylvan = sylvan }
