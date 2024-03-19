/**
 * Example of using Sylvan
 */
import * as process from 'process'
import { Review } from './Review.js'
import { Sylvan } from './Sylvan.js'

const time1 = new Date()
const parms = getArgs()

await mission(parms)
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mission(parms) {
    const sylvan = new Sylvan()
    await sylvan.init(parms.file, true)

    console.log(`\n${sylvan.source()} GEDCOM File: '${parms.file} has ${sylvan.readerMessages().length} GedcomReader messages:`)
    if (sylvan.readerMessages().length) console.log(sylvan.readerMessages())

    if (parms.contexts) displayContextCounts(sylvan)
    if (parms.findall) displayFindAll(sylvan, '@I896@', ['INDI','NAME','GIVN'])
    if (parms.locations) displayLocations(sylvan)
    if (parms.people) displayPeople(sylvan)
    if (parms.block) displayTopLevelBlock(sylvan, 'INDI', '@I896@')
    if (parms.toplevels) displayTopLevelCounts(sylvan)
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

function displayContextCounts(sylvan) {
    const contexts = sylvan.contexts()
    console.log(`\nGedcomRecord Contexts and Counts:`)
    let total = 0
    for(let i=0; i<contexts.length; i++) {
        const [context, count] = contexts[i]
        console.log(count.toString().padStart(7), context)
        total += count
    }
    console.log(total.toString().padStart(7), 'Total Records')
}

// This only works of GEDCOM was saved by new Sylvan(fileName, TRUE)
function displayFindAll(sylvan, key, context) {
    if (! sylvan.gedrecs()) {
        console.log('displayFindAll() not available because GedcomRecords were not saved')
        return
    }
    const gedrecs = sylvan.gedrecs()
    const records = gedrecs.findAllRecords(key, context)
    console.log(`\nResults of findAll('${key}', '${context.join('-')}'):`)
    for(let i=0; i<records.length; i++) {
        const rec = records[i]
        console.log(rec.lineNo(), rec.level(), rec.content())
    }
}

function displayLocations(sylvan) {
    console.log('UPDATE THIS METHOD')
    return
    // const ar = locations(gedrecs)
    // for(let i=0; i<ar.length; i++) {
    //     const [key, stnd, lat, lon] = ar[i]
    //     console.log(key.padEnd(60), '=>', stnd, lat, lon)
    // }
}

// Illustrates how to hydrate the entire GEDCOM Tree
function displayPeople(sylvan) {
    console.log(`Sylvan has:`)
    console.log(`  ${sylvan.people().size()} Persons`)
    console.log(`  ${sylvan.families().size()} Families`)
    console.log(`  ${sylvan.places().size()} Places`)
    console.log(`  ${sylvan.locations().size()} Locations`)

    // Conduct a Review
    displayMultipleFathers(sylvan)
    displayMultipleMothers(sylvan)

    // Use the data
    // const person = people.find('CollinDouglasBevins1952')
    // console.log(`${person.nameLabel()} ${person.mother().fullName()} ${person.father().fullName()}`)
    // console.log(person.birthPlace())
    // const fam = person.familyParents()[0]
    // console.log(fam.xParent().fullName(), 'MARR', fam.unionDate(), 'DIV', fam.disunionDate())
}

// This only works of GEDCOM was saved by new Sylvan(fileName, TRUE)
function displayTopLevelBlock(sylvan, type, key) {
    if (! sylvan.gedrecs()) {
        console.log('displayTopLevelBlock() not available because GedcomRecords were not saved')
        return
    }
    const head = sylvan.gedrecs().findHead(type, key)
    console.log(`\nGedcomRecord Block for ${type} '${key}':`)
    const block = head.listBlock() // Returns array of strings indented by level
    for (let i=0; i<block.length; i++)
        console.log(block[i])
}

function displayTopLevelCounts(sylvan) {
    // Returns array of [type0, count] arrays of all Level 0 record types
    const topLevels = sylvan.topLevelRecords()
    console.log(`\nGEDCOM File has ${topLevels.length} Level 0 record types.\nRecord Count`)
    let total = 0
    for(let i=0; i<topLevels.length; i++) {
        const [type, count] = topLevels[i]
        console.log(type.padStart(8), count.toString().padStart(6))
        total += count
    }
    console.log('Level 0 ', total.toString().padStart(6))
}

function displayMultipleFathers(sylvan) {
    const persons = sylvan.multipleFathers()
    console.log(`\n${persons.length} MULTIPLE FATHERS:`)
    for (let i=0; i<persons.length; i++) {
        const person = persons[i]
        console.log(`  ${i+1} Person ${person.label()} has ${person.fathers().length} fathers:`)
        for (let j=0; j<person.fathers().length; j++) {
            const father = person.father(j)
            console.log(`    ${j+1}: ${father.label()} [${father.gedKey()}]`)
        }
    }
}

function displayMultipleMothers(sylvan) {
    const persons = sylvan.multipleMothers()
    console.log(`\n${persons.length} MULTIPLE MOTHERS:`)
    for (let i=0; i<persons.length; i++) {
        const person = persons[i]
        console.log(`  ${i+1} Person ${person.label()} has ${person.mothers().length} mothers:`)
        for (let j=0; j<person.mothers().length; j++) {
            const mother = person.mother(j)
            console.log(`    ${j+1}: ${mother.label()} [${mother.gedKey()}]`)
        }
    }
}

    