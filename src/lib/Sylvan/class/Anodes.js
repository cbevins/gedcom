/**
 * Ancestral nodes that link a subject to their 2 parent and 1 descendant Anodes.
 * Primarily used to make ancestral tree diagrams, so it includes x-y corrdinate props,
 * as well as a 'prop' object that can be manipulated by the client.
 */
export class Anodes {
    constructor(rootPerson) {
        this._data = {
            anodes: [],             // array of Anodes (in rootPerson father-descent-first order)
            rootAnode: null,        // root Anode instance
            rootPerson: rootPerson, // root Person instance
        }
        this._recurse(rootPerson, 0, 1, null)
    }

    anodes() { return this._data.anodes }
    
    anodesBySeq() { return this.anodes().sort((a, b) => { return a.seq - b.seq }) }

    _recurse(person, gen, seq, childAnode) {
        const node = {
            person: person,         // subject's Person instance
            childAnode: childAnode, // descendant's Anode instance
            fatherAnode: null,      // father's Anode instance
            gen: gen,               // subject's generation index (0 for the root person)
            motherAnode: null,      // mother's Anode instance
            seq: seq,               // subject's ancestral sequence (1 for the root person, 2 for the father)
            prop: {},               // properties managed by client (like birth year, label, etc)
            x: 0,                   // x-coordinate (managed by client)        
            y: 0,                   // y-coordinate (managed by client)
        }
        this._data.anodes.push(node)
        if (person.father()) node.fatherAnode = this._recurse(person.father(), gen+1, seq*2, node)
        if (person.mother()) node.motherAnode = this._recurse(person.mother(), gen+1, seq*2+1, node)
        return node
    }
}
