/**
 * Places are top level GEDCOM '_MAP' records stored in a Map
 */
export class Place {
    constructor(gedKey) {
        this._gedKey = gedKey
    }

    gedKey() { return this._gedKey }
}

export class Places {
    constructor(gedcom) {
        this._type = 'INDI'
        this._gedcom = gedcom
        this._init()
    }

    _init() {
        this._map = new Map()
        const recsMap = this._gedcom.topLevelRecordsFor(this._type)
        for(const key of recsMap.keys()) this._map.set(key, new Person(key))
    }

    find(key) {
        if (key.substring(0,1) === '@') return this._map.get(key)
        // otherwise else assume it is a nameKey
        return  null
    }

    map() { return this._map }

    size() { return this._map.size }
}