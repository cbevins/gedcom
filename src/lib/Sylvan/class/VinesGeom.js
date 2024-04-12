export class VinesGeom {
    constructor(vines) {
        this._data = {
            gens: [],
            geom: {
                bigGen: -1,         // generation with the most VineNodes
                box: {
                    bottom: 20,     // padding between box bottom and bottom of mother's tag
                    height: null,   // total box height in SVG viewBox units
                    middle: 20,     // padding between the father's and mother's tags
                    left: 100,      // padding between box left edge and tag left edge
                    right: 100,     // padding between tag right edge and box right edge
                    top: 20,        // padding between box top and top of father's tag
                    width: null,    // total box width in SVG user units
                },
                grid: {
                    cols: null,
                    height: null,
                    rows: null,
                    width: null,
                },
                link: {
                    len1: 20,       // length of child stub, left
                    len2: 20,       // length of child stub, right
                    len3: 20,       // length of parent's stub
                },
                pos: new Map(),     // maps [VineNode => [col, row]]
                tag: {
                    bottom: 5,      // padding between bottom of tag rect and the text baseline
                    height: 20,     // tag height in SVG viewBox units
                    left: 10,       // padding between tag left edge and start of text
                    width: 500,     // tag width in SVG viewBox units
                },
            },
            maxNodeCount: 0,    // maximum number of VineNodes in any generation
            vines: vines,       // reference to Vines instance
        }
        this._initGenerations()
        this._initArrangement()
        this._initBigGen()
        this._refineArrangement2()
        this._initGeometry()
    }

    bigGen() { return this.geom().bigGen }
    
    box() { return this.geom().box }
    
    // Returns array of VindeNodes for generation idx (where vines.root() generation is 0)
    gen(idx) { return this._data.gens[idx] }
    
    // Returns array of VineNode generational arrays
    gens() { return this._data.gens }
    
    geom() { return this._data.geom }
    
    grid() { return this.geom().grid }
    
    // Returns maximum number of VineNodes found for any generation
    maxNodeCount() { return this._data.maxNodeCount }
    
    pos() { return this.geom().pos }
    getPos(node) { return this.pos().get(node) }    // returns [col, row]

    tag() { return this.geom().tag }

    // Returns Vines instance references
    vines() { return this._data.vines }

    //------------------------------------------------------------------------------------
    // Geometry access
    //------------------------------------------------------------------------------------

    boxHeight() { return this.box().height }
    boxPadLeft() { return this.box().left }
    boxPadMiddle() { return this.box().middle }
    boxPadRight() { return this.box().right }
    boxPadTop() { return this.box().top }
    boxPosX(node) { return this.nodeCol(node) * this.boxWidth() }
    boxPosXMid(node) { return this.boxPosX(node) + this.boxWidth()/2 }
    boxPosY(node) { return this.nodeRow(node) * this.boxHeight() }
    boxPosYMid(node) { return this.boxPosY(node) + this.boxHeight()/2 }
    boxWidth() { return this.box().width }

    gridCols() { return this.grid().cols }
    gridHeight() { return this.grid().height }
    gridRows() { return this.grid().rows }
    gridWidth() { return this.grid().width }

    link() { return this.geom().link }
    linkLen1() { return this.link().len1 }
    linkLen2() { return this.link().len2 }
    linkLen3() { return this.link().len3 }

    // Somehow determines a VineNode's column offset
    nodeCol(node) { return this.getPos(node)[0] }
    nodeRow(node) { return this.getPos(node)[1] }

    // The 'box' contain 2 parental name 'tags'; top is father's, bottom is mother's
    tagFatherTranslate() { return `translate(${this.boxPadLeft()}, ${this.boxPadTop()})` }
    tagHeight() { return this.tag().height }
    tagMotherTranslate() {
        const y = this.boxPadTop() + this.tagHeight() + this.boxPadMiddle()
        return `translate(${this.boxPadLeft()}, ${y})`
    }
    tagPadBottom() { return this.tag().bottom }
    tagPadLeft() { return this.tag().left }
    tagPosX(node) { return this.boxPosX(node) + this.boxPadLeft() }
    tagPosYFather(node) { return this.boxPosY(node) + this.boxPadTop() }
    tagPosYMother(node) { return this.tagPosYFather(node) + this.tagHeight() + this.boxPadMiddle() }
    tagWidth() { return this.tag().width }

    // Text and other adornment placement within each tag
    textPosX(node) { return this.tagPosX(node) + this.tagPadLeft() }
    textPosYFather(node) { return this.tagPosYFather(node) + this.tagHeight() - this.tagPadBottom() }
    textPosYMother(node) { return this.tagPosYMother(node) + this.tagHeight() - this.tagPadBottom() }

    //---------------------------------------------------------------------------------------------
    // Connectors
    //---------------------------------------------------------------------------------------------

    linkChildData() {
        const x1 = this.boxPadLeft()
        const x2 = x1 - this.linkLen2()
        const x3 = x2 - this.linkLen1()
        const y1 = this.boxPadTop() + this.tagHeight()/2
        const y2 = y1 + this.boxPadMiddle() + this.tagHeight()
        const y3 = this.boxHeight() / 2
        // return `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2} L ${x1} ${y2} M ${x2} ${y3} L ${x3} ${y3}`
        return `M ${x1} ${y1} C ${x2} ${y1} ${x2} ${y3} ${x3} ${y3} M ${x1} ${y2} C ${x2} ${y2} ${x2} ${y3} ${x3} ${y3}`
    }

    linkFatherData() {
        const x1 = this.boxPadLeft() + this.tagWidth()
        const x2 = x1 + this.linkLen3()
        const y1 = this.boxPadTop() + this.tagHeight()/2
        return `M ${x1} ${y1} L ${x2} ${y1}`
    }

    linkMotherData() {
        const x1 = this.boxPadLeft() + this.tagWidth()
        const x2 = x1 + this.linkLen3()
        const y2 = this.boxPadTop() + this.tagHeight() + this.boxPadMiddle() + this.tagHeight() / 2
        return `M ${x1} ${y2} L ${x2} ${y2}`
    }

    linkPosParentX(pnode) {
        return this.boxPosX(pnode) + this.boxPadLeft() - this.linkLen1() - this.linkLen2()
    }
    linkPosParentY(pnode) { return this.boxPosY(pnode) + this.boxHeight()/2 }
    linkPosChildX(pnode) {
        return this.boxPosX(pnode.childNode()) + this.boxPadRight() + this.tagWidth() + this.linkLen3()
    }
    linkPosChildY(pnode) {
        const y = pnode.child().isFemale()
                ? this.tagPosYMother(pnode.childNode())
                : this.tagPosYFather(pnode.childNode())
        return y + this.tagHeight()/2
    }

    //---------------------------------------------------------------------------------------------
    // Private methods
    //---------------------------------------------------------------------------------------------

    _initGenerations() {
        let currGen = -1
        const nodes = this.vines().nodesBySeq() // array of [Person, VineNode] pairs
        for (let i=0; i<nodes.length; i++) {
            const [person, node] = nodes[i]
            if (node.childGen() > currGen) {
                this._data.gens.push([])
                currGen++
            }
            this._data.gens[currGen].push(node)
        }
    }
    
    _initGeometry() {
        const box = this.box()
        const tag = this.tag()
        this._data.geom.box.height = box.top + box.middle + box.bottom + 2 * tag.height
        this._data.geom.box.width =  box.left + tag.width + box.right
        this._data.geom.grid.cols = this.gens().length + 1
        // this._data.geom.grid.rows = this.maxNodeCount()
        this._data.geom.grid.width = this.gridCols() * this.boxWidth()
        this._data.geom.grid.height = this.gridRows() * this.boxHeight()
    }

    _initArrangement() {
        let n = 1
        for (let i=0; i<this.gens().length; i++) {
            n = 2**i
            this._data.maxNodeCount = Math.max(this.maxNodeCount(), this.gen(i).length)
            const col = i + 1
            for (let j=0; j<this.gen(i).length; j++) {
                const node = this.gen(i)[j]
                const row = j
                this.pos().set(node, [col, row])
            }
        }
        this._data.geom.grid.rows = this.maxNodeCount()
    }

    _initBigGen() {
        this.geom().bigGen = -1
        for (let i=0; i<this.gens().length; i++) {
            if (this.gen(i).length == this.maxNodeCount()) {
                this.geom().bigGen = i
                console.log(`Biggest Generation is ${this.geom().bigGen} with ${this.maxNodeCount()} Families`)
                return
            }
        }
    }

    _refineArrangement() {
        const bigGen = this.bigGen()
        const maxRows = 2**bigGen
        this._data.geom.grid.rows = maxRows+1
        for (let g=0; g<=bigGen; g++ ) {
            const nodes = this.gen(g)
            const col = g+1
            const genNodes = 2**g
            const block = maxRows / genNodes
            console.log(`Gen ${g} Gen Nodes ${genNodes} block ${block}`)
            for (let i=0; i<nodes.length; i++) {
                const node = nodes[i]
                const seq = node.childSeq() - genNodes
                const row = (seq * block) + block / 2
                this.pos().set(node, [col, row])
            }
        }
    }
    
    _refineArrangement2() {
        const bigGen = this.bigGen()
        const maxRows = 2**bigGen
        this._data.geom.grid.rows = maxRows+1
        for (let g=0; g<this.gens().length; g++ ) {
            const nodes = this.gen(g)
            const col = g+1
            const yspace = maxRows / nodes.length
            for (let i=0; i<nodes.length; i++) {
                const node = nodes[i]
                const row = i * yspace + yspace / 2
                this.pos().set(node, [col, row])
            }
        }
    }
}
