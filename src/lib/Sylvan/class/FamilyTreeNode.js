/**
 * FamilyTreeNode provides the links binding one Family to the previous and succeeding generations
 */
export class FamilyTreeNode {
    constructor(family, gen, seq, prevNode, xNode=null, yNode=null) {
        this._data = {
            family: family,         // Child's parental Family reference
            gen: gen,               // Generation number [base 0 for subject]
            seq: seq,               // Family sequence number
            prevNode: prevNode, // Reference to the later (lower id) generational Family
            xNode: xNode,       // xParent's parental Family reference (next gen)
            yNode: yNode,       // yParent's parental Family reference (next gen)
        }
    }

    family() { return this._data.family }

    gen() { return this._data.gen }

    parentNames() {
        const xname = this.family().xParent() ? this.family().xParent().fullName() : 'unknown'
        const yname = this.family().yParent() ? this.family().yParent().fullName() : 'unknown'
        return `${xname} & ${yname}`
    }

    prevNode() { return this._data.prevNode }

    seq() { return this._data.seq }

    xNode() { return this._data.xNode }

    yNode() { return this._data.yNode }

    setXnode(xNode) { this._data.xNode = xNode }

    setYnode(yNode) { this._data.xNode = yNode }

    xParent() { return this.family().xParent() }
    
    yParent() { return this.family().yParent() }
}
