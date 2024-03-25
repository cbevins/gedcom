// Demo program for reading a GEDCOM file via async or event callback
import { Gedcom } from '../../src/lib/js/Gedcom.js'
import { GedStore } from '../../src/lib/js/GedStore.js'
import { checkAncestors, checkPerson } from '../../src/lib/js/checkPerson.js'

const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const RootsMagic = "../data/RootsMagic.ged"
const fileName = Ancestry

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(fileName)
const gedStore = new GedStore(gedcom.toJson())

diag(gedStore, 'CollinDouglasBevins1952', 'BH')
diag(gedStore, 'BarbaraJeanneRiley1953', 'RT')
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

function diag(gedStore, key, prefix) {
    console.log('\n------------------------------------------------------------------------------')
    console.log(`Diagnostic Messages for ${key} Direct Ancestors:`)
    console.log('------------------------------------------------------------------------------\n')
    const ar = checkAncestors(gedStore, key, prefix)
    for (let i=0; i<ar.length; i++) {
        if (ar[i].msg.length)
            console.log(ar[i].id, ar[i].person.keys.label, ar[i].msg)
    }
}
