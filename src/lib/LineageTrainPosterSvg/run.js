import { file2JsonArray } from '../Sylvan/js/file2JsonArray.js'
import { Sylvan } from '../Sylvan/class/Sylvan.js'
import { lineageTrainPosterSvg } from './lineageTrainPosterSvg.js'

const fileName = '../data/RootsMagicAncestrySync.ged'

const time1 = new Date()
const svg = await mainFunction()
console.log(svg)
const time2 = new Date()
// console.log(`\nElapsed : ${(time2-time1).toString().padStart(5)} msec`)

async function mainFunction() {
    // First load the GEDCOM file into a POJO array
    const lines = await file2JsonArray(fileName)
    // Then parse the GEDCOM lines and create the Sylvan instance
    const sylvan = new Sylvan(lines, true)
    const subject = sylvan.people().find('CollinDouglasBevins1952')
    const scale = 1
    const guides = false
    const svg = lineageTrainPosterSvg(subject, scale, guides)
    return svg

    // console.log(`\n${sylvan.source()} GEDCOM File: '${fileName}' has ${sylvan.readerMessages().length} GedcomReader messages:`)
    // if (sylvan.readerMessages().length) console.log(sylvan.readerMessages())
}