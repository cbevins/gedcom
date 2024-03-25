// Demo program for reading a GEDCOM file via async or event callback
import { Gedcom } from '../../src/lib/js/Gedcom.js'
import { GedStore } from '../../src/lib/js/GedStore.js'
import { Ancestors } from '../../src/lib/js/Ancestors.js'

const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const RootsMagic = "../data/RootsMagic.ged"
const fileName = Ancestry

const time1 = new Date()
const gedcom = new Gedcom()
await gedcom.readFile(fileName)
const gedStore = new GedStore(gedcom.toJson())


children(gedStore, 'CollinDouglasBevins1952', 9)
children(gedStore, 'BarbaraJeanneRiley1953', 9)
//children(gedStore, 'DrewallynBevinsRiley1982', 9)
const time2 = new Date()
console.log(`Elapsed : ${(time2-time1).toString().padStart(5)} msec`)

function children(gedStore, rootKey, over=9) {
    // Determine all direct ancestors for 'rootKey' person
    const ancestors = new Ancestors(gedStore)
    const ancMap = ancestors.ancestors(rootKey)
    // Stats
    const dist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const mothers = []
    let nover = 0
    // Examine each person in the tree
    for (const [key, person] of gedStore.persons()) {
        // If this person is a female direct ancestor
        if (person.life.gender === 'F' && ancMap.has(key)) {
            const anc = ancMap.get(key)
            let children = 0
            // Examine each family group in which this woman was the mother
            for(let i=0; i<person.families.spouses.length; i++) {
                const family = gedStore.family(person.families.spouses[i])
                // Accumulate the number of children
                children += family.children.length
            }
            // Add to the stats array
            mothers.push([person, children])
            const idx = (children < dist.length) ? children : dist.length-1
            dist[idx]++
            if (children > over) nover++
        }
    }
    // Display mothers with most children
    mothers.sort(function(a, b) {return a[1] - b[1]} )
    console.log(`\n${rootKey} has ${mothers.length} female direct ancestors.`)
    console.log(`There were ${nover} women with more than ${over} recorded births:`)
    for(let i=0; i<mothers.length; i++) {
        const [mother, children] = mothers[i]
        if (children > over) console.log(children, mother.keys.label)
    }
    console.log('\nHere are the number of women by family size:')
    for(let i=1; i<dist.length; i++) {
        console.log(`Children: ${i} Mothers: ${dist[i]}`)
    }
}