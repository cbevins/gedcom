/**
 * This load() function is only run once, on the server side (+page.server.js).
 * Since it has access to the local file system,
 * it is able to read the source GEDCOM file into a plain old JSON array
 * (which is network transportable) which is passed to the client-side
 * (+page.js) load() function in its data.gedcomLines function argument.
 */
import { file2JsonArray } from '$lib/Sylvan/js/file2JsonArray.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const fileName = 'src/lib/data/RootsMagicAncestrySync.ged'
    const lines = await file2JsonArray(fileName)
    const self = 'SERVER: src/routes/dev/diagnostics/+page.server.js:load()'
    console.log(`${self} - read ${lines.length} lines from GEDCOM file '${fileName}'`)
	return {gedcomLines: lines, loader: self}
}