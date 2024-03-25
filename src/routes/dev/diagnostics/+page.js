/**
 * This function is only run on the client-side by the browser to create the master Sylvan instance.
 * Since it has no access to the local file system, it cannot directly read the source GEDCOM file.
 * Instead, the server (+page.server.js) load() function reads the GEDCOM file into a plain old JSON array
 * which is network transportable, and is made available to this load() function  by the *data* object.
 * This function then parses the file array to create and hydrate the master Sylvan instance.
 */
import { Sylvan } from '$lib/Sylvan/class/Sylvan.js'
import { getSylvan, setSylvan, setPersonSelectors } from '$lib/Sylvan/js/singletons.js'

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true

/**
 * Parses the plan old Json Object array of GEDCOM file lines loaded by the server (./+page.server.js)
 * and returns the hydrated Sylvan instance to +page.svelte in its *data* export.
 */
/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
    const self = 'CLIENT: src/routes/dev/diagnostics/+page.js:load() -'
    console.log(`${self} received GEDCOM array with ${data.gedcomLines.length} lines.`)
    if (! getSylvan()) {
        const sylvan = new Sylvan(data.gedcomLines)
        setSylvan(sylvan)
        setPersonSelectors(sylvan.people().selectors())
        console.log(`${self} created Sylvan with ${sylvan.people().size()} Persons`)
        return {sylvan: sylvan}
    } else {
        console.log(`${self} - Sylvan was previously loaded`)
        return {sylvan: getSylvan()}
    }
}