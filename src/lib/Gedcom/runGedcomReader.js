import * as process from 'process'
import { GedcomReader } from './GedcomReader.js'

const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const RootsMagic = "../data/Root Magic Bevins-Riley Ancestry Ged.ged"

if (process.argv.length < 3 ) {
    console.log('***\n*** usage: node runGedcomReader <gedcomFilePath>\n***')
    process.exit()
}

const time1 = new Date()
const gedcomFileName = process.argv[2]
await mission(gedcomFileName)
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mission(gedcomFileName) {
    const g = new GedcomReader()
    const recordMap = await g.readFile(gedcomFileName)
    console.log(`GEDCOM File '${gedcomFileName}' has ${recordMap.size} Level 0 record types.`)
    const level0 =  Array.from(recordMap)
    for(let i=0; i<level0.length; i++) {
        const [type, records] = level0[i]
        console.log(type, records.length)
    }
}