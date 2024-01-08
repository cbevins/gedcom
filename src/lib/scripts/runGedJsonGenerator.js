// Parses a GEDCOM file into a network-transportable JSON object
// and writes it to a 'GedJson<Source>.js' file for subsequent browser access.
import fs from 'fs'
import { Gedcom } from '../js/Gedcom.js'

const AncestryFileName = "../data/AncestryTest.ged"
const RootsMagicFileName = "../dataRootsMagic.ged"
const inputFileName = AncestryFileName
const outputFileName = '../data/GedJsonAncestry.js'

function onCloseCallback(gedcom) {
    fs.writeFile(outputFileName, gedcom.toJson(), function (err) {
        if (err) throw err
        console.log(`GedJson data written to ${outputFileName}'`)
    })
    console.log(`\n${(new Date()-time1)} msec elapsed time`)
}

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(inputFileName, onCloseCallback)