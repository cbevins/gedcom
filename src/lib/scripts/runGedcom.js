// Demo program for reading a GEDCOM file via async or event callback
import { Gedcom } from '../js/Gedcom.js'
import { logMemory, logDataSizes } from '../js/reports.js'

const Ancestry = "../data/AncestryTest.ged"
const RootsMagic = "../data/RootsMagic.ged"
const fileName = Ancestry

const time1 = new Date()
const mem1 = process.memoryUsage()

function onCloseCallback(gedcom) {
    console.log(`\nInside onCloseCallback()...`)
    const time2 = new Date()
    console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)
    logDataSizes(gedcom)
    const mem2 = process.memoryUsage()
    logMemory(mem1, mem2)
}
const gedcom = new Gedcom()
await gedcom.readFile(fileName, onCloseCallback)
console.log(`Return from readFile() with ${gedcom._indi.size} INDI records`)