/**
 * Returns an RiverNodes instance
 * 
 * Each RiverNode object has the following props:
 * - person is the subject's Person reference
 * - father is a reference to the subject's father's RiverNode
 * - father is a reference to the subject's mother's RiverNode
 * - child is a reference to the subject's descendant child's RiverNode
 * - birth is the subject's decimal birth year
 * - gen is the subject's generation index (root subject is index 0)
 * - seq is the subject's ancestral sequence nuber (root=1, father=2, mother=3, etc)
 */
import { Anodes } from '$lib/Sylvan/class/Anodes.js'
import { idGenAbbr } from '$lib/Sylvan/class/Generations.js'

export class RiverNodes {
    constructor(rootPerson) {
        this._data = {
            rnodes: [],             // array of Rnodes (in rootPerson father-descent-first order)
            map: new Map(),         // Map of Person => Rnode
            prop: {},               // for client use
            rootRnode: null,        // root Rnode instance
            rootPerson: rootPerson, // root Person instance
            stats: {minDate: 9999, maxDate: 0, maxTimeSpans: 0, maxCohorts: 0, yearMaxCohorts: 0},
            timespans: Array(2050).fill([])
        }
        this._recurse(rootPerson, 0, 1, null)
        this._stats()
    }

    maxCohorts() { return this._data.stats.maxCohorts }

    maxDate() { return this._data.stats.maxDate }
    
    maxTimeSpans() { return this._data.stats.maxTimeSpans }

    minDate() { return this._data.stats.minDate }

    // Returns array of Anodes in father-descent-first traversal order
    rnodes() { return this._data.rnodes }
    
    // Returns array of Anodes in ancestral sequence order (root===1, father===2, mother===3, etc)
    rnodesBySeq() { return this.rnodes().sort((a, b) => { return a.seq - b.seq }) }
    
    findPerson(person) { return this.map().get(person) }

    map() { return this._data.map }
    
    prop() { return this._data.prop }

    rootRnode() { return this._data.rootRnode }

    rootPerson() { return this._data.rootPerson }

    timespans() { return this._data.timespans }

    yearMaxCohorts() { return this._data.stats.yearMaxCohorts }

    _recurse(person, gen, seq, child) {
        const rnode = {
            person: person, // subject's Person instance
            birth: Math.trunc(100*person.birthDateDecimal())/100,
            child: child,   // descendant child's Rnode instance
            father: null,   // subject's father's Rnode instance
            gen: gen,       // subject's generation index (0 for the root person)
            minDate: 0,     // earliest birth of subject, father, or mother
            mother: null,   // mother's Anode instance
            seq: seq,       // subject's ancestral sequence (1 for the root person, 2 for the father)
            x: 0, y: 0      // x- and y-coordinates (managed by the client)        
        }
        if (! rnode.birth) return rnode
        if (person.father()) rnode.father = this._recurse(person.father(), gen+1, seq*2, rnode)
        if (person.mother()) rnode.mother = this._recurse(person.mother(), gen+1, seq*2+1, rnode)
        
        // Determine minimum date
        rnode.minDate = rnode.birth
        if (rnode.father && rnode.father.birth)
            rnode.minDate = Math.min(rnode.father.birth, rnode.minDate)
        if (rnode.mother && rnode.mother.birth)
            rnode.minDate = Math.min(rnode.mother.birth, rnode.minDate)

        // Accumulate min and max dates
        this._data.stats.minDate = Math.min(this._data.stats.minDate, rnode.minDate)
        this._data.stats.maxDate = Math.max(this._data.stats.maxDate, rnode.birth)
        // Add time span to timespans
        for (let year=Math.trunc(rnode.minDate); year<=rnode.birth; year++) {
            this._data.timespans[year]++
        }

        // Store in the rnodes[] and in the Person Map
        this._data.rnodes.push(rnode)
        this._data.map.set(person, rnode)
        return rnode
    }

    _stats() {
        this._data.stats.maxCohorts = 0
        for(let i=0; i<this._data.timespans.length; i++) {
            if (this._data.timespans[i] > this._data.stats.maxCohorts) {
                this._data.stats.maxCohorts = this._data.timespans[i]
                this._data.stats.yearMaxCohorts = i
            }
        }
    }
}

export function whatever(subject) {
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
