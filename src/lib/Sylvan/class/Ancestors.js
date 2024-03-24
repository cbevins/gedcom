/**
 * Creates a Person => Ancestor Map() of direct ancestors of a subject Person
 */
import { Ancestor } from './Ancestor.js'

export class Ancestors {
    constructor(subject) {
        this._data = {
            chain: null,        // reference to the subject's Ancestor instance (head of the chain)
            map: new Map(),     // Map of Person => Ancestor
            subject: subject,
        }
        this._recurse(subject, 1, 0)
    }

    // Returns array of [<Person>, <Ancestor>] ordered by Ancestor.id()
    arrayById() { return Array.from(this.map()).sort((a, b) => { return (a[1].id() - b[1].id()) }) }

    map() { return this._data.map }

    // Returns an array of all Person references
    persons() {
        const persons = []
        for (const [person, ancestor] of this.map().entries()) persons.push(person)
        return persons
    }

    size() { return this._data.map.size }

    subject() { return this._data.subject }

    _recurse(person, id, gen) {
        const ancestor = new Ancestor(person, id, gen, person.mother(), person.father())
        if (! this._data.chain) this._data.chain = ancestor
        this._data.map.set(person, ancestor)
        if (person.father()) this._recurse(person.father(), id*2, gen+1)
        if (person.mother()) this._recurse(person.mother(), id*2+1, gen+1)
    }

    listById() {
        console.log(`\n-----------------------------------------------------\n\n`)
        console.log(`${this.subject().label()} has ${this.size()} known ancestors:\n`)
        const ar = this.arrayById()
        let last = 0
        for (let i=0; i<ar.length; i++) {
            const [person, ancestor] = ar[i]
            const gen = ancestor.gen()
            const pad = ''.padStart(4*gen, ' ')
            const id = `${gen.toString()}.${ancestor.id()}`.padEnd(8)
            let str = `${pad} |-${id} ${person.label()}  [${person.ageString()}] [${ancestor.person().birthCountry()}]`
            console.log(str)
        }
        return this
    }

    listTree() {
        console.log(`\n-----------------------------------------------------\n\n`)
        console.log(`${this.subject().label()} has ${this.size()} known ancestors:\n`)
        for (const [person, ancestor] of this.map().entries()) {
            const gen = ancestor.gen()
            let str = `${''.padStart(4*gen, ' ')} |-${gen.toString().padStart(3)} ${person.label()} [${ancestor.id()}] [${person.birthCountry()}]`
            console.log(str)
        }
        return this
    }
}
