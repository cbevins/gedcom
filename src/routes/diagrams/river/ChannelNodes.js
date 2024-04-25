import { idGenCount } from '$lib/Sylvan/class/Generations.js'
export class ChannelNodes {
    constructor(rootPerson) {
        this._data = {
            count: {
                father: 0,      // number of father's ancestors
                mother: 0,      // number of mothers ancestors
            },
            channels: 0,        // number of channels
            cnodes: [],         // array of cnodes in father-depth-first traversal order
            persons: new Map(), // Map of Person => cnode
            yearMax: 0,         // earliest ancestral birth year
            yearMin: 9999,      // last ancestral birth year
            rootCnode: null,    // root person's cnode instance
            rootPerson: rootPerson, // Person instance
        }
        this._initCnodes(rootPerson, 0, 1, null)
        this._data.channels = this._traverse(this.rootCnode(), 0)
        this._flipTopChannels()
        this.summary()
    }
    
    channelMaxCount() { return this.data().channels }

    // Returns array of Anodes in father-descent-first traversal order
    cnode(idx) { return this.cnodes()[idx] }
    cnodes() { return this.data().cnodes }
    
    // Returns array of Anodes in ancestral sequence order (root===1, father===2, mother===3, etc)
    cnodesBySeq() { return this.cnodes().sort((a, b) => { return a.seq - b.seq }) }
    
    countFathersSide() { return this.data().count.father }
    countMothersSide() { return this.data().count.mother }

    data() { return this._data }
    
    findPerson(person) { return this.personsMap().get(person) }
    
    personsMap() { return this.data().persons }
    
    rootCnode() { return this.data().rootCnode }
    rootPerson() { return this.data().rootPerson }

    summary() {
        console.log(`Channels Summary for subject '${this.rootPerson().label()}':`)
        console.log(`    ${this.years()} years from ${this.yearMin()} - ${this.yearMax()} (grid cols))`)
        console.log(`    ${this.cnodes().length} ancestors `
            + `(${this.countFathersSide()} on fathers side,`
            + ` ${this.countMothersSide()} on mothers side)`)
        console.log(`    ${this.channelMaxCount()} channels.`)
    }

    // Returns the total number of years (cols) from min birth through max birth
    years() { return this.yearMax() - this.yearMin() }
    yearMax() { return this.data().yearMax }
    yearMin() { return this.data().yearMin }

    // Returns the index into channel.years[yidx] given the year
    yearIdx(year) { return year - this.channel().yearMin }

    // Returns the year given the channel.years[] index
    year(yearIdx) { return this.channel().yearMin + yearIdx }

    // Counts the number of ancestros starting from (and including) person
    _countAncestors(person, n) {
        let f = 0
        let m = 0
        if (person.father()) f = this._countAncestors(person.father(), n)
        if (person.mother()) m = this._countAncestors(person.mother(), n)
        return f + m + 1
    }

    _flipTopChannels() {
        const chan = this.rootCnode().mother.channel
        for (let i=0; i<this.cnodes().length; i++) {
            const cnode = this.cnode(i)
            if (cnode.channel < chan)  cnode.channel = Math.abs(cnode.channel - 80)
        }
    }

    _initCnodes(rootPerson, gen, seq, child) {
        this.data().count.father = this._countAncestors(this.rootPerson().father())
        this.data().count.mother = this._countAncestors(this.rootPerson().mother())
        this.data().rootCnode = this._recurse(rootPerson, gen, seq, child)
    }

    _recurse(person, gen, seq, child, channel) {
        const cnode = {
            person: person,     // subject's Person instance
            birth: person.birthYear(),
            channel: 0,
            child: child,       // subject's descendant's cnode instance
            father: null,       // father's cnode instance
            gen: gen,           // subject's generation index (0 for the root person)
            mother: null,       // mother's cnode instance
            path: [],           // channel path to the child
            seq: seq,           // subject's ancestral sequence (1 for the root person, 2 for the father)
        }
        if (person.father()) {
            cnode.father = this._recurse(person.father(), gen+1, seq*2, cnode, channel)
        }
        if (person.mother()) {
            cnode.mother = this._recurse(person.mother(), gen+1, seq*2+1, cnode)
        }

        // Accumulate min and max dates
        this._data.yearMin = Math.min(this._data.yearMin, cnode.birth)
        this._data.yearMax = Math.max(this._data.yearMax, cnode.birth)

        // Store in the cnodes[] and in the Person Map
        this._data.cnodes.push(cnode)
        this._data.persons.set(person, cnode)
        return cnode
    }

    _traverse(cnode, channel) {
        let chan = channel
        cnode.channel = channel // channel between this cnode and his/her child
        const count = idGenCount(cnode.gen) // number of slots in this generation
        const slot = (cnode.seq - count)    // slot number (base 0) of this cnode
        cnode.y = (slot + 0.5) / count      // slot fraction of the way down the chart
        if (cnode.father) {
            chan = this._traverse(cnode.father, channel)
            if (cnode.mother) {
                chan = this._traverse(cnode.mother, chan+1)
            }
        } else if (cnode.mother) {
            chan = this._traverse(cnode.mother, channel)
        }
        // console.log(`${channel}, next: ${chan}, ${cnode.person.label()}`)
        return chan
    }
}
