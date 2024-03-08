// Demo program for reading a GEDCOM file via async or event callback
import { Gedcom } from '../js/Gedcom.js'
import { GedStore } from '../js/GedStore.js'
import { Ancestors } from '../js/Ancestors.js'

const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const RootsMagic = "../data/RootsMagic.ged"
const fileName = Ancestry

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(fileName)
const gedStore = new GedStore(gedcom.toJson())

log(generations(gedStore, 'CollinDouglasBevins1952'))
log(generations(gedStore, 'BarbaraJeanneRiley1953'))

// Returns range and sample size of birth and death years by generaton
function generations(gedStore, rootKey) {
    const ancestors = new Ancestors(gedStore)
    const ancMap = ancestors.ancestors(rootKey)
    // ancMap entries: {level: <n>, id: <n>, person: {person}, mother: {person}, father: {person}}
    const data = []
    for(let i=0; i<=15; i++) {
        data[i] = {gen: i, n: 0, birth: {n: 0, min: 9999, max:-9999}, death: {n: 0, min: 9999, max: -9999}}
    }
    for(const [key, anc] of ancMap.entries()) {
        const gen = anc.level
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

function log(data) {
    console.log(`Gen  Birth Range | Death Range`)
    for(let i=0; i<15; i++) {
        console.log(`${i} ${data[i].birth.min} - ${data[i].birth.max} (${data[i].birth.n}) | `
         + ` ${data[i].death.min} - ${data[i].death.max} (${data[i].death.n})`)
    }
}
