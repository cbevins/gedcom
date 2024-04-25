import {idGenCount } from '$lib/Sylvan/class/Generations.js'
export class RadialNodes {
    constructor(rootPerson) {
        this._data = {
            maxGen: 0,          // maximum generation index (root is generation 0)
            rnodes: [],         // array of rnodes in father-depth-first traversal order
            persons: new Map(), // Map of Person => rnode
            yearMax: 0,
            yearMin: 9999,
            rootRnode: null,    // root person's rnode instance
            rootPerson: rootPerson, // Person instance
        }
        this._initRnodes(rootPerson, 0, 1, null)
        this._initGrid()
        this.summary()
    }

    data() { return this._data }
    
    findPerson(person) { return this.personsMap().get(person) }

    maxGen() { return this.data().maxGen }

    // Returns array of Anodes in father-descent-first traversal order
    rnodes() { return this.data().rnodes }
    
    // Returns array of Anodes in ancestral sequence order (root===1, father===2, mother===3, etc)
    rnodesBySeq() { return this.rnodes().sort((a, b) => { return a.seq - b.seq }) }

    rootRnode() { return this.data().rootRnode }
    rootPerson() { return this.data().rootPerson }

    // Returns the total number of years (cols) from min birth through max birth
    years() { return this.yearMax() - this.yearMin() }
    yearMax() { return this.data().yearMax }
    yearMin() { return this.data().yearMin }

    summary() {
        console.log(`Radials Summary for subject '${this.rootPerson().label()}':`)
        console.log(`  - ${this.rnodes().length} ancestors over generations 0 - ${this.maxGen()}.`)
        console.log(`  - ${this.maxGen()} generations has ${2**this.maxGen()} ancestors.`)
        console.log(`  - `)
        console.log(`  - ${this.years()} birth years from ${this.yearMin()} - ${this.yearMax()}.`)
    }

    _initGrid() {}

    _initRnodes(rootPerson, gen, seq, child) {
        this.data().rootRnode = this._recurse(rootPerson, gen, seq, child)
    }

    _recurse(person, gen, seq, child) {
        const rnode = {
            person: person,     // subject's Person instance
            birth: person.birthYear(),
            child: child,       // subject's descendant's rnode instance
            father: null,       // father's rnode instance
            gen: gen,           // subject's generation index (0 for the root person)
            mother: null,       // mother's rnode instance
            seq: seq,           // subject's ancestral sequence (1 for the root person, 2 for the father)
        }
        if (person.father()) rnode.father = this._recurse(person.father(), gen+1, seq*2, rnode)
        if (person.mother()) rnode.mother = this._recurse(person.mother(), gen+1, seq*2+1, rnode)

        // Accumulate min and max dates
        this.data().maxGen = Math.max(this.maxGen(), rnode.gen )
        this.data().yearMin = Math.min(this.yearMin(), rnode.birth)
        this.data().yearMax = Math.max(this.yearMax(), rnode.birth)

        // Store in the rnodes[] and in the Person Map
        this._data.rnodes.push(rnode)
        this._data.persons.set(person, rnode)
        return rnode
    }
}