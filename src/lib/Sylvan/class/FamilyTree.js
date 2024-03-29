/**
 * Family Tree 
 */
import { FamilyTreeNode } from './FamilyTreeNode.js'

export class FamilyTree {
    constructor(subject) {
        this._data = {
            map: new Map(),         // Map() of [Family => FamilyNode]
            root: null,             // Reference to subject's FamilyTreeNode instance
            subject: subject,       // reference to subject Person instance
        }
        this._init(subject)  
    }
    
    map() { return this._data.map }
    
    size() { return this._data.map.size }

    // Returns reference to subject's family's FamilyTreeNode instance
    root() { return this._data.root }
    
    _init(subject) {
        // Find the subject's childhood family
        if (subject && subject.familyParents().length && subject.familyParent(0)) {
            const family = subject.familyParent(0)
            this._data.root = new FamilyTreeNode(family, 0, 1, null)
            this.map().set(family, this.root())
            this._recurse(this.root())
        }
    }

    // prevNode has family, gen, and seq, and prevNode assigned, but not yet xNode or yNode
    _recurse(prevNode) {
        const family = prevNode.family()
        let person = family.xParent()
        if (person && person.familyParents().length && person.familyParent(0)) {
            const family = person.familyParent(0)
            const node = new FamilyTreeNode(family, prevNode.gen()+1, 2*prevNode.seq(), prevNode)
            this.map().set(family, node)
            prevNode.setXnode(node)
            this._recurse(node)
        }
        person = family.yParent()
        if (person && person.familyParents().length && person.familyParent(0)) {
            const family = person.familyParent(0)
            const node = new FamilyTreeNode(family, prevNode.gen()+1, 2*prevNode.seq()+1, prevNode)
            this.map().set(family, node)
            prevNode.setYnode(node)
            this._recurse(node)
        }
    }
}