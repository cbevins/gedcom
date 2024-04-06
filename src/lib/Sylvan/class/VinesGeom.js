export class VinesGeom {
    constructor(vines) {
        this._data = {
            gens: [],
            geom: {
                box: {
                    top: 20,
                    bottom: 20,
                    middle: 10, left: 40, right: 40, width: null, height: null},
                grid: {width: null, height: null, rows: null, cols: null},
                tag: {width: 400, height: 20, left: 10, right: 5},
            },
            maxNodeCount: 0,    // maximum number of VineNodes in any generation
            vines: vines,       // reference to Vines instance
        }
        this._initGenerations()
        this._initMaxNodeCount()
        this._initGeometry()
    }

    box() { return this.geom().box }
    
    // Returns array of VindeNodes for generation idx (where vines.root() generation is 0)
    gen(idx) { return this._data.gens[idx] }
    
    // Returns array of VineNode generational arrays
    gens() { return this._data.gens }
    
    geom() { return this._data.geom }
    
    grid() { return this.geom().grid }
    
    // Returns maximum number of VineNodes found for any generation
    maxNodeCount() { return this._data.maxNodeCount }
    
    tag() { return this.geom().tag }

    // Returns Vines instance references
    vines() { return this._data.vines }

    //------------------------------------------------------------------------------------
    // Geometry access
    //------------------------------------------------------------------------------------

    boxHeight() { return this.box().height }
    boxPadLeft() { return this.box().left }
    boxPadMiddle() { return this.box().middle }
    boxPadTop() { return this.box().top }
    boxPosX(node) { return this.nodeCol(node) * this.boxWidth() }
    boxPosY(node) { return this.nodeRow(node) * this.boxHeight() }
    boxWidth() { return this.box().width }
    gridCols() { return this.grid().cols }
    gridHeight() { return this.grid().height }
    gridRows() { return this.grid().rows }
    gridWidth() { return this.grid().width }

    // Somehow determines a VineNode's column offset
    nodeCol(node) { return node.childGen()+1 }
    // Somehow determines a VineNode's row offset
    nodeRow(node) {
        const gen = this.gen(node.childGen())
        for(let i=0; i<gen.length; i++) {
            if (gen[i] === node) return i
        }
        return 0
    }

    // The 'box' contain 2 parental name 'tags'; top is father's, bottom is mother's
    tagHeight() { return this.tag().height }
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
        this._data.geom.grid.rows = this.maxNodeCount()
        this._data.geom.grid.width = this.gridCols() * this.boxWidth()
        this._data.geom.grid.height = this.gridRows() * this.boxHeight()
    }

    _initMaxNodeCount() {
        for (let i=0; i<this.gens().length; i++)
            this._data.maxNodeCount = Math.max(this.maxNodeCount(), this.gen(i).length)
    }
}