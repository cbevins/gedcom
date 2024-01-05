// Parses a GEDCOM file into a network-transportable JSON object
// and writes it to a 'GedJson<Source>.js' file for subsequent browser access.
import fs from 'fs'
import { Gedcom } from '../js/Gedcom.js'

const AncestryFileName = "../data/AncestryTest.ged"
const RootsMagicFileName = "../dataRootsMagic.ged"
const inputFileName = AncestryFileName
const outputFileName = '../data/GedJsonAncestry.js'

function onCloseCallback(gedcom) {
    const indiArr = gedcom.jsonIndiArray()
    const famArr = gedcom.jsonFamArray()
    const labelArr = []
    // Create the personLabel => personName Map()
    indiArr.forEach(([, indi]) => { labelArr.push([indi.keys.label, indi.keys.name]) })
    let text = 'export const gedJson = {\n'
    text += `    person: new Map(${JSON.stringify(indiArr, null, 2)}),\n`
    text += `    family: new Map(${JSON.stringify(famArr, null, 2)}),\n`
    text += `    labels: new Map(${JSON.stringify(labelArr, null, 2)}),\n`
    text += `    places: new Map(${JSON.stringify(Array.from(gedcom._plac), null, 2)})\n`
    text += '}'
    // This file should be loaded by the server, as its half the size of the prettier one
    fs.writeFile(outputFileName, text, function (err) {
        if (err) throw err
        console.log(`GedJson data written to ${outputFileName}'`)
    })

    const time2 = new Date()
    console.log(`\n${(time2-time1)} msec elapsed time`)
}

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(inputFileName, onCloseCallback)