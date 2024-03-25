// EXPERIMENTAL
export class Relate {
    constructor(gedStore) {
        this._ged = gedStore
        this._pathMap = null
        this._subject = null
    }
    father(person, n=0) { return this._ged.father(person, n) }
    map() { return this._pathMap }
    mother(person, n=0) { return this._ged.mother(person, n) }
    person(personKey) { return this._ged.person(personKey) }


    relate(subjectKey) {
        this._pathMap = new Map()
        this._visited = new Set()
        this._subject = this.person(subjectKey)
        this._storePath(this._subject, ['x'])
        // this._recurse(this._subject, ['x'])
        this._mothers(this._subject, ['x'])
        this._fathers(this._subject, ['x'])
    }
    _recurse(person, path) {
        if (this._visited.has(person.keys.name)) return
        this._visited.add(person.keys.name)
        const mother = this.mother(person)
        if (mother) this._storePath(mother, path.concat(['m']))
        const father = this.father(person)
        if (father) this._storePath(father, path.concat(['f']))
        for(let i=0; i<person.families.spouses.length; i++) {
            const spouse = this._ged.spouse(person, i)
            if (spouse) {
                const pkey = spouse.life.gender === 'F' ? 'w' + i : 'h' + i
                this._storePath(spouse, path.concat([pkey]))
                // console.log(person.keys.name, pkey, spouse.keys.name)
                const family = this._ged.spouseFamily(person, i)
                const children = family.children
                for(let j=0; j<children.length; j++) {
                    const child = this.person(children[j])
                    const pkey = child.life.gender === 'F' ? 'd' + j : 's' + j
                    this._storePath(child, path.concat([pkey]))
                // console.log('    ', child.keys.name)
                }
            }
        }
        if (mother) this._recurse(mother, path.concat(['m']))
        if (father) this._recurse(father, path.concat(['f']))
        for(let i=0; i<person.families.spouses.length; i++) {
            const spouse = this._ged.spouse(person, i)
            if (spouse) {
                const pkey = spouse.life.gender === 'F' ? 'w' + i : 'h' + i
                this._recurse(spouse, path.concat([pkey]))
                const family = this._ged.spouseFamily(person, i)
                const children = family.children
                for(let j=0; j<children.length; j++) {
                    const child = this.person(children[j])
                    const pkey = child.life.gender === 'F' ? 'd' + j : 's' + j
                    this._recurse(child, path.concat([pkey]))
                }
            }
        }
    }
    _fathers(person, path) {
        const father = this.father(person)
        if (father) {
            const p = path.concat(['f'])
            this._storePath(father, p)
            this._fathers(father, p)
        }
    }
    _mothers(person, path) {
        const mother = this.mother(person)
        if (mother) {
            const p = path.concat(['m'])
            this._storePath(mother, p)
            this._mothers(mother, p)
        }
    }
    _storePath(person, path) {
        if (this._pathMap.has(person.keys.name) ) return false
        this._pathMap.set(person.keys.name, path)
        return true
    }

    _storeStep(person, path) {
        console.log(person.keys.label, path)
    }
    step(personKey, path){
        const person = this.person(personKey)
        this._storeStep(person, path)
        // Add parents
        const mother = this.mother(person) 
        if (mother) {
            this._storeStep(mother, path.concat(['p']))
        }
        const father = this.father(person)
        if (father) {
            this._storeStep(father, path.concat(['p']))
        }
        // Add children
        const spouses = []
        for(let i=0; i<person.families.spouses.length; i++) {
            const spouse = this._ged.spouse(person, i)
            if (spouse) {
                spouses.push(spouse)
                const family = this._ged.spouseFamily(person, i)
                const children = family.children
                for(let j=0; j<children.length; j++) {
                    const child = this.person(children[j])
                    if (child) {
                        this._storeStep(child, path.concat(['c']))
                    }
                }
            }
        }
        // Add spouses
        for (let i=0; i<spouses.length; i++) {
            this._storeStep(spouses[i], path.concat(['s']))
        }
    }
}