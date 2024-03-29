/**
 * Families are top level GEDCOM 'SOUR' records stored in a Map
 */

export class Family {
    constructor(gedKey) {
        this._data = {
            gedKey: gedKey
        }
    }
    
    // Returns a Person *reference*
    child(idx) { return this._data.children[idx] }
    
    // Returns an array of children Person *references*
    children() { return this._data.children }

    disunionDate() { return this._data.disunion.date }
    disunionNotes() { return this._data.disunion.notes }
    disunionPlace() { return this._data.disunion.place }
    disunionSources() { return this._data.disunion.sources }

    gedKey() { return this._data.gedKey }

    unionDate() { return this._data.union.date }
    unionNotes() { return this._data.union.notes }
    unionPlace() { return this._data.union.place }
    unionSources() { return this._data.union.sources }

    // Returns a Person *reference*
    xParent() { return this._data.xParent }
    
    // Returns a Person *reference*
    yParent() { return this._data.yParent }
}
