/**
 * Class for constructing ancestral generational disc diagrams
 */
import { idGenCount, idGenIdx, idGenSlot } from '$lib/Sylvan/class/Generations.js'

export class GenerationalDisc {
    constructor(anodes, factor=1, markerRadius=5, aUnits=100, bUnits=100, centerX=0, centerY=0) {
        this._data = {
            anodes: anodes,
            aDelta: 0,          // scaled ellipse alpha axis step size
            aUnits: aUnits,     // ellipse alpha axis step size
            bDelta: 0,          // scaled ellipse beta axis step size
            bUnits: bUnits,     // ellipse beta axis step size
            centerX: centerX,
            centerY: centerY,
            factor: factor,     // scaling factor
            markerRadius: markerRadius,     // Marker/circle radius (to test for overlapping)
            maxGen: 0,          // Anode.gen maximum
            vbXmax: 1000,       // ViewBox scaled x maximum
            vbXmin: -1000,      // ViewBox scaled x minimum
            vbYmax: 1000,       // ViewBox scaled y maximum
            vbYmin: -1000,      // ViewBox scaled y minimum
        }
        this._setViewBox()
        this._setAnodePositions()
    }

    _setViewBox() {
        for(let i=0; i<this.anodes().length; i++) {
            this._data.maxGen = Math.max(this._data.maxGen, this.anode(i).gen )
        }
        this._data.aDelta = this.factor() * this.aUnits()    // ellipse alpha axis step size
        this._data.bDelta = this.factor() * this.bUnits()    // ellipse alpha axis step size
        this._data.vbXmax = this.aDelta() * this.maxGen()
        this._data.vbXmin = -this.vbXmax()
        this._data.vbYmax = this.bDelta() * this.maxGen()
        this._data.vbYmin = -this.vbYmax()
        this._data.vbWidth = this.vbXmax() - this.vbXmin()
        this._data.vbHeight = this.vbYmax() - this.vbYmin()
    }

    //--------------------------------------------------------------------------
    // Property accessors
    //--------------------------------------------------------------------------

    aDelta() { return this._data.aDelta }
    anode(idx) { return this._data.anodes[idx] }
    anodes() { return this._data.anodes }
    aUnits() { return this._data.aUnits }
    bDelta() { return this._data.bDelta }
    bUnits() { return this._data.bUnits }
    centerX() { return this._data.centerX }
    centerY() { return this._data.centerY }
    factor() { return this._data.factor }
    markerRadius() { return this._data.markerRadius }
    maxGen() { return this._data.maxGen }
    vbHeight() { return this._data.vbHeight }
    vbWidth() { return this._data.vbWidth }
    vbXmax() { return this._data.vbXmax }
    vbXmin() { return this._data.vbXmin }
    vbYmax() { return this._data.vbYmax }
    vbYmin() { return this._data.vbYmin }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    _setAnodePositions() {
        for (let i=0; i<this.anodes().length; i++) {
            const anode = this.anode(i)
            const pt = this.polygonCenter(anode.seq)
            anode.x = pt[0]
            anode.y = pt[1]
            if (i) {
                const pnode = this.anode(i-1)
                const dx = anode.x - pnode.x
                const dy = anode.y - pnode.y
                const d = Math.sqrt(dx*dx+dy*dy)
                // if (d < 2*this.markerRadius()) {
                //     console.log(`Anodes ${i-1} (${pnode.seq}) and ${i} (${anode.seq}) of Gen ${anode.gen} `
                //         + `are less than ${2*this.markerRadius()} px apart.`)
                // }
            }
        }
        this._data.anodes[0].x = 0
        this._data.anodes[0].y = 0
    }

    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    point(aDist, bDist, deg) {
        const rad = (360-deg) * Math.PI / 180
        const x = (this.centerX() - (aDist * Math.cos(rad))).toFixed(2)
        const y = (this.centerY() + (bDist * Math.sin(rad))).toFixed(2)
        return [x, y]
    }

    // Returns a string defining the SVG path for the seq polygon
    polygonPath(seq) {
        const [gen, segs, slot, segDeg, fromDeg] = this.seqInfo(seq)
        const thruDeg = fromDeg + segDeg
        // outer circle arc
        const go = gen
        const ao = go * this.aDelta()
        const bo = go * this.bDelta()
        const p0 = this.point(ao, bo, fromDeg)
        const p1 = this.point(ao, bo, thruDeg)
        // inner circle arc
        const gi = gen-1
        const ai = gi * this.aDelta()
        const bi = gi * this.bDelta()
        const p2 = this.point(ai, bi, fromDeg)
        const p3 = this.point(ai, bi, thruDeg)
        // polygon segment's SVG path
        let d = `M ${p0[0]} ${p0[1]} A ${ao} ${bo} 0 0 1 ${p1[0]} ${p1[1]}`
        if (segs > 1) {
            d += ` L ${p3[0]} ${p3[1]}`
            d += ` A ${ai} ${ai} 0 0 0 ${p2[0]} ${p2[1]}`
            d += ` L ${p0[0]} ${p0[1]}`
        }
        return d
    }

    // Returns coordinates of the center of the disc generational polygon given ancestral seq
    polygonCenter(seq) {
        const [gen, segs, slot, segDeg, fromDeg] = this.seqInfo(seq)
        const centerDeg = fromDeg + segDeg / 2
        return this.point((gen+0.5)*this.aDelta(), (gen+0.5)*this.bDelta(), centerDeg)
    }

    seqInfo(seq) {
        const gen = idGenIdx(seq)           // where subject gen === 0
        const segs =idGenCount(seq)         // generational size (2**gen)
        const slot = idGenSlot(seq)         // seq idx within its generation
        const segDeg = 360 / segs
        const fromDeg = slot * segDeg
        return [gen, segs, slot, segDeg, fromDeg]
    }
}
