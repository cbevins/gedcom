import { Ancestors } from './Ancestors.js'
export const GenerationsData = [
    {gen: 0, count: 1, from: 1, thru: 1, name: 'Self', abbr: 'Self'},
    {gen: 1, count: 2, from: 2, thru: 3, name: 'Parent', abbr: 'Parent'},
    {gen: 2, count: 4, from: 4, thru: 7, name: 'Grand', abbr: 'GrandP'},
    {gen: 3, count: 8, from: 8, thru: 15, name: '1st Great Grand', abbr: '1 GGP'},
    {gen: 4, count: 16, from: 16, thru: 31, name: '2nd Great Grand', abbr: '2 GGP'},
    {gen: 5, count: 32, from: 32, thru: 63, name: '3rd Great Grand', abbr: '3 GGP'},
    {gen: 6, count: 64, from: 64, thru: 127, name: '4th Great Grand', abbr: '4 GGP'},
    {gen: 7, count: 128, from: 128, thru: 255, name: '5th Great Grand', abbr: '5 GGP'},
    {gen: 8, count: 256, from: 256, thru: 511, name: '6th Great Grand', abbr: '6 GGP'},
    {gen: 9, count: 512, from: 512, thru: 1023, name: '7th Great Grand', abbr: '7 GGP'},
    {gen: 10, count: 1024, from: 1024, thru: 2047, name: '8th Great Grand', abbr: '8 GGP'},
    {gen: 11, count: 2048, from: 2048, thru: 4095, name: '9th Great Grand', abbr: '9 GGP'},
    {gen: 12, count: 4096, from: 4096, thru: 8191, name: '10th Great Grand', abbr: '10 GGP'},
    {gen: 13, count: 8192, from: 8192, thru: 16383, name: '11th Great Grand', abbr: '11 GGP'},
    {gen: 14, count: 16384, from: 16384, thru: 32767, name: '12th Great Grand', abbr: '12 GGP'},
    {gen: 15, count: 32768, from: 32768, thru: 65535, name: '13th Great Grand', abbr: '13 GGP'},
    {gen: 16, count: 65536, from: 65536, thru: 131071, name: '14th Great Grand', abbr: '14 GGP'},
    {gen: 17, count: 131072, from: 131072, thru: 262143, name: '15th Great Grand', abbr: '15 GGP'},
    {gen: 18, count: 262144, from: 262144, thru: 524287, name: '16th Great Grand', abbr: '16 GGP'},
    {gen: 19, count: 524288, from: 524288, thru: 1048575, name: '17th Great Grand', abbr: '17 GGP'},
    {gen: 20, count: 1048576, from: 1048576, thru: 2097151, name: '18th Great Grand', abbr: '18 GGP'},
]

//--------------------------------------------------------------------------------------
// Given an Ancestor id (where subject id===1), returns a parameter of its generation
//--------------------------------------------------------------------------------------

export function idGen(id) {
    for(let i=0; i<GenerationsData.length; i++) {
        if (id <= GenerationsData[i].thru) return GenerationsData[i]
    }
    return GenerationsData[GenerationsData.length-1]
}

export function idGenAbbr(id) { return idGen(id).abbr }

export function idGenCount(id) { return idGen(id).count }

export function idGenFrom(id) { return idGen(id).from }

export function idGenIdx(id) { return idGen(id).gen }

export function idGenName(id) { return idGen(id).name }

export function idGenSlot(id) { return id - idGen(id).from }

export function idGenThru(id) { return idGen(id).thru }

/**
 * Calculates birth and death year ranges by generation
 */
export class Generations {
    constructor(sylvan) {
        this._data = {
            countries: sylvan.places().countries(),
            gens: [],           // Array of generation data
            sylvan: sylvan,
            totals: null        // Total number of ancestors by country of birth
        }
    }

    country(idx) { return this._data.countries[idx] }
    
    countries() { return this._data.countries }

    gen(idx) { return this._data.gens[idx] }

    gens() { return this._data.gens }

    sylvan() { return this._data.sylvan }

    totals() { return this._data.totals }

    _init() {
        // Create the data structure
        this._data.gens = []
        for (let i=0; i<GenerationsData.length; i++) {
            const record = {birthMin: 9999, birthMax: 0, deathMin: 9999, deathMax: 0, count: 0, country: new Map()}
            for(let j=0; j<this.countries().length; j++) {
                record.country.set(this.country(j), 0)
            }
            this._data.gens.push(record)
        }
        this._data.totals = new Map()
        for(let j=0; j<this.countries().length; j++) {
            this.totals().set(this.country(j), 0)
        }
    }

    // Accumulate stats over the population
    calc(subject) {
        this._init()
        const ancestors = new Ancestors(subject)
        for (const [person, ancestor] of ancestors.map().entries()) {
            const gen = this.gen(ancestor.gen())
            gen.count++
            if (person.birthYear()) {
                gen.birthMax = (person.birthYear() > gen.birthMax) ? person.birthYear() : gen.birthMax
                gen.birthMin = (person.birthYear() < gen.birthMin) ? person.birthYear() : gen.birthMin
            }
            if (person.deathYear()) {
                gen.deathMax = (person.deathYear() > gen.deathMax) ? person.deathYear() : gen.deathMax
                gen.deathMin = (person.deathYear() < gen.deathMin) ? person.deathYear() : gen.deathMin
            }
            gen.country.set(person.birthCountry(), (gen.country.get(person.birthCountry())+1))
            this.totals().set(person.birthCountry(), (this.totals().get(person.birthCountry())+1))
        }
    }

    // Returns generational table as an array of lines
    lines() {
        const lines = []
        // Header row
        let str = 'Gen |  Size | Count | Birth Years | Death Years |'
        for(let i=0; i<this.countries().length; i++) str += ` ${this.country(i).substring(0, 3).padStart(3)} |`
        lines.push(str)
        // Generational rows
        for(let i=0; i<this.gens().length; i++) {
            const gen = this.gen(i)
            if (gen.count) {
                str = `${i.toString().padStart(3)} | ${GenerationsData[i].count.toString().padStart(5)} |`
                str += `${gen.count.toString().padStart(6)} |`
                str += ` ${gen.birthMin} - ${gen.birthMax} | ${gen.deathMin} - ${gen.deathMax.toString().padStart(4)} |`
                for (const [country, count] of gen.country.entries()) {
                    str += count.toString().padStart(4) + ' |'
                }
                lines.push(str)
            }
        }
        // Totals row
        str = '      TOTALS                                    |'
        for (const [country, count] of this.totals().entries()) {
            str += count.toString().padStart(4) + ' |'
        }
        lines.push(str)
        return lines
    }
}