// Parses a GEDCOM file into a network-transportable JSON object
// and writes it to a 'GedJson<Source>.js' file for subsequent browser access.
import fs from 'fs'
import { Gedcom } from '../js/Gedcom.js'

const AncestryFileName = "../data/Bevins-Riley Family Tree.ged"
const RootsMagicFileName = "../dataRootsMagic.ged"
const inputFileName = AncestryFileName
const outputFileName = '../data/GedJsonAncestry.js'

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(inputFileName)
fs.writeFile(outputFileName, gedcom.toJsonFile(2), function (err) {
    if (err) throw err
    console.log(`GedJson data written to ${outputFileName}'`)
})
console.log(`\n${(new Date()-time1)} msec elapsed time`)
