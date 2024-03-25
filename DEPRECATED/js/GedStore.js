/**
 * GedStore accepts a network-transportable plain-old JSON data set
 * (produced by Gedcom and runGedJsonGenerator.js)
 * hydrates the necessary {person}, {family}, {places} Map() objects
 */
export class GedStore {
    constructor(gedJson) {
        this._data = {
            person: new Map(gedJson.person),
            family: new Map(gedJson.family),
            places: new Map(gedJson.places),
        }
        // Create the personLabel => personName Map()
        const labels = []
        gedJson.person.forEach(([, indi]) => { labels.push([indi.keys.label, indi.keys.name]) })
        this._data.labels = new Map(labels)
        
        // Create the {key:, label:} objects used by person selectors
        const options = []
        this.persons().forEach (function(value, key) {
            options.push({key: key, label: value.keys.label})
        })
        this._data.personKeyLabels = options

        this.sortFamilyChildren()
    }
    sortFamilyChildren() {
        const ged = this
        for (const [famKey, family] of this.families().entries()) {
            // console.log(famKey)
            family.children.sort(function (a, b) {
                const c1 = ged._data.person.get(a)
                if (!c1) throw new Error(`${a} person is undefined`)
                const c2 = ged._data.person.get(b)
                if (!c2) throw new Error(`${a} person is undefined`)
                return(c1.birth.date.year - c2.birth.date.year)
            })
        }
    }

    // Returns a {family:} object given the famKey like '@F123@'
    family(famKey) { return this._data.family.get(famKey) }

    // Returns Map of [<famKey> => {family}] objects
    families() { return this._data.family }

    // Returns array of all {key:, label:} objects ised in selectors
    personKeyLabels() { return this._data.personKeyLabels }

    // Returns a nameKey like  'CollinDouglasBevins1952' given a label like
    nameKey(label) { return this._data.labels.get(label) }

    // Returns a {person:} object given the nameKey like 'CollinDouglasBevins1952'
    person(nameKey) { return this._data.person.get(nameKey) }
    
    // Returns Map() of [<nameKey> => {person}] objects
    persons() { return this._data.person }

    // Returns the Map() of [<places text> => {place:}] objects
    places() { return this._data.places }
    
    // Returns the {place:} object for placeKey
    place(placeKey) { return this._data.places.get(placeKey) }

    // -------------------------------------------------------------------------
    // The following all return a {person:} or {family:} object
    // given a subject's nameKey string OR their {person:} ref
    // -------------------------------------------------------------------------

    // Returns an Array() of ALL the subject's spousal family children {person:} object references
    // given the subject's nameKey string OR {person:} object
    allChildren(subject) {
        const person = (typeof subject === 'string') ? this.person(subject) : subject
        let ar = []
        for (let i=0; i<person.families.spouses.length; i++) {
            ar = ar.concat(this.children(person, i))
        }
        return ar
    }

    // Returns an Array() of the subject's spousal family[n] children {person:} object references
    // given the subject's nameKey string OR {person:} object
    children(subject, n=0) {
        const person = (typeof subject === 'string') ? this.person(subject) : subject
        const ar = []
        const fam = this.spouseFamily(person, n)
        if (fam) {
            for(let i=0; i<fam.children.length; i++)
                ar.push(this.person(fam.children[i]))
        }
        return ar
    }

    // Returns a subject's father's {person:} object reference
    // given the subject's nameKey string OR {person:} object
    father(subject, n=0) {
        const fam = this.parentFamily(subject, n)
        return fam ? this.person(fam.yKey) : null
    }

    // Returns a subject's mother's {person:} object reference
    // given the subject's nameKey string OR {person:} object
    mother(subject, n=0) {
        const fam = this.parentFamily(subject, n)
        return fam ? this.person(fam.xKey) : null
    }

    // Returns a subject's parental family {family:} object reference
    // given the subject's nameKey string OR {person:} object
    parentFamily(subject, n=0) {
        const person = (typeof subject === 'string') ? this.person(subject) : subject
        return person ? this.family(person.families.parents[n]) : null
    }
    
    // Returns an Array() of the subject's parental family 'n' children {person:} object references
    // given the subject's nameKey string OR {person:} object
    siblings(subject, n=0) {
        const ar = []
        const fam = this.parentFamily(subject, n)
        if (fam) {
            for(let i=0; i<fam.children.length; i++)
                ar.push(this.person(fam.children[i]))
        }
        return ar
    }
    
    // Returns a subject's spouse's {person:} object reference for family[n]
    // given the subject's nameKey string OR {person:} object
    spouse(subject, n=0) {
        const person = (typeof subject === 'string') ? this.person(subject) : subject
        const fam = this.family(person.families.spouses[n])
        return fam ? this.person((person.keys.name === fam.xKey) ? fam.yKey : fam.xKey) : null
    }

    // Returns a subject's spousal family {family:} object reference
    // given the subject's nameKey string OR {person:} object
    spouseFamily(subject, n=0) {
        const person = (typeof subject === 'string') ? this.person(subject) : subject
        return person ? this.family(person.families.spouses[n]) : null
    }
}