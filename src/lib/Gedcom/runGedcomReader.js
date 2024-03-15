/**
 * Example of reading a GEDCOM file exported by ANcestry.com or Roots Magic
 * into a GedRecords object for further parsing and analysis.
 */
import * as process from 'process'
import { GedcomReader } from './GedcomReader.js'

const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const Roots = "../data/Root Magic Bevins-Riley Ancestry Ged.ged"

const time1 = new Date()
let gedcomFileName = Roots
if (process.argv.length > 2) {
    gedcomFileName = process.argv[2]
    // console.log('***\n*** usage: node runGedcomReader <gedcomFilePath>\n***')
    // process.exit()
}

await mission(gedcomFileName)
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mission(gedcomFileName) {
    const reader = new GedcomReader()
    const gedrecs = await reader.readFile(gedcomFileName)

    // Diplay any GedcomReader messages
    console.log(`\nGEDCOM File: '${gedcomFileName}' has ${reader.messages().length} GedcomReader messages:`)
    if (reader.messages().length) console.log(reader.messages())

    // Display top level record counts
    displayTopLevelCounts(gedrecs)

    // Display record context counts
    // displayContextCounts(gedrecs)

    // Display all subrecords for a specific toplevel key
    // displayTopLevelBlock('INDI', '@I13@', gedrecs)

    // Find all GedcomRecords of a specific context for a specific level0 type
    // displayFindAll('@I100@', ['INDI','NAME','GIVN'], gedrecs)
}

function displayContextCounts(gedrecs) {
    const contexts = gedrecs.contexts()
    console.log(`\nGedcomRecord Contexts and Counts:`)
    for(let i=0; i<contexts.length; i++) {
        const [ctx, cnt] = contexts[i]
        console.log(cnt.toString().padStart(5), ctx)
    }
}

function displayFindAll(key, context, gedrecs) {
    // Returns array of references to all GedcomRecord objects whose top level key and context array matches
    const records = gedrecs.findAll(key, context)
    console.log(`\nResults of findAll('${key}', '${context.join('-')}'):`)
    for(let i=0; i<records.length; i++) {
        const rec = records[i]
        console.log(rec.lineNo(), rec.level(), rec.content())
    }
}

function displayTopLevelBlock(type, key, gedrecs) {
    console.log(`\nGedcomRecord Block for ${type} '${key}':`)
    const head = gedrecs.findHead(type, key)
    const block = head.listBlock() // Returns array of strings indented by level
    for (let i=0; i<block.length; i++)
        console.log(block[i])
}

function displayTopLevelCounts(gedrecs) {
    // Returns array of [type0, count] arrays of all Level 0 record types
    const topLevels = gedrecs.topLevelCounts()
    console.log(`\nGEDCOM File has ${topLevels.length} Level 0 record types.\n Count Type`)
    let total = 0
    for(let i=0; i<topLevels.length; i++) {
        const [type, count] = topLevels[i]
        console.log(count.toString().padStart(6), type)
        total += count
    }
    console.log(total.toString().padStart(6), 'TOTAL TOP LEVEL 0 RECORDS')
}
    