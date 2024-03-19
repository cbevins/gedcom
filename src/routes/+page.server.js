import { Sylvan } from '$lib/Gedcom/Sylvan.js'
import { GedcomReader } from '$lib/Gedcom/GedcomReader.js'

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const fileName = 'src/lib/data/RootsMagicAncestrySync.ged'
    const reader = new GedcomReader()
    const gedcom = await reader.toArray(fileName)
    console.log(`src/routes/+page.server.js:load() - read ${gedcom.length} lines from GEDCOM file '${fileName}'`)
	return {gedcom: gedcom, serverMessage: 'src/routes/+page.server.js'}
}