/**
 * Returns an Anodes instance with props to draw a generational chart
 * 
 * The instance has an Anode.prop, where
 * - prop.active is an array of ancestral Anode instances ordered by sequence
 * - prop.genSlots is an array of the number of Anode instances per generation
 * - prop.maxGen is the highest generation index (subject is generation 0)
 * - prop.maxSlots is the maximum number of Anodes in any generation
 * - prop.maxSlotGen is the highest generation with the most Anodes
 * 
 * Each Anode has the following props:
 *  - prop.active is the array of Anodes that have parents
 *      *** NOTE, USE THE Anodes.prop.active ARRAY INSTEAD OF THE Anodes.anodes() ARRAY
 *          IN THE CHART
 *  - prop.lines is an array of content lines to be displayed in the chart for each Aode
 */
import { Anodes } from '$lib/Sylvan/class/Anodes.js'
import { idGenAbbr } from '$lib/Sylvan/class/Generations.js'

export function genChartAnodes(subject) {
    // The Chart Union content has 16 lines used as follows:
    const line = {
        father: {name: 2, tags: 3, born: 4, died: 5},
        union: {date: 7, children: 8},
        mother: {name: 10, tags: 11, born: 12, died: 13},
    }

    // Create the subject's ancestor nodes
    const disc = new Anodes(subject)
    const anodes = disc.anodesBySeq()

    // Additional Anodes props
    const active = []                   // Anodes with at least 1 known parent
    let maxGen = 0                      // index of highest generation
    let maxSlots = 0                    // maximum number of families in any generation
    let maxSlotGen = 0                  // index of last generation wuth the maximum number of families
    let genSlots = Array(20).fill(0)    // number of families per generation
    
    // Add Anode properties required by the chart diagram
    let lastGen = -1
    let genSlot = -1
    for (let i=0; i<anodes.length; i++) {
        const anode = anodes[i]
        anode.prop.label = anode.person.fullName()

        // Because this is a *parent* based chart, only use Anodes with at least 1 parent
        // and store them in the active[] array
        anode.prop.active = (anode.fatherAnode || anode.motherAnode)
        if (anode.prop.active ) {
            // Add all text to be displayed:
            const lines = Array(16).fill('')
            
            // Add father's content lines
            let l = line.father
            lines[l.name] = 'unknown'
            if (anode.fatherAnode) {
                const p = anode.fatherAnode.person
                lines[l.name] = p.fullName()
                lines[l.born] =
                    `b. ${p.birthYear()} in ${p.birthState()}, ${p.birthCountry()}`
                lines[l.died] = p.isLiving() ? 'Not Dead Yet'
                    : `d. ${p.deathYear()} in ${p.deathState()}, ${p.deathCountry()}`
                lines[l.tags] = idGenAbbr(anode.fatherAnode.seq)
            }
            
            // Add mother's content lines
            l = line.mother
            lines[l.name] = 'unknown'
            if (anode.motherAnode) {
                const p = anode.motherAnode.person
                lines[l.name] = p.fullName()
                lines[l.born] =
                    `b. ${p.birthYear()} in ${p.birthState()}, ${p.birthCountry()}`
                lines[l.died] = p.isLiving() ? 'Not Dead Yet'
                    : `d. ${p.deathYear()} in ${p.deathState()}, ${p.deathCountry()}`
                lines[l.tags] = idGenAbbr(anode.motherAnode.seq)
            }
            
            // Add Union content lines
            const fam = anode.person.familyParent(0)
            if (fam) {
                lines[line.union.date] = `m. ${fam.unionDate().year()} ${fam.unionPlace().text()}`
                lines[line.union.children] = `${fam.children().length} children`
            }
            anode.prop.lines = lines

            // Accumulate generational statistics
            if (anode.gen > lastGen) genSlot = -1
            genSlot++
            lastGen = anode.gen
            anode.prop.genSlot = genSlot
            maxGen = Math.max(maxGen, anode.gen)
            genSlots[anode.gen]++

            // Add this Anode to the active[] array
            active.push(anode)
        }
    }
    // Determine maximum families in any generation, and which generation it is
    for(let i=0; i<=maxGen; i++) {
        if (genSlots[i] >= maxSlots) {
            maxSlots = genSlots[i]
            maxSlotGen = i
        }
    }
    // Store stats in the instance props
    disc.prop = {active: active, genSlots: genSlots, maxGen: maxGen, maxSlots: maxSlots, maxSlotGen: maxSlotGen}
    console.log(`genChartAnodes(): ${active.length} Active Anodes, Gens 0-${maxGen}, ${maxSlots} max Anodes in Gen ${maxSlotGen}`)
    return disc
}
