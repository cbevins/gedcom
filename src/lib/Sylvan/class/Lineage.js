/**
 * Lineage creates a linked list of Lineage {node} objects
 * beginning with a root Person and traversing all ancestors
 * in father-descent-first traversal order.
 * 
 * It contains both
 * - an array of lineage {node} objects and
 * - a Map() of * {Person} => {node}
 * 
 * After construction, the user or derived class can further decorate each
 * {node} as needed, but the following properties are considered private:
 * - person: reference to the {node} subject's Person instance
 * - father: reference to the subject's father's {node}, or null
 * - mother: reference to the subject's mother's {node}, or null
 * - child: reference to the subject's descendant's {node}, or null
 * - gen: generation index, where root Person generation===0
 * - seq: lineage father-descent-first sequence number, where root Persin seq===1
 */
export class Lineage {
    constructor(rootPerson) {
        this._data = {
            nodes: [],              // array of lineage {node}s in father-descent-first traversal order
            persons: new Map(),     // Map of Person => {node} instances
            prop: {},               // object containing additional properties added by client
            rootNode: null,         // reference to the root's lineage {node} instance
            rootPerson: rootPerson, // reference to the root's Person instance
        }
        this._data.rootNode = this._construct(rootPerson, 0, 1, null)
    }

    //--------------------------------------------------------------------------
    // Public property access methods
    //--------------------------------------------------------------------------

    // Returns reference to the {node} instance given a Person instance
    findPerson(person) { return this.personsMap().get(person) }

    // Returns max number of cohorts for the node's generation (including the node itself)
    genSize(node) { return 2**node.gen }

    // Node's tree horiz offset from tree midline, like [-4, -3, -2, -1, 1, 2, 3, 4]
    // NOTE that there is NO ZERO OFFSET
    midlineOffset(node) {
        const n = node.genSize() / 2
        const sym = node.seq - n
        return (sym < 0) ? sym : sym + 1
    }

    // Returns the {node} instance in father-descent-first traversal order
    node(idx) { return this.nodes()[idx] }
    
    // Returns array of {node} instances in father-descent-first traversal order
    nodes() { return this.data().nodes }
    
    // Returns array of {node} instances in lineage sequence order
    // (root===1, father===2, mother===3, paternal grand father===4, etc)
    nodesBySeq() { return this.nodes().sort((a, b) => { return a.seq - b.seq }) }

    // Returns an array of all Person references
    persons() {
        const persons = []
        for (const [person, ancestor] of this.map().entries()) persons.push(person)
        return persons
    }

    // Returns a reference to the Person => {node} Map()
    personsMap() { return this.data().persons }
    
    // Returns a reference to the client-accessible property object or its fields
    prop(field=null) { return field ? this.data().prop[field] : this.data().prop }

    // Returns a reference to the root's {node} instance
    rootNode() { return this.data().rootNode }

    // Returns a reference to the root's Person instance
    rootPerson() { return this.data().rootPerson }

    // Returns number of nodes in this Lineage
    size() { return this.personsMap().size }

    //--------------------------------------------------------------------------
    // Methods for derived class useage
    //--------------------------------------------------------------------------

    // Counts the number of ancestors starting from
    // Adds the node.ancestors property to each {node}
    _addAncestorCounts(node, n) {
        let f = 0
        let m = 0
        if (node.father) f = this._addAncestorCounts(node.father, n)
        if (node.mother) m = this._addAncestorCounts(node.mother, n)
        node.ancestors = f + m
        return f + m + 1
    }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    // Private convenience method
    data() { return this._data }

    _construct(person, gen, seq, child) {
        const node = {
            person: person,     // subject's Person instance
            child: child,       // subject's descendant's {node} instance
            father: null,       // father's {node} instance
            gen: gen,           // subject's generation index (root===0)
            mother: null,       // mother's {node} instance
            seq: seq,           // subject's lineage sequence (root==1, father==2, mother==3)
        }
        if (person.father()) {
            node.father = this._construct(person.father(), gen+1, seq*2, node)
        }
        if (person.mother()) {
            node.mother = this._construct(person.mother(), gen+1, seq*2+1, node)
        }
        // Store in the nodes[] and in the Person Map
        this._data.nodes.push(node)
        this._data.persons.set(person, node)
        return node
    }
}
