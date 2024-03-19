import { Sylvan } from '$lib/Gedcom/Sylvan.js'
import { getSylvan, setSylvan } from '$lib/js/sylvan.js'

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true

/**
 * Parses the plan old Json Object array of GEDCOM file lines loaded by the server (./+page.server.js)
 * and return a Sylvan instance
 */
/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
    if (! getSylvan()) {
        const sylvan = new Sylvan()
        await sylvan.initFromArray(data.gedcom)
        setSylvan(sylvan)
        console.log(`src/routes/+page.js:load() - created Sylvan with ${sylvan.people().size()} Persons`)
    }
    return {sylvan: getSylvan()}
}