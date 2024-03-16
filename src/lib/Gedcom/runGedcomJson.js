/**
 * Example of reading a GEDCOM file exported by Ancestry.com or Roots Magic
 * into a GedcomRecords instance for further parsing and analysis.
 */
import * as process from 'process'
import { GedcomReader } from './GedcomReader.js'
import { FamilyJson } from './FamilyJson.js'

const time1 = new Date()
const parms = getArgs()

await mission(parms)
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mission(parms) {
    const reader = new GedcomReader()
    const gedrecs = await reader.readFile(parms.file)
    const family = new FamilyJson(gedrecs)
    console.log(family.toJsonFile(2))
}

function getArgs() {
    if (process.argv.length < 3) {
        console.log('***\n*** usage: node runGedcomJson ["ancestry" | "roots"] ["person", "family", "locations"]\n***')
        process.exit()
    }

    const gedcoms = [
        {flag: 'ancestry', file: "../data/Bevins-Riley Family Tree.ged"},
        {flag: 'roots', file: "../data/Root Magic Bevins-Riley Ancestry Ged.ged"},
    ]
    const parms = {
        file : gedcoms[1].file,
        person: true, family: true, locations: true
    }
    for (let i=2; i<process.argv.length; i++) {
        const arg = (process.argv[i]).toLowerCase()
        const a = arg.substring(0, 1)
        for(let i=0; i<gedcoms.length; i++) {
            if (a === gedcoms[i].flag.substring(0,1))
                parms.file = gedcoms[i].file
        }
    }
    return parms
}
