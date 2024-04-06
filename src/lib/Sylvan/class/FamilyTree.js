/**
 * Family Tree 
 */
import { FamilyTreeNode } from './FamilyTreeNode.js'

export class FamilyTree {
    constructor(subject) {
        this._data = {
            gens: [],               // Array of FamilyTreeNode arrays by generation
            maxNodeCount: -1,       // Most nodes in any generation
            map: new Map(),         // Map() of [Family => FamilyTreeNode]
            root: null,             // Reference to subject's FamilyTreeNode instance
            subject: subject,       // reference to subject Person instance
        }
        this._init(subject)  
    }
    
    gen(idx) { return this._data.gens[idx] }
    
    gens() { return this._data.gens }
    
    map() { return this._data.map }

    maxNodeCount() { return this._data.maxNodeCount }

    // Returns array of [<Family>, <FamilyTreeNode>] ordered by sequence
    nodesBySeq() { return Array.from(this.map()).sort((a, b) => { return (a[1].seq() - b[1].seq()) }) }
    
    // Returns reference to subject's family's FamilyTreeNode instance
    root() { return this._data.root }
    
    size() { return this._data.map.size }
    
    _init(subject) {
        // Find the subject's childhood family
        if (subject && subject.familyParents().length && subject.familyParent(0)) {
            const family = subject.familyParent(0)
            this._data.root = new FamilyTreeNode(family, 0, 1, null)
            this.map().set(family, this.root())
            this._recurse(this.root())
        }
        this._stats()
    }

    // prevNode has family, gen, and seq, and prevNode assigned, but not yet xNode or yNode
    _recurse(prevNode) {
        const family = prevNode.family()
        let person = family.yParent()
        if (person && person.familyParents().length && person.familyParent(0)) {
            const family = person.familyParent(0)
            const node = new FamilyTreeNode(family, prevNode.gen()+1, 2*prevNode.seq(), prevNode)
            this.map().set(family, node)
            prevNode.setXnode(node)
            this._recurse(node)
        }
        person = family.xParent()
        if (person && person.familyParents().length && person.familyParent(0)) {
            const family = person.familyParent(0)
            const node = new FamilyTreeNode(family, prevNode.gen()+1, 2*prevNode.seq()+1, prevNode)
            this.map().set(family, node)
            prevNode.setYnode(node)
            this._recurse(node)
        }
    }
    
    _stats() {
        let currGen = -1
        const nodes = this.nodesBySeq() // array of [Family, FamilyTreeNode] pairs
        for (let i=0; i<nodes.length; i++) {
            const [family, node] = nodes[i]
            if (node.gen() > currGen) {
                this._data.gens.push([])
                currGen++
            }
            node._data.fill = this._data.gens[currGen].length
            this._data.gens[currGen].push(node)
        }
        for (let i=0; i<this.gens().length; i++)
            this._data.maxNodeCount = Math.max(this._data.maxNodeCount, this.gen(i).length)
    }
}