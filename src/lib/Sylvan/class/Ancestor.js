/**
 * Creates a Person => Ancestor Map() of direct ancestors of a subject Person
 */
export class Ancestor {
    constructor(person, id, gen, mother, father) {
        this._data = {
            father: father, // Person reference
            gen: gen,       // generation offset (Ancestors instance subject is generation 0)
            id: id,         // File id (Ancestors instance subject is id 1)
            mother: mother, // Person reference
            person: person, // Person reference
            mom: null,      // Ancestor reference, filled by Ancestors.link()
            dad: null,      // Ancestor reference, filled by Ancestors.link()
        }
    }
    dad() { return this._data.dad }             // Ancestor reference
    father() { return this._data.father }       // Person reference or null
    gen() { return this._data.gen }             // generation number [base 0]
    genSize() { return 2**this.gen() }          // max number of ancestors for the generation
    id() { return this._data.id }               // sequential id [base 1]
    mom() { return this._data.mom }             // Ancestor reference
    mother() { return this._data.mother }       // Person reference or null
    person() { return this._data.person }       // Person reference or null
    
    //-------------------------------------------------------------------------
    // These provide the Acestor's relative placement within the Ancestor tree
    //-------------------------------------------------------------------------
    
    // Ancestor's tree horiz offset [base 0 from left] within their generation
    offset() { return this.id() - 2**this.gen() }

    // Ancestor's tree horiz offset from tree midline, like [-4, -3, -2, -1, 1, 2, 3, 4]
    // NOTE that there is NO ZERO OFFSET
    xpos() {
        const n = this.genSize() / 2
        const sym = this.offset() - n
        return (sym < 0) ? sym : sym + 1
    }
}
