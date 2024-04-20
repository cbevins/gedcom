/**
 * Anodes creates a list of ancestral nodes that link a subject to their 2 parent and 1 descendant Anodes.
 * Primarily used to make ancestral tree diagrams, so it includes x-y coordinate attributes,
 * as well as an empty 'prop' attribute object that for manipulation by the client.
 */
export class Anodes {
    constructor(rootPerson) {
        this._data = {
            anodes: [],             // array of Anodes (in rootPerson father-descent-first order)
            map: new Map(),         // Map of Person => Anode
            rootAnode: null,        // root Anode instance
            rootPerson: rootPerson, // root Person instance
        }
        this.prop = {}              // for client use
        this._recurse(rootPerson, 0, 1, null)
    }

    // Returns array of Anodes in father-descent-first traversal order
    anodes() { return this._data.anodes }
    
    // Returns array of Anodes in ancestral sequence order (root===1, father===2, mother===3, etc)
    anodesBySeq() { return this.anodes().sort((a, b) => { return a.seq - b.seq }) }
    
    findPerson(person) { return this.map().get(person) }

    map() { return this._data.map }
    
    prop() { return this.prop }

    rootAnode() { return this._data.rootAnode }

    rootPerson() { return this._data.rootPerson }

    _recurse(person, gen, seq, childAnode) {
        const node = {
            person: person,         // subject's Person instance
            childAnode: childAnode, // descendant's Anode instance
            fatherAnode: null,      // father's Anode instance
            gen: gen,               // subject's generation index (0 for the root person)
            motherAnode: null,      // mother's Anode instance
            seq: seq,               // subject's ancestral sequence (1 for the root person, 2 for the father)
            prop: {},               // properties managed by the client (like birth year, label, etc)
            x: 0, y: 0              // x- and y-coordinates (managed by the client)        
        }
        this._data.anodes.push(node)
        if (person.father()) node.fatherAnode = this._recurse(person.father(), gen+1, seq*2, node)
        if (person.mother()) node.motherAnode = this._recurse(person.mother(), gen+1, seq*2+1, node)
        this._data.map.set(person, node)
        return node
    }
}
