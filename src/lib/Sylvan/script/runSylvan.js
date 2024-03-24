/**
 * Example of using Sylvan
 */
import * as process from 'process'
import { file2JsonArray } from '../js/file2JsonArray.js'
import { Ancestors } from '../class/Ancestors.js'
import { Generations } from '../class/Generations.js'
import { lineage } from '../js/lineage.js'
import { origins } from '../js/origins.js'
import { Sylvan } from '../class/Sylvan.js'
const fileName = "../../data/RootsMagicAncestrySync.ged"

const time1 = new Date()
const parms = getArgs()
await mainFunction(parms)
const time2 = new Date()
console.log(`\nElapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mainFunction(parms) {
    // First load the GEDCOM file into a POJO array
    const lines = await file2JsonArray(fileName)
    // Then parse the GEDCOM lines and create the Sylvan instance
    const sylvan = new Sylvan(lines, true)

    console.log(`\n${sylvan.source()} GEDCOM File: '${fileName}' has ${sylvan.readerMessages().length} GedcomReader messages:`)
    if (sylvan.readerMessages().length) console.log(sylvan.readerMessages())

    if (parms.ancestors) displayAncestors(sylvan)
    if (parms.block) displayTopLevelBlock(sylvan, 'INDI', '@I896@')
    if (parms.contexts) displayContextCounts(sylvan)
    if (parms.findall) displayFindAll(sylvan, '@I896@', ['INDI','NAME','GIVN'])
    if (parms.generations) displayGenerations(sylvan)
    if (parms.lineage) displayLineage(sylvan)
    // if (parms.origins) displayOrigins(sylvan, 'WilliamBevins1705')
    // if (parms.origins) displayOrigins(sylvan, 'SarahWilkinson1696')
    // if (parms.origins) displayOrigins(sylvan, 'ThomasBevins1731')
    // if (parms.origins) displayOrigins(sylvan, 'PatrickCollins1755')
    // if (parms.origins) displayOrigins(sylvan, 'ElizabethOldhamPepper1755')
    // if (parms.origins) displayOrigins(sylvan, 'Rhesa"Reese"Collins1780')
    if (parms.origins) displayOrigins(sylvan, 'CollinDouglasBevins1952')
    if (parms.person) displayPerson(sylvan)
    if (parms.summary) displaySummary(sylvan)
    if (parms.toplevels) displayTopLevelCounts(sylvan)
}

function getArgs() {
    if (process.argv.length < 3) {
        console.log('***\n*** usage: node runSylvan.js ["ancestors", "block", "contexts", "find", "locations", "summary", "toplevels"] where:')
        console.log("   ancestors: displays my ancestors")
        console.log("   block: displays GEDCOM top level block for 'INDI @I896@'")
        console.log("   contexts: displays all the GEDCOM record type contexts and their counts")
        console.log("   find: displays finding all the GEDCOM records for @I896@ with context INDI-NAME-GIVN")
        console.log("   lineage: displays lineage from CDB to Hannah Hunter")
        console.log("   origins: displays persons ancestral origins")
        console.log("   person: displays person brief")
        console.log("   summary: displays Sylvan records summaryperson brief")
        console.log("   toplevels: displays all the GEDCOM Level 0 command types and their counts")
        process.exit()
    }
    const parms = {}
    for (let i=2; i<process.argv.length; i++) {
        const arg = (process.argv[i]).toLowerCase()
        const a = arg.substring(0, 1)
        if (a === 'a') parms.ancestors = true
        else if (a === 'b') parms.block = true
        else if (a === 'c') parms.contexts = true
        else if (a === 'f') parms.findall = true
        else if (a === 'g') parms.generations = true
        else if (a === 'l') parms.lineage = true
        else if (a === 'o') parms.origins = true
        else if (a === 'p') parms.person = true
        else if (a === 's') parms.summary = true
        else if (a === 't') parms.toplevels = true
    }
    return parms
}

function displayAncestors(sylvan) {
    const subject = sylvan.people().find('CollinDouglasBevins1952')
    const ancestors = new Ancestors(subject)
    ancestors.listTree()
    ancestors.listById()
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
        console.log('displayFindAll() is not available at this time because GedcomRecords are not being saved in Sylvan')
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

function displayGenerations(sylvan) {
    const gen = new Generations(sylvan)
    // Select the population of Persons
    const subject = sylvan.people().find('CollinDouglasBevins1952')
    gen.calc(subject)
    const lines = gen.lines()
    console.log(lines)
}

function displayLineage(sylvan) {
    const subject = sylvan.people().find('CollinDouglasBevins1952')
    const target = sylvan.people().find('HannahHunter1753')
    console.log(`${subject.fullName()} to ${target.fullName()}`)
    const chain = lineage(subject, target)
    console.log(`The lineage chain is ${chain.length} links:`)
    for (let i=0; i< chain.length; i++) {
        console.log(`  ${i+1}: ${chain[i][0].fullName()} by ${chain[i][1].fullName()}`)
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

function displayOrigins(sylvan, subjectKey) {
    const subject = sylvan.people().find(subjectKey)
    console.log(`\n${subject.fullName()} Ancestral Origins:`)
    const map = origins(subject)
    const ar = Array.from(map).sort((a,b) => { return b[1] - a[1]})
    for (let i=0; i<ar.length; i++) {
        const [country, value] = ar[i]
        console.log(country.padEnd(16), value.toFixed(6))
    }
}

// Illustrates how to hydrate the entire GEDCOM Tree
function displayPerson(sylvan) {
    const people = sylvan.people()
    const subject = people.find('CollinDouglasBevins1952')
    console.log(`${subject.nameLabel()}  `)
    console.log(subject.birthPlace())

    const fathers = subject.fathers()
    const mothers = subject.mothers()
    const siblings = subject.siblings()
    const spouses = subject.spouses()
    const issue = subject.issue()
    console.log(`${subject.fullName()} has ${mothers.length} mothers: ${subject.mother().fullName()}`)
    console.log(`${subject.fullName()} has ${fathers.length} fathers: ${subject.father().fullName()}`)
    console.log(`${subject.fullName()} has ${siblings.length} siblings:`)
    for(let i=0; i<siblings.length; i++) console.log(siblings[i].fullName())
    console.log(`\n${subject.fullName()} has ${spouses.length} spouses: ${subject.spouse().fullName()}`)
    console.log(`${subject.fullName()} has ${issue.length} children:`)
    for(let i=0; i<issue.length; i++) console.log(issue[i].fullName())
    // const fam = person.familyParents()[0]
    // console.log(fam.xParent().fullName(), 'MARR', fam.unionDate(), 'DIV', fam.disunionDate())
}

function displaySummary(sylvan) {
    console.log(`Sylvan has:`)
    console.log(`  Persons   ${sylvan.people().size()}`)
    console.log(`  Families  ${sylvan.families().size()}`)
    console.log(`  Places    ${sylvan.places().size()}`)
    console.log(`  Locations ${sylvan.locations().size()}`)

    // Conduct a Review
    displayMultipleFathers(sylvan)
    displayMultipleMothers(sylvan)
}

// This only works of GEDCOM was saved by new Sylvan(fileName, TRUE)
function displayTopLevelBlock(sylvan, type, key) {
    if (! sylvan.gedrecs()) {
        console.log('displayTopLevelBlock() is not avaiulable at this time because GedcomRecords are not being saved in Sylvan')
        return
    }
    const head = sylvan.gedrecs().findHead(type, key)
    console.log(`\nGedcomRecord Block for '${type} ${key}':`)
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

    