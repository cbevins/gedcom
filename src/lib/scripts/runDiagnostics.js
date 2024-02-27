// Demo program for reading a GEDCOM file via async or event callback
import { Ancestors } from '../js/Ancestors.js'
import { Gedcom } from '../js/Gedcom.js'
import { GedStore } from '../js/GedStore.js'
import { parsePlace } from '../js/parsePlace.js'

const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const RootsMagic = "../data/RootsMagic.ged"
const fileName = Ancestry

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(fileName)
const gedStore = new GedStore(gedcom.toJson())
diagnostics(gedStore, 'CollinDouglasBevins1952', 'BH')
diagnostics(gedStore, 'BarbaraJeanneRiley1953', 'RT')
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

// Reviews 
function review(person, id=null, key=null) {
    const msg = []
    let str = null
    if (id) {
        // Test 1: Ancestors must have a correct file id in its name suffix
        if (! person.name.suffix || person.name.suffix === '') msg.push(`ID ? '${id}'`)
        else if (! person.name.suffix.includes(id)) msg.push(`ID '${person.name.suffix}' ==> '${id}'`)
    }
    // Test 2: Ancestors must have a birth year and country
    if (! person.birth.date.year) msg.push('BirthYear ?')
    if (person.birth.place.country === 'unknown country' || person.birth.place.state === 'unknown state')
        msg.push(`BirthPlace ? [${person.birth.place.text}]`)

    // Test 3: Ancestors must have a death year and country
    if (! person.life.isLiving ) {
        if (! person.death.date.year) msg.push('DeathYear ?')
        if (person.death.place.country === 'unknown country' || person.death.place.state === 'unknown state')
            msg.push(`DeathPlace ? [${person.death.place.text}]`)
    }
    // Test 4: Persons must have a gender
    if (person.life.gender !== 'M' && person.life.gender !== 'F') msg.push(`Gender unnown [${person.life.gender}]`)
    return msg
}

function diagnostics(gedStore, key, prefix) {
    const ancestors = new Ancestors(gedStore)
    const map = ancestors.ancestors(key)
    console.log('\n------------------------------------------------------------------------------')
    console.log(`Diagnostic Messages for ${key} ${map.size} Direct Ancestors:`)
    console.log('------------------------------------------------------------------------------\n')
    let n = 1
    for (const [key, person] of gedStore.persons()) {
        if (map.has(key)) {
            const a = map.get(key)
            const msg = []
            const id = '(#' + prefix + a.id + ')'
            a.msg = review(person, id, key)
            map.set(key, a)
        }
    }
    const ar = Array.from(map, ([key, anc]) => (anc))
    ar.sort(function(a, b){return a.id - b.id})
    for (let i=0; i<ar.length; i++) {
        if (ar[i].msg.length)
            console.log(ar[i].id, ar[i].person.keys.label, ar[i].msg)
    }
}

function checkPlace(place, key=null, event=null) {
    // if (place.country === 'unknown country' ) {
    //     return `has unknown country '${js}'`
    // } else if (place.state === 'unknown state' ) {
    //     return `has unknown state '${js}'`
    // }
    return null
}
