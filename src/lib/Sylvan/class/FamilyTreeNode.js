/**
 * FamilyTreeNode provides the links binding one Family to the previous and succeeding generations
 */
export class FamilyTreeNode {
    constructor(family, gen, seq, prevNode, xNode=null, yNode=null) {
        this._data = {
            family: family,         // Child's parental Family reference
            gen: gen,               // Generation number [base 0 for subject]
            seq: seq,               // Family sequence number over entire tree
            fill: 0,                // node sequence number within its generation
            prevNode: prevNode,     // Reference to the later (lower id) generational Family
            xNode: xNode,           // xParent's parental Family reference (next gen)
            yNode: yNode,           // yParent's parental Family reference (next gen)
            posX: 0,                // node's x offset in the FamilyTreeDiagram
            posY: 0,                // node's y offset in the FamilyTreeDiagram
        }
    }

    family() { return this._data.family }

    fill() { return this._data.fill }

    gen() { return this._data.gen }

    parentNames() { return `${this.xName()} & ${this.yName()}` }

    posX() { return this._data.posX }

    posY() { return this._data.posY }
    
    prevNode() { return this._data.prevNode }
    
    seq() { return this._data.seq }
    
    setPos(x, y) { this._data.posX = x; this._data.posY = y }
    
    setXnode(xNode) { this._data.xNode = xNode }
    
    setYnode(yNode) { this._data.yNode = yNode }
    
    xName() { return this.family().xParent() ? this.family().xParent().fullName() : 'unknown' }
    
    xNode() { return this._data.xNode }
    
    xParent() { return this.family().xParent() }
    
    yName() { return this.family().yParent() ? this.family().yParent().fullName() : 'unknown' }
    
    yNode() { return this._data.yNode }
    
    yParent() { return this.family().yParent() }
}
