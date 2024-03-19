/**
 * People are top level GEDCOM 'SOUR' records stored in a Map
 */
export class Person {
    constructor(gedKey) {
        this._data = {gedKey: gedKey, messages: []}
    }

    // Data access methods
    birthDate() { return this._data.birth.date }
    birthNotes() { return this._data.birth.notes }
    birthPlace() { return this._data.birth.place }
    birthSources() { return this._data.birth.sources }
    deathDate() { return this._data.death.date }
    deathNotes() { return this._data.death.notes }
    deathPlace() { return this._data.death.place }
    deathSources() { return this._data.death.sources }
    familyParents() { return this._data.family.parents }        // array of Family *references*
    familyParentKey(idx) { return this._data.family.parentKeys[idx] }  // single FAM '@F123@' keys
    familyParentKeys() { return this._data.family.parentKeys }  // array of FAM '@F123@' keys
    familySpouses() { return this._data.family.spouses }        // array of Family *references*
    familySpouseKey(idx) { return this._data.family.spouseKeys[idx] }  // array of FAM '@F123@' keys
    familySpouseKeys() { return this._data.family.spouseKeys }  // array of FAM '@F123@' keys
    fullName() { return this._data.name.full }      // same as nameFull()
    gedKey() { return this._data.gedKey }           // INDI GEDCOM key like '@I123@'
    gender() { return this._data.life.gender }      // string 'F' or 'M'
    isFemale() { return this.gender() === 'F'}      // boolean TRUE or FALSE
    isLiving() { return this._data.life.isLiving }  // boolean TRUE or FALSE
    isMale() { return this.gender() === 'M'}        // boolean TRUE or FALSE
    label() { return this._data.name.label }
    lifeSpan() { return this._data.life.span }      // string like '(1815-1888)'
    messages() { return this._data.messages }
    nameFull() { return this._data.name.full }      // same as fullName()
    nameKey() { return this._data.name.key }
    nameLabel() { return this._data.name.label }
    namePrefix() { return this._data.name.prefix }
    nameGiven() { return this._data.name.given }
    nameNick() { return this._data.name.nick }
    nameSuffix() { return this._data.name.suffix }
    nameSurnames() { return this._data.name.surnames }
    nameSurnamePrefix() { return this._data.name.surnamePrefix }

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
}
