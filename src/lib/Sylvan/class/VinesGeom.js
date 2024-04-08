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
                    left: 100,       // padding between box left edge and tag left edge
                    right: 100,      // padding between tag right edge and box right edge
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
                    len3: 20,       // ;ength of parent's stub
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
        return `M ${x1}, ${y1} L ${x2} ${y1} L ${x2} ${y2} L ${x1} ${y2} M ${x2} ${y3} L ${x3} ${y3}`
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
                console.log('Biggest Generation is', this.geom().bigGen)
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

    svg() {
        let html = `<svg width="${this.gridWidth()}" height="${this.gridHeight()}" xmlns="http://www.w3.org/2000/svg">\n`
        //- Reference grid background with labels
        let bwd = this.boxWidth()
        let bht = this.boxHeight()
        let col = 0
        let row = 0
        html += `<rect class="grid" x="${col*bwd}" y="${row*bht}" width="${bwd}" height="${bht}" />\n`
        html += `<text x="${col*bwd + bwd/2 - 10}" y="${row*bht + bht/2 + 6}">${col},${row}</text>\n`
        html += `</svg>`
        return html
        for (let col=0; col<this.gridCols(); col++) {
            for (let row=0; row<this.gridRows(); row++) {
                html += `<rect class="grid" x="${col*bwd}" y="${row*bht}" width="${bwd}" height="${bht}" />\n`
                html += `<text x="${col*bwd + bwd/2 - 10}" y="${row*bht + bht/2 + 6}">${col},${row}</text>\n`
            }
        }

        // Definitions of VineNode box and tag elements
        let twd = this.tagWidth()
        let tht = this.tagHeight()
        html += `<defs>\n`
        // Father's tag
        html += `  <g id="father">\n`
        html += `    <rect class="father" x="0" y="0" width="${twd}" height="${tht}" rx="10" ry="10"/>\n`
        html += `  </g>\n`
        // Mother's tag
        html += `  <g id="mother">\n`
        html += `    <rect class="mother" x="0" y="0" width="${twd}" height="${tht}" rx="10" ry="10"/>\n`
        html += `  </g>\n`
        // Enclosing box or figure
        html += `  <g id="cell">\n`
        html += `    <rect class="cell" x="0" y="0" width="${twd}" height="${tht}" />\n`
        html += `    <use href="#father" transform="translate(40, 20)"/>\n`
        html += `    <use href="#mother" transform="translate(40, 50)"/>\n`
        // Connector stub to child's (previous) VineNode
        html += `    <path class="linkage" d="M 40, 30 L 20 30 L 20 60 L 40 60 M 20 45 L 0 45" />\n`
        html += `  </g>\n`
        // Connector stub to mother's parental VineNode
        html += `  <g id="linkX">\n`
        html += `    <path class="linkage" d="M 440 60 L 460 60" />\n`
        html += `  </g>\n`
        // Connector stub to father's parental VineNode
        html += `  <g id="linkY">\n`
        html += `    <path class="linkage" d="M 440, 30 L 460 30" />\n`
        html += `  </g>\n`
        html += `</defs>\n`

        // Insert VineNodes into the grid according to some this.pos() map positions
        const nodes = this.vines().nodesBySeq()
        for (let i=0; i<nodes.length; i++ ) {
            const [person, node] = nodes[i] // Remember that *nodes* is an array of [Person, VineNode] pairs!
            html += `<use href="#cell" transform="translate(${this.boxPosX(node)}, ${this.boxPosY(node)})"/>\n`
            html += `<text x="${this.boxPosX(node)+10}" y="${this.boxPosY(node)+18}">`
            html += `Gen:${node.childGen()}, Col:${this.nodeCol(node)}, Row:${this.nodeRow(node)}, Seq:${node.childSeq(node)}</text>\n`
            html += `  <text class="tag-name-parent" x="${this.textPosX(node)}", y="${this.textPosYFather(node)}">${node.yLabel()}</text>\n`
            html += `  <text class="tag-name-child" x="${this.textPosX(node)}", y="${this.boxPosY(node)+50}">${this.nodeRow(node)}: ${node.childLabel()}</text>\n`
            html += `  <text class="tag-name-parent" x="${this.textPosX(node)}", y="${this.textPosYMother(node)}">${node.xLabel()}</text>\n`
            if (node.yNode() && node.yNode().hasParent()) {
                html += `<use href="#linkY" transform="translate(${this.boxPosX(node)}, ${this.boxPosY(node)})" />\n`
            }
            if (node.xNode() && node.xNode().hasParent()) {
                html += `<use href="#linkX" transform="translate(${this.boxPosX(node)}, ${this.boxPosY(node)})" />\n`
            }
            if (node.childNode()) {
                html += `<line class="linkage" x1="${this.linkPosParentX(node)}" y1="${this.linkPosParentY(node)}" `
                html += `x2="${this.linkPosChildX(node)}" y2="${this.linkPosChildY(node)}" />\n`
            }
        }
        html += `</svg>`
        return html
    }
}
