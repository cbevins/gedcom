// Demo program for reading a GEDCOM file via async or event callback
import { Gedcom } from '../js/Gedcom.js'
import { GedStore } from '../js/GedStore.js'
import { Ancestors } from '../js/Ancestors.js'
import { GenerationsData } from '../data/Generations.js'

const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const RootsMagic = "../data/RootsMagic.ged"
const fileName = Ancestry

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(fileName)
const gedStore = new GedStore(gedcom.toJson())

const cdb = 'CollinDouglasBevins1952'
const bjr = 'BarbaraJeanneRiley1953'
log(generations(gedStore, cdb), cdb)
log(generations(gedStore, bjr), bjr)

// Returns array of birth and death year range and sample size by generaton
function generations(gedStore, rootKey) {
    const ancestors = new Ancestors(gedStore)
    const ancMap = ancestors.ancestors(rootKey)
    // ancMap entries: {gen: <n>, id: <n>, person: {person}, mother: {person}, father: {person}}
    const data = []
    for(let i=0; i<=15; i++) {
        data[i] = {gen: i, n: 0, birth: {n: 0, min: 9999, max:-9999}, death: {n: 0, min: 9999, max: -9999}}
    }
    for(const [key, anc] of ancMap.entries()) {
        const gen = anc.gen
        data[gen].n++
        let year = anc.person.birth.date.year
        if (year) {
            data[gen].birth.n++
            data[gen].birth.min = year < data[gen].birth.min ? year : data[gen].birth.min
            data[gen].birth.max = year > data[gen].birth.max ? year : data[gen].birth.max
        }
        year = anc.person.death.date.year
        if (year) {
            data[gen].death.n++
            data[gen].death.min = year < data[gen].death.min ? year : data[gen].death.min
            data[gen].death.max = year > data[gen].death.max ? year : data[gen].death.max
        }
    }
    return data
}

function log(data, key) {
    console.log(`\n${key} Direct Ancester Birth & Death Year Ranges by Generation\nGen   Max Anc | Birth Range (  n) | Death Range (  n)`)
    let tb = 0
    let td = 0
    for(let i=0; i<15; i++) {
        tb += data[i].birth.n
        td += data[i].death.n
        console.log(`${i.toString().padStart(3)} : ${GenerationsData[i].count.toString().padStart(7)} |`
        + ` ${data[i].birth.min} - ${data[i].birth.max} (${data[i].birth.n.toString().padStart(3)}) | `
        + ` ${data[i].death.min} - ${data[i].death.max} (${data[i].death.n.toString().padStart(3)})`)
    }
    console.log(`Ancestors with known birth years: ${tb}, known death years: ${td}`)
}
