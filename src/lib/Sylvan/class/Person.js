/**
 * People are top level GEDCOM 'SOUR' records stored in a Map
 */
export class Person {
    constructor(gedKey) {
        this._data = {gedKey: gedKey, messages: []}
    }

    // Data access methods
    birthCountry() { return this.birthPlace().country() }
    birthDate() { return this._data.birth.date }
    birthNotes() { return this._data.birth.notes }
    birthPlace() { return this._data.birth.place }
    birthSources() { return this._data.birth.sources }
    birthState() { return this.birthPlace().state() }
    birthYear() { return this.birthDate().year() }
    
    deathCountry() { return this.deathPlace().country() }
    deathDate() { return this._data.death.date }
    deathNotes() { return this._data.death.notes }
    deathPlace() { return this._data.death.place }
    deathSources() { return this._data.death.sources }
    deathState() { return this.deathPlace().state() }
    deathYear() { return this.deathDate().year() }

    familyParents() { return this._data.family.parents }                // array of Family *references* for all this Person's parents
    familyParentKey(idx) { return this._data.family.parentKeys[idx] }   // FAM '@F123@' key for parent idx
    familyParentKeys() { return this._data.family.parentKeys }          // array of FAM '@F123@' keys for all this Person's parents
    familySpouses() { return this._data.family.spouses }                // array of Family *references* for all this Person's spouses
    familySpouseKey(idx) { return this._data.family.spouseKeys[idx] }   // FAM '@F123@' key for spouse idx
    familySpouseKeys() { return this._data.family.spouseKeys }          // array of FAM '@F123@' keys for all this person's spouses
  
    fileId() {
        let pos = this.nameSuffix().indexOf('(#')
        return (pos > -1) ? this.nameSuffix().slice(pos) : ''
    }
    gender() { return this._data.life.gender }      // string 'F' or 'M'
    isDeceased() { return ! this.isLiving() }       // boolean TRUE or FALSE
    isFemale() { return this.gender() === 'F'}      // boolean TRUE or FALSE
    isLiving() { return this._data.life.isLiving }  // boolean TRUE or FALSE
    isMale() { return this.gender() === 'M'}        // boolean TRUE or FALSE
    lifeSpan() { return this._data.life.span }      // string like '(1815-1888)'
    messages() { return this._data.messages }
    
    fullName() { return this.nameFull() }           // same as nameFull()
    gedKey() { return this._data.gedKey }           // INDI GEDCOM key like '@I123@'
    label() { return this._data.name.label }        // same as nameLabel()
    nameFull() { return this._data.name.full }      // same as fullName()
    nameKey() { return this._data.name.key }
    nameLabel() { return this._data.name.label }
    namePrefix() { return this._data.name.prefix }
    nameGiven() { return this._data.name.given }
    nameNick() { return this._data.name.nick }
    nameSuffix() { return this._data.name.suffix }
    nameSurnames() { return this._data.name.surnames }
    nameSurnamePrefix() { return this._data.name.surnamePrefix }

    isImmigrant() {
        return this.isDeceased() && this.birthPlace().country() && this.deathPlace().country()
            && this.birthPlace().country() != this.deathPlace().country()
    }

    // Additional access methods
    // father() { return this.familyParents().length ? this.familyParents()[0].yParent() : null }
    // mother() { return this.familyParents().length ? this.familyParents()[0].xParent() : null }
    father(idx=0) { return this.fathers().length ? this.fathers()[idx] : null}
    fathers() { return this._data.family.fathers }
    issue() { return this._data.family.issue }
    mother(idx=0) { return this.mothers().length ? this.mothers()[idx] : null}
    mothers() { return this._data.family.mothers }
    siblings() { return this._data.family.siblings }
    spouses() { return this._data.family.spouses }

    // Update methods
    addParentFamily(family) { this._data.family.parents.push(family) }
    addMessage(msg) { this._data.messages.push(msg) }
    addSpouseFamily(family) { this._data.family.spouses.push(family) }

    // Returns an array of warning or error message [type, text]
    review() {
        const msg = []
        // if (id) {
        //     // Test 1: Ancestors must have a correct file id in its name suffix
        //     if (! person.name.suffix || person.name.suffix === '') msg.push(`Add ancestor id '${id}'`)
        //     else if (! person.name.suffix.includes(id)) msg.push(`Change ancestor id from '${person.name.suffix}' to '${id}'`)
        // }

        // Test 1: Persons must have a gender
        if (this.gender() !== 'M' && this.gender() !== 'F') msg.push(['Gender Unknown', `[${this.gender()}]`])

        // Test 1: should have a birth year and country
        if (! this.birthYear()) msg.push(['Birth Year Missing', ''])
        if (this.birthCountry() === 'unknown country') msg.push(['Birth Country Missing', `[${this.birthPlace().text()}]`])
        if (this.birthState() === 'unknown state') msg.push(['Birth State Missing', `[${this.birthPlace().text()}]`])

        // Test 3: Ancestors must have a death year and country
        if (! this.isLiving() ) {
            if (! this.deathYear()) msg.push(['Death Year Missing', ''])
            if (this.deathCountry() === 'unknown country') msg.push(['Death Country Missing', `[${this.deathPlace().text()}]`])
            if (this.deathState() === 'unknown state') msg.push(['Death State Missing', `[${this.deathPlace().text()}]`])
        }
        return msg
    }
}
