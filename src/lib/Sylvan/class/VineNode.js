/**
 * A VineNode represents a child-parent family unit with generational linkages.
 */
export class VineNode {
    constructor(childPerson, childGen, childSeq, childNode, xParent, yParent) {
        this._data = {
            child: childPerson,     // reference to the child's Person instance
            childGen: childGen,     // child's generation (where subject gen is 0, parents are 1, grand parents are 2, etc)
            childNode: childNode,   // reference to the previous generation VineNode
            childSeq: childSeq,     // where subject is 1, father is 2, mother is 3, etc
            pos: 0,                 // *this* VineNode's seq position within its generation
            xNode: null,            // reference to the X parent's (mother's) child VineNode instance
            xParent: xParent,       // reference to the X parent's (mother's) Person instance
            yNode: null,            // reference to the Y parent's (father's) child VineNode instance
            yParent: yParent,       // reference to the Y parent's (father's) Person instance
        }
    }

    child() { return this._data.child }
    childGen() { return this._data.childGen }
    childLabel() { return this.child().label() }
    childNode() { return this._data.childNode }
    // Returns the Node's index position within its generation
    childPos() { return this._data.pos }
    childSeq() { return this._data.childSeq }

    hasParent() { return this.xParent() !== null || this.yParent() !== null }

    // Demonstrates how to access parental Person information for *this* VineNode Person
    labelY() { return this.nextY() ? this.nextY().person().label() : 'unknown'}

    // Called only by Vines._recurse() and Vines._stats()
    setPos(pos) { this._data.pos = pos }
    setXNode(node) { this._data.xNode = node }
    setYNode(node) { this._data.yNode = node }
    
    // Access to X parent (mother's) info
    xGen() { return this.childGen() + 1 }
    xSeq() { return 2*this.childSeq() + 1 }
    xLabel() { return this.xNode() ? this.xParent().label() : 'unknown'}
    xNode() { return this._data.xNode }
    xParent() { return this._data.xParent }
    
    // Access to Y parent (father's) info
    yGen() { return this.childGen() + 1 }
    ySeq() { return 2*this.childSeq() }
    yLabel() { return this.yNode() ? this.yParent().label() : 'unknown'}
    yNode() { return this._data.yNode }
    yParent() { return this._data.yParent }
}
