import { age } from './age.js'

// Returns reference to a new Demographics instance summarizing:
// Age at Death, number of spouses, and number of children
// by gender and century.
// See the Demongraphics.log() method for example of displaying the data.
export function demographics(gedStore, nameKey) {
    let ancestors = []
    const person = gedStore.person(nameKey)
    _recurseAncestors(gedStore, person, ancestors)
    const dem = new Demographics(gedStore, ancestors)
    return dem
}

// Recursively adds person instances for subjects to a data array
function _recurseAncestors(gedStore, person, statsArray, level=0) {
    // console.log(' '.padStart(4*level), level, person.strNameStandard())
    if (!person.life.isLiving)
        statsArray.push([person, level])
    // Return if at end of parental family ancestor chain
    if (! person.families.parents.length)
        return statsArray
    // Recurse up to each parent
    if (gedStore.mother(person))
        _recurseAncestors(gedStore, gedStore.mother(person), statsArray, level+1)
    if (gedStore.father(person))
        _recurseAncestors(gedStore, gedStore.father(person), statsArray, level+1)
    return statsArray
}


class Demographics {
    constructor(gedStore, ancestors) {
        this._recs = ancestors
        this._gedStore = gedStore
        this._rows = ['Female', 'Male', 'Total']
        this._cols = ['1500s', '1600s', '1700s', '1800s', '1900s', 'Total']
        this._data = []
        this.calc()
    }
    
    calc() {
        this._init()
        for (let i=0; i<this._recs.length; i++) {
            const [person, level] = this._recs[i]
            // Ensure this record has useable birth and death years
            if (! person.birth.date.year || ! person.death.date.year )
                continue
            const years = person.death.date.year - person.birth.date.year
            if (years > 110 || years < 10)
                console.log(`Suspicous age ${years} for person born ${person.birth.date.year} and died ${person.death.date.year}`)
            // Calculate age at death
            const ages = person.life.age
            const decYears = ages[0] + (ages[1] ? (ages[1]-1)/12 + ages[2]/30/12 : 0)
            // Calculate data categories
            const row = person.life.gender === 'F' ? 0 : 1
            const col = Math.floor((person.birth.date.year -1500)/100)
            this._addData(row, col,
                [decYears, person.families.spouses.length, this._gedStore.allChildren(person).length])
        }
    }

    // values is an array of [years, spouses, children]
    _addData(row, col, values) {
        // Gender-Century crosstab totals
        let idx = col + row * this._cols.length
        this._addDataRec(idx, values)
        // Gender category totals (idx 5, 11)
        idx = ((row+1) * this._cols.length) - 1
        this._addDataRec(idx, values)
        // Century category totals
        idx = (this._rows.length-1) * this._cols.length + col
        this._addDataRec(idx, values)
        // Grand totals
        idx = this._rows.length * this._cols.length - 1
        this._addDataRec(idx, values)
    }

    _addDataRec(idx, values) {
        const d = this._data[idx]
        for(let i=0; i<values.length; i++) {
            const prop = d.props[i]
            prop.n++
            prop.sum += values[i]
            prop.mean = (prop.sum / prop.n).toFixed(2)
            if (values[i] > prop.max)
                prop.max = values[i].toFixed(2)
        }
    }

    _init() {
        this._data = []
        for(let row=0; row<this._rows.length; row++) {
            for(let col=0; col<this._cols.length; col++) {
                this._data.push({row: row, col: col, props: [
                    {n: 0, sum: 0, mean: 0, max: 0},    // 0 = AGE
                    {n: 0, sum: 0, mean: 0, max: 0},    // 1 = SPOUSE
                    {n: 0, sum: 0, mean: 0, max: 0}]    // 2 = CHILD
                })
            }
        }
    }

    // Demonstrates how to display the Demographic table
    // 0=age, 1=spouses, 2=children
    log(propIdx=0) {
        const Prop = ['Age at Death', 'Number of Spouses', 'Number of Children']
        console.log(`\n                Demographics for: ${Prop[propIdx]}`)
        let idx
        let str = 'Gender   Prop'
        for(let col=0; col<this._cols.length; col++) {
            str += this._cols[col].toString().padStart(8, ' ')
        }
        console.log(str)
        for(let row=0; row<this._rows.length; row++) {
            str = (this._rows[row]).padEnd(8, ' ') + ' Mean'
            idx = row * this._cols.length
            for(let col=0; col<this._cols.length; col++) {
                const prop = this._data[idx].props[propIdx]
                // console.log('Column', col, 'Mean',prop.mean, 'N', prop.n)
                str += (prop.mean).toString().padStart(8, ' ')
                idx++
            }
            console.log(str)

            str = (this._rows[row]).padEnd(8, ' ') + ' Max '
            idx = row * this._cols.length
            for(let col=0; col<this._cols.length; col++) {
                const prop = this._data[idx].props[propIdx]
                str += (prop.max).toString().padStart(8, ' ')
                idx++
            }
            console.log(str)

            str = (this._rows[row]).padEnd(8, ' ') + ' N   '
            idx = row * this._cols.length
            for(let col=0; col<this._cols.length; col++) {
                const prop = this._data[idx].props[propIdx]
                str += (prop.n).toString().padStart(8, ' ')
                idx++
            }
            console.log(str)
        }
        return this
    }
}
