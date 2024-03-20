/**
 * Creates a Person => Ancestor Map() of direct ancestors of a subject Person
 */
export class Ancestor {
    constructor(person, id, gen, mother, father) {
        this._data = {
            father: father,
            gen: gen,
            id: id,
            mother: mother,
            person: person,
        }
    }
    father() { return this._data.father }
    gen() { return this._data.gen }
    id() { return this._data.id }
    mother() { return this._data.mother }
    person() { return this._data.person }
}
