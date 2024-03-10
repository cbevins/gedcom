export const Generations =[
    'Subject', 'Parent', 'GrandP', '1st GPP', '2nd GPP', '3rd GGP',
    '4th GGP', '5th GGP', '6th GGP', '7th GGP', '8th GGP', '9th GGP',
    '10th GGP', '11th GGP', '12th GGP', '13th GGP', '14th GGP', '15th GGP'
]


// Demonstrates how to traverse the family tree to collect ancestors.
export class Ancestors {
    constructor(gedStore) {
        this._gedStore = gedStore
        this._ancMap = new Map()   // map of indiKey > {gen:, person:, mother:, father:}
        this._ancTree = null
    }
    
    // Returns a Map() of nameKey => {gen:, person:, mother:, father:}
    // 'subjectKey' is the subject's person.keys.name value
    ancestors(subjectKey) {
        this._ancMap = new Map()
        this._ancTree = null
        this._subjectKey = subjectKey
        this._ancestorsRecurse(subjectKey, 1, 0)
        return this._ancMap
    }
    
    _ancestorsRecurse(subjectKey, id, gen=0) {
        // console.log(gen, subjectKey)
        const person = this._gedStore.person(subjectKey)
        const node = {
            gen: gen,
            id: id,
            person: person, // reference to {person:}
            mother: this._gedStore.mother(subjectKey),   // reference to {person:}
            father: this._gedStore.father(subjectKey) // reference to {person:}
        }
        if (! this._ancTree) this._ancTree = node
        this._ancMap.set(subjectKey, node)
        // console.log(subjectKey)
        const parentFamKeys = person.families.parents
        if (!parentFamKeys.length) return
        const family = this._gedStore.family(parentFamKeys[0])
        if (family.yKey !== '?') this._ancestorsRecurse(family.yKey, id*2, gen+1)
        if (family.xKey !== '?') this._ancestorsRecurse(family.xKey, id*2+1, gen+1)
    }

    list() {
        console.log(`\n-----------------------------------------------------\n\n`)
        console.log(`${this._subjectKey} has ${this._ancMap.size} known ancestors:\n`)
        for (const [nameKey, data] of this._ancMap.entries()) {
            let str = `${''.padStart(4*data.gen, ' ')} |-${data.gen.toString().padStart(3)} ${data.person.keys.label}`
            console.log(str)
        }
        return this
    }

    map() { return this._ancMap }
    
    mapSize() { return this._ancMap.size }

    subjectKey() { return this._subjectKey }
}
