/**
 * People is a collection of all Person instances keyed by GEDCOM INDI key, name, or label.
 */
import { EvDate } from './EvDate.js'
import { Person } from './Person.js'
import { parseDate } from '../js/parseDate.js'

export class People {
    // Creates hydrated Person instances for each GEDCOM INDI reord
    constructor(gedcom, places) {
        this._data = {
            gedcom: gedcom,
            gedKeyMap:  null, // Map of gedKey => Person
            nameKeyMap: null,  // Map of nameKey => person
            nameLabelMap: null, // map of nameLabel => person
            places: places,
            type: 'INDI'
        }
        this._init()
        this._hydrateAll()
    }

    // ----------------------------------------------------------------------
    // Public data access methods
    // ----------------------------------------------------------------------

    find(key) {
        if (key.substring(0,1) === '@') {
            return this.gedKeyMap().get(key)
        } else if (this.nameKeyMap().has(key)) {
            return this.nameKeyMap().get(key)
        }
        return this.nameLabelMap().get(key)
    }

    gedcom() { return this._data.gedcom }

    gedKeyMap() { return this._data.gedKeyMap }

    nameKeyMap() { return this._data.nameKeyMap }

    nameLabelMap() { return this._data.nameLabelMap }

    places() { return this._data.places }

    // Returns an array of {key: <string>, label: <string>} objects used by Svelecte selector component
    selectors() {
        const options = []
        for (const [gedKey, person] of this.gedKeyMap().entries()) {
            options.push({key: person.nameKey(), label: person.label()})
        }
        return options
    }

    size() { return this.gedKeyMap().size }

    type() { return this._data.type }

    // ----------------------------------------------------------------------
    // Public validation methods
    // ----------------------------------------------------------------------

    checkAll() {
        const a = this.checkMultipleParentalFamilies()
        return a
    }

    updateFamily(families) {
        for (const [gedKey, person] of this.gedKeyMap().entries()) {
            person._data.family.fathers = []
            person._data.family.mothers = []
            person._data.family.siblings = []
            for (let i=0; i< person.familyParentKeys().length; i++) {
                const famKey = person.familyParentKey(i)
                const family = families.find(famKey)
                if (! family) throw new Error(`*** Unable to find Family '${famKey}'`)
                if (family.xParent() && ! person._data.family.mothers.includes(family.xParent()))
                    person._data.family.mothers.push(family.xParent())
                if (family.yParent() && ! person._data.family.fathers.includes(family.yParent()))
                    person._data.family.fathers.push(family.yParent())
                for (let j=0; j<family.children.length; j++) {
                    if (family.child(i)) person._data.family.siblings.push(family.child(i))
                }
            }
            person._data.family.spouses = []
            person._data.family.issue = []
            for (let i=0; i< person.familySpouseKeys().length; i++) {
                const famKey = person.familySpouseKey(i)
                const family = families.find(famKey)
                if (family.xParent() && family.yParent()) {
                    const spouse = (person.gedKey() === family.xParent().gedKey()) ? family.yParent() : family.xParent()
                    if (spouse) person._data.family.spouses.push(spouse)
                    for (let j=0; j<family.children.length; j++) {
                        if (family.child(i)) person._data.family.issue.push(family.child(i))
                    }
                }
            }
        }
    }

    // ----------------------------------------------------------------------
    // Private methods
    // ----------------------------------------------------------------------

    // Attempts to parse and standardize place keys and names, and store them in a Map()
    // Returns the resolved Place instance
    // person and event are optional for writing PLAC warning messages to the person
    _addPlace(text, person=null, event='unknown') {
        let place = this.places().parsePlace(text)
        if (person && place.messages().length) {
            for (let i=0; i<place.messages().length; i++) {
                person.addMessage(`Event '${event}' PLAC '${text}': ${place.messages()[i]}`)
            }
        }
        return place
    }

    _hydrate(key, person) {
        const label = this._nameLabel(key)
        person._data.name = {
            key: this._nameKey(key),
            label: label,
            full: this._fullName(key),
            prefix: this._namePrefix(key),
            given: this._givenNames(key),
            nick: this._nickNames(key),
            surnames: this._surNames(key),
            surnamePrefix: this._surNamePrefix(key),
            suffix: this._nameSuffix(key)
        }
        person._data.life = {
            age: null,                      // [years, months, days], calculated later
            gender: this._gender(key),       // string 'F' or 'M'
            isLiving: this._isLiving(key),   // boolean TRUE or FALSE
            span: this._lifeSpan(key)        // string like '(1815-1888)'
        }
        person._data.birth = {
            date: new EvDate(this._birthDate(key)),     // EvDate instance
            notes: this._birthNoteAll(key),             // array of notes, which may contain newline separators '/n'
            place: this._addPlace(this._birthPlace(key), person, 'birth'), // {text:, key:, count:, country:, state:, county:, locale:}
            sources: this._birthSourceAll(key)          // array of sources keys like '@S1234@'
        },
        person._data.death = {
            date: new EvDate(this._deathDate(key)),     // EvDate instance
            notes: this._deathNoteAll(key),             // array of notes, which may contain newline separators '/n'
            place: this._addPlace(this._deathPlace(key), person, 'death'), // {text:, key:, count:, country:, state:, county:, locale:}
            sources: this._deathSourceAll(key)          // array of sources keys like '@S1234@'
        }
        person._data.family = {
            parentKeys: this._parentalFamilyKeys(key),   // array of FAMC '@F123@' keys
            parents: [],                                // array of Family references (filled by Families constructor)
            spouseKeys: this._spousalFamilyKeys(key),    // array of FAMS '@F123@' keys
            spouses: [],
            issue: [],
            fathers: [],                                 // array of Family references (filled by Families constructor),
            mothers: [],
            siblings: []
        }
        return person
    }

    _hydrateAll() {
        for(const [key, person] of this.gedKeyMap().entries()) {
            this._hydrate(key, person)
            this._data.nameKeyMap.set(person._data.name.key, person)
            this._data.nameLabelMap.set(person._data.name.label, person)
        }
    }

    _year(dateText, missing='?') {
        const date = new EvDate(dateText)
        return date.year() ? date.year() : missing
    }

    // Initializes the gedKeyMap with dehydrated Persons
    _init() {
        this._data.gedKeyMap = new Map()
        this._data.nameKeyMap = new Map()
        this._data.nameLabelMap = new Map()
        const recsMap = this.gedcom().topLevelRecordsFor(this.type())
        for(const key of recsMap.keys()) this.gedKeyMap().set(key, new Person(key))
    }

    // ----------------------------------------------------------------------
    // Private methods for accessing GedcomRecords
    // ----------------------------------------------------------------------

    // INDI-BIRT
    _birthDate(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'DATE']) }
    // birthDateAll(key) { return this._all(key, ['INDI', 'BIRT', 'DATE']) }
    // birthNote(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'NOTE']) }
    _birthNoteAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'BIRT', 'NOTE']) }
    _birthPlace(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'PLAC']) }
    // birthPlaceAll(key) { return this._all(key, ['INDI', 'BIRT', 'PLAC']) }
    // birthSource(key) { return this.gedcom().findFirstContent(key, ['INDI', 'BIRT', 'SOUR']) }
    _birthSourceAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'BIRT', 'SOUR']) }
    _birthYear(key, missing='?') { return this._year(this._birthDate(key), missing) }

    // INDI-DEAT
    _deathDate(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'DATE']) }
    // deathDateAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'DEAT', 'DATE']) }
    // deathNote(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'NOTE']) }
    _deathNoteAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'DEAT', 'NOTE']) }
    _deathPlace(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'PLAC']) }
    // deathPlaceAll(key) { return this._all(key, ['INDI', 'DEAT', 'PLAC']) }
    // deathSource(key) { return this.gedcom().findFirstContent(key, ['INDI', 'DEAT', 'SOUR']) }
    _deathSourceAll(key) { return this.gedcom().findAllContent(key, ['INDI', 'DEAT', 'SOUR']) }
    _deathYear(key, missing='?') { return this._year(this._deathDate(key), missing) }

    // INDI-FAMC, INDI-FAMS
    _parentalFamilyKeys(key) { return this.gedcom().findAllContent(key, ['INDI', 'FAMC'])}
    _spousalFamilyKeys(key) { return this.gedcom().findAllContent(key, ['INDI', 'FAMS'])}

    // Life
    _gender(key) { return this.gedcom().findFirstContent(key, ['INDI', 'SEX']) }
    _isLiving(key) { return this._lifeStatus(key, true, false) }
    _lifeSpan(key, missing) { return `(${this._birthYear(key, missing)}-${this._deathYear(key, missing)})` }
    _lifeStatus(key, alive='Alive', deceased='Deceased') {
        if (this._deathYear(key, '?') !== '?') return deceased
        const birth = this._birthYear(key, '?')
        if (birth !== '?') if (new Date().getFullYear() - birth > 110 ) return deceased
        return alive
    }

    // Names
    _fullName(key) {
        const name = []
        const npfx = this._namePrefix(key)
        const givn = this._givenNames(key)
        const nick = this._nickNames(key)
        const spfx = this._surNamePrefix(key)
        const surn = this._surNames(key)
        const nsfx = this._nameSuffix(key)
        
        if (npfx !== '') name.push(npfx)
        if (givn !== '') name.push(givn)
        if (nick !== '') name.push('"' + nick + '"')
        if (spfx !== '') name.push(spfx)
        if (surn !== '') name.push(surn.toUpperCase())
        if (nsfx !== '') name.push(nsfx)
        return name.join(' ')
    }
    _givenNames(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'GIVN']) }
    // _givenNamesAll(key) { return this.findAllContent(key, ['INDI', 'NAME', 'GIVN']) }
    _name(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME']) }
    // _nameAll(key) { return this.findAllContent(key, ['INDI', 'NAME']) }
    // Returns the name as a key like 'CollinDouglasBevins1952'
    _nameKey(key) { return (this._givenNames(key) + this._surNames(key)).replace(/\s/g,'') + this._birthYear(key) }
    // Returns the name as a key like 'Collin Douglas Bevins (#BH1) (1952-?)'
    _nameLabel(key) { return this._fullName(key) + ' ' + this._lifeSpan(key) }
    _namePrefix(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'NPFX']) }
    // _namePrefixAll(key) { return this._all(key, ['INDI', 'NAME', 'NPFX']) }
    _nameSuffix(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'NSFX']) }
    // _nameSuffixAll(key) { return this.this.gedcom().findAllContent(key, ['INDI', 'NAME', 'NSFX']) }
    _nickNames(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'NICK']) }
    // _nickNamesAll(key) { return this._all(key, ['INDI', 'NAME', 'NICK']) }
    _surNames(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'SURN']) }
    // _surNamesAll(key) { return this._all(key, ['INDI', 'NAME', 'SURN']) }
    _surNamePrefix(key) { return this.gedcom().findFirstContent(key, ['INDI', 'NAME', 'SPFX']) }
    // _surNamePrefixAll(key) { return this._all(key, ['INDI', 'NAME', 'SPFX']) }
}