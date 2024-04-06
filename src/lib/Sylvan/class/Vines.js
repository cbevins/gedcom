/**
 * Vines is a collection of child-parent VineNodes stored in a [Perrson, VineNode] Map()
 * (and also available as an array) primarily to support creation of family tree diagrams.
 */
import { VineNode } from './VineNode.js'

export class Vines {
    constructor(subject) {
        this._data = {
            gens: [],           // Array of VineNode arrays by generation
            maxNodeCount: -1,   // Most nodes in any generation
            map: new Map(),     // Map of Person => Ancestor
            root: null,         // reference to the subject's VineNode instance (root node of Vines)
            subject: subject,
        }
        this._data.root = this._recurse(subject, 0, 1, null)
        this._stats()
    }
    
    findPerson(person) { return this.map().get(person) }
    
    gen(idx) { return this._data.gens[idx] }
    
    gens() { return this._data.gens }
    
    map() { return this._data.map }

    maxNodeCount() { return this._data.maxNodeCount }

    // Returns array of [<Person>, <VineNode>] pairs ordered by VineNode.seq()
    nodesBySeq() { return Array.from(this.map()).sort((a, b) => { return (a[1].childSeq() - b[1].childSeq()) }) }

    // Returns a simple array of all Person (NOT VineNode) references
    persons() {
        const persons = []
        for (const [person, ancestor] of this.map().entries()) persons.push(person)
        return persons
    }

    root() { return this._data.root }

    size() { return this._data.map.size }

    subject() { return this._data.subject }

    _recurse(child, childGen, childSeq, childNode) {
        const node = new VineNode(child, childGen, childSeq, childNode, child.mother(), child.father())
        if (child.mother() || child.father()) {
            if (child.father()) node.setYNode(this._recurse(child.father(), childGen+1, childSeq*2, node))
            if (child.mother()) node.setXNode(this._recurse(child.mother(), childGen+1, childSeq*2+1, node))
            this._data.map.set(child, node)
        }
        return node
    }
    
    _stats() {
        let currGen = -1
        const nodes = this.nodesBySeq() // array of [Person, VineNode] pairs
        for (let i=0; i<nodes.length; i++) {
            const [person, node] = nodes[i]
            if (node.childGen() > currGen) {
                this._data.gens.push([])
                currGen++
            }
            node.setPos(this._data.gens[currGen].length)
            this._data.gens[currGen].push(node)
        }
        for (let i=0; i<this.gens().length; i++)
            this._data.maxNodeCount = Math.max(this._data.maxNodeCount, this.gen(i).length)
    }
}
