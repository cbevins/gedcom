/**
 * Class for constructing ancestral annual disc diagrams
 */
import { idGenCount, idGenSlot } from '$lib/Sylvan/class/Generations.js'

export class AnnularDisc {
    constructor(anodes, dataYearMin, dataYearMax, viewBoxWidth, yearsPerRing=50, centerX=0, centerY=0) {
        this._data = {
            anodes: anodes,
            centerX: 0,
            centerY: 0,
            dataYearMax: dataYearMax,
            dataYearMin: dataYearMin,
            dataYearSpan: dataYearMax - dataYearMin,
            ringCount: 0,
            yearCenter: 0,              // year represented by the disc center
            yearOuter: 0,               // year represented by the disc outer ring
            yearSpan: 0,                // years represented by the entire disc radius
            yearsPerRing: yearsPerRing, // years represented by a single disc ring
            unitsPerRing: 1,
            unitsPerYear: 1,
            viewBoxWidth: viewBoxWidth
        }
        this._setGeometry()
        this._setAnodePositions()
    }

    //--------------------------------------------------------------------------
    // Property accessors
    //--------------------------------------------------------------------------

    anode(idx) { return this._data.anodes[idx] }
    anodes() { return this._data.anodes }
    centerX() { return this._data.centerX }
    centerY() { return this._data.centerY }
    dataYearMax() { return this._data.dataYearMax }
    dataYearMin() { return this._data.dataYearMin }
    dataYearSpan() { return this._data.dataYearSpan }
    ringCount() { return this._data.ringCount }
    yearCenter() { return this._data.yearCenter }
    yearOuter() { return this._data.yearOuter }
    yearSpan() { return this._data.yearSpan }
    yearsPerRing() { return this._data.yearsPerRing }
    unitsPerRing() { return this._data.unitsPerRing }
    unitsPerYear() { return this._data.unitsPerYear }
    viewBoxWidth() { return this._data.viewBoxWidth }

    //--------------------------------------------------------------------------
    // Private m ethods
    //--------------------------------------------------------------------------
    
    // Adjusts the disc range for the data range (i.e., birth) years
    _setGeometry() {
        const ypr = this.yearsPerRing()
        this._data.yearCenter = ypr * Math.trunc(this.dataYearMin() / ypr)
        this._data.yearOuter = ypr * Math.trunc(this.dataYearMax() / ypr) + ypr
        this._data.yearSpan = this.yearOuter() - this.yearCenter()
        this._data.ringCount = this.yearSpan() / ypr
        this._data.unitsPerYear = this.viewBoxWidth() / (2 * this.yearSpan())
        this._data.unitsPerRing = ypr * this.unitsPerYear()
    }

    _setAnodePositions() {
        for (let i=0; i<this.anodes().length; i++) {
            const anode = this.anode(i)
            anode.prop.deg = this.seqDegrees(anode.seq)
            anode.x = this.seqX(anode.seq, anode.prop.year)
            anode.y = this.seqY(anode.seq, anode.prop.year)
        }
    }

    //--------------------------------------------------------------------------
    // Public methods
    //--------------------------------------------------------------------------

    // Returns the disc angle in degrees given the Ancestor's Anode.seq
    seqDegrees(seq) {
        const slot = idGenSlot(seq)
        const slots = idGenCount(seq)
        const deg = 360 * slot/ slots + 96
        return deg
    }

    /**
     * Determine's the disc annular x-coordinate given the Ancestor's Anode.seq and year
     * @param {integer} seq Ancestor sequence number (Anode.seq)
     * @param {integer} year Full year like 1492 or 1776
     * @returns the disc annular x-coordinate given the Ancestor's Anode.seq and year
     */
    seqX(seq, year) { return this.pointX(year, this.seqDegrees(seq)) }

    /**
     * Determine's the annular disc y-coordinate given the Ancestor's Anode.seq and year
     * @param {integer} seq Ancestor sequence number (Anode.seq)
     * @param {integer} year Full year like 1492 or 1776
     * @returns the disc annular y-coordinate given the Ancestor's Anode.seq and year
     */
    seqY(seq, year) { return this.pointY(year, this.seqDegrees(seq)) }

    /**
     * Determines the disc annular x-coordinate for a year and angle
     * @param {integer} year Full year like 1492 or 1776
     * @param {float} deg disc angle
     * @param {float} xCenter x-coordinate of disc center
     * @returns the annular disc x-coordinate given a year and angle
     */
    pointX(year, deg) {
        const dist = (this.yearOuter() - year) * this.unitsPerYear()
        const rad = (360-deg) * Math.PI / 180
        return (this.centerX() - (dist * Math.cos(rad))).toFixed(2)
    }

    // Returns the disc y-coordinate given a year and angle.
    pointY(year, deg) {
        const dist = (this.yearOuter() - year) * this.unitsPerYear()
        const rad = (360-deg) * Math.PI / 180
        return (this.centerY() + (dist * Math.sin(rad))).toFixed(2)
    }
}