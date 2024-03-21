/**
 * Sources are top level GEDCOM 'SOUR' records stored in a Map
 */
export class Source {
    constructor(gedKey) {
        this._data.gedKey = gedKey
    }
    gedKey() { return this._data.gedKey }
}
