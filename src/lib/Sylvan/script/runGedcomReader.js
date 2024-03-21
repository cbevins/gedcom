/**
 * Example of reading a GEDCOM file exported by Ancestry.com or Roots Magic
 * into a GedcomRecords instance for further parsing and analysis.
 */
import { file2JsonArray } from '../js/file2JsonArray.js'
import { GedcomReader } from '../class/GedcomReader.js'
const fileName = "../../data/RootsMagicAncestrySync.ged"

const time1 = new Date()
await mission()
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mission() {
    const lines = await file2JsonArray(fileName)
    const reader = new GedcomReader(lines)
    const gedcom = reader.gedcom()
    const source = gedcom.isAncestry() ? 'Accestry.com' : 'Roots Magic'
    console.log(`\n${source} GEDCOM File: '${fileName}' has ${reader.messages().length} GedcomReader messages:`)
    if (reader.messages().length) console.log(reader.messages())
}
