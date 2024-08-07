/**
 * Example of reading a GEDCOM file exported by Ancestry.com or Roots Magic
 * into a GedcomRecords instance for further parsing and analysis.
 */
import * as process from 'process'
import { GedcomReader } from './GedcomReader.js'
import { Locations } from './Locations.js'
import { Families } from './Families.js'
import { People } from './People.js'
import { Places } from './Places.js'
import { Review } from './Review.js'

const time1 = new Date()
const parms = getArgs()

await mission(parms)
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mission(parms) {
    const reader = new GedcomReader()
    const gedrecs = await reader.readFile(parms.file)

    // Diplay any GedcomReader messages
    const source = gedrecs.isAncestry() ? 'Accestry.com' : 'Roots Magic'
    console.log(`\n${source} GEDCOM File: '${parms.file}' has ${reader.messages().length} GedcomReader messages:`)
    if (reader.messages().length) console.log(reader.messages())

    if (parms.contexts) displayContextCounts(gedrecs)
    if (parms.findall) displayFindAll(gedrecs, '@I100@', ['INDI','NAME','GIVN'])
    if (parms.locations) displayLocations(gedrecs)
    if (parms.people) displayPeople(gedrecs)
    if (parms.block) displayTopLevelBlock(gedrecs, 'INDI', '@I13@')
    if (parms.toplevels) displayTopLevelCounts(gedrecs)
}

function getArgs() {
    if (process.argv.length < 3) {
        console.log('***\n*** usage: node runGedcomReader ["ancestry" | "roots"] ["block", "contexts", "find", "locations", "toplevels"]\n***')
        process.exit()
    }

    const gedcoms = [
        {flag: 'ancestry', file: "../data/Bevins-Riley Family Tree.ged"},
        {flag: 'roots', file: "../data/RootsMagicAncestrySync.ged"},
    ]
    const parms = {
        file : gedcoms[1].file,
        block: false, contexts: false, findall: false, locations: false, toplevels: false
    }
    for (let i=2; i<process.argv.length; i++) {
        const arg = (process.argv[i]).toLowerCase()
        const a = arg.substring(0, 1)
        if (a === 'b') parms.block = true
        else if (a === 'c') parms.contexts = true
        else if (a === 'f') parms.findall = true
        else if (a === 'l') parms.locations = true
        else if (a === 'p') parms.people = true
        else if (a === 't') parms.toplevels = true
        else {
            for(let i=0; i<gedcoms.length; i++) {
                if (a === gedcoms[i].flag.substring(0,1))
                    parms.file = gedcoms[i].file
            }
        }
    }
    return parms
}

function displayContextCounts(gedrecs) {
    const contexts = gedrecs.contexts()
    console.log(`\nGedcomRecord Contexts and Counts:`)
    for(let i=0; i<contexts.length; i++) {
        const [ctx, cnt] = contexts[i]
        console.log(cnt.toString().padStart(5), ctx)
    }
}

function displayFindAll(gedrecs, key, context) {
    // Returns array of references to all GedcomRecord objects whose top level key and context array matches
    const records = gedrecs.findAll(key, context)
    console.log(`\nResults of findAll('${key}', '${context.join('-')}'):`)
    for(let i=0; i<records.length; i++) {
        const rec = records[i]
        console.log(rec.lineNo(), rec.level(), rec.content())
    }
}

function displayLocations(gedrecs) {
    console.log('UPDATE THIS METHOD')
    return
    // const ar = locations(gedrecs)
    // for(let i=0; i<ar.length; i++) {
    //     const [key, stnd, lat, lon] = ar[i]
    //     console.log(key.padEnd(60), '=>', stnd, lat, lon)
    // }
}

// Illustrates how to hydrate the entire GEDCOM Tree
function displayPeople(gedrecs) {
    // Step 1 - Create Places instance
    const places = new Places()
    
    // Step 2 - Create the People instance
    const people = new People(gedrecs, places)
    console.log(`There are ${people.size()} Persons`)
    
    // Step 3 - Create the Families instance
    const families = new Families(gedrecs, people, places)
    console.log(`There are ${families.size()} Families`)

    // How many places are there?
    console.log(`There are ${places.size()} Places`)

    // How many Locations?
    const locations = new Locations(gedrecs)
    console.log(`There are ${locations.size()} Locations`)

    // Conduct a Review
    const review = new Review(people, families, places, locations)
    console.log('MULTIPLE MOTHERS', review.multipleMotherMessages())
    console.log('MULTIPLE FATHERS', review.multipleFatherMessages())

    // Use the data
    // const person = people.find('CollinDouglasBevins1952')
    // console.log(`${person.nameLabel()} ${person.mother().fullName()} ${person.father().fullName()}`)
    // console.log(person.birthPlace())
    // const fam = person.familyParents()[0]
    // console.log(fam.xParent().fullName(), 'MARR', fam.unionDate(), 'DIV', fam.disunionDate())
}

function displayTopLevelBlock(gedrecs, type, key) {
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
    