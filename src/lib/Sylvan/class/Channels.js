/**
 * Lineage data structure used to construct lineage diagrams
 * based on birth date.
 */
import { Lineage } from '$lib/Sylvan/class/Lineage.js'
import { idGenCount } from '$lib/Sylvan/class/Generations.js'

export class Channels extends Lineage {
    constructor(rootPerson) {
        super(rootPerson)
        this._data.channels = 0     // number of channels
        this._data.yearMax = 0      // earliest ancestral birth year
        this._data.yearMin = 9999   // last ancestral birth year

        this._addAncestorCounts(this.rootNode()) // Lineage class method
        this._decorateNodes()
        this._data.channels = this._traverse(this.rootNode(), 0)
        this._flipFathersChannels()
        this.summary()
    }

    //--------------------------------------------------------------------------
    // Public property access methods
    //--------------------------------------------------------------------------

    // Returns the number of channels in the Lineage
    channelMaxCount() { return this.data().channels }
    
    summary() {
        console.log(`Channels Summary for subject '${this.rootPerson().label()}':`)
        console.log(`  - ${this.years()} years from ${this.yearMin()} - ${this.yearMax()} (grid cols))`)
        console.log(`  - ${this.nodes().length} ancestors `)
        console.log(`  - ${this.channelMaxCount()} channels.`)
    }

    // Returns the total number of years (cols) from min birth through max birth
    years() { return this.yearMax() - this.yearMin() +1 }

    yearMax() { return this.data().yearMax }
    
    yearMin() { return this.data().yearMin }

    // Returns the index into channel.years[yidx] given the year
    yearIdx(year) { return year - this.channel().yearMin }

    // Returns the year given the channel.years[] index
    year(yearIdx) { return this.channel().yearMin + yearIdx }

    //--------------------------------------------------------------------------
    // Private methods
    //--------------------------------------------------------------------------

    // Adds the subject's 'label', 'birthCountry', 'birthState', and 'birthYear' {node} properties.
    // Adds the 'yearMax' and 'yearMin' Channel class properties.
    _decorateNodes() {
        this._data.yearMax = 0      // earliest ancestral birth year
        this._data.yearMin = 9999   // last ancestral birth year
        for(let i=0; i<this.nodes().length; i++) {
            const node = this.node(i)
            node.birthCountry = node.person.birthCountry()
            node.birthState = node.person.birthState()
            node.birthYear = node.person.birthYear()
            node.label = node.person.label()
            this._data.yearMin = Math.min(this._data.yearMin, node.birthYear)
            this._data.yearMax = Math.max(this._data.yearMax, node.birthYear)
        }
    }

    _flipFathersChannels() {
        const chan = this.rootNode().mother.channel
        for (let i=0; i<this.nodes().length; i++) {
            const cnode = this.node(i)
            if (cnode.channel < chan)  cnode.channel = Math.abs(cnode.channel - chan)
        }
    }
    
    // Adds the subject's 'channel' {node} property.
    // Adds the 'channels' Channel class properties.
    // Returns the next available channel index
    _traverse(node, channel) {
        let chan = channel
        node.channel = channel // channel used to connect this {node} with its chuild {node}
        const count = idGenCount(node.gen) // number of slots in this generation
        const slot = (node.seq - count)    // slot number (base 0) of this {node}
        node.y = (slot + 0.5) / count      // slot fraction of the way down the chart
        if (node.father) {
            chan = this._traverse(node.father, channel)
            if (node.mother) {
                chan = this._traverse(node.mother, chan+1)
            }
        } else if (node.mother) {
            chan = this._traverse(node.mother, channel)
        }
        // console.log(`${channel}, next: ${chan}, ${node.person.label()}`)
        return chan
    }
}