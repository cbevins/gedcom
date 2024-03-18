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

    gedKey() { return this._data.gedKey }

    // Returns a Person *reference*
    xParent() { return this._data.xParent }
    
    // Returns a Person *reference*
    yParent() { return this._data.yParent }
}
