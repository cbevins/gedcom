/**
 * Sources are top level GEDCOM 'SOUR' records stored in a Map
 */
export class Source {
    constructor(gedKey) {
        this._gedKey = gedKey
    }
    gedKey() { return this._gedKey }
}

export class Sources {
    constructor(gedcom) {
        this._type = 'SOUR'
        this._gedcom = gedcom
        this._init()
    }

    _init() {
        this._map = new Map()
        const recsMap = this._gedcom.topLevelRecordsFor(this._type)
        for(const key of recsMap.keys()) this._map.set(key, new Source(key))
    }

    find(key) {
        if (key.substring(0,1) === '@') return this._map.get(key)
        // otherwise else assume it is a nameKey
        return  null
    }

    map() { return this._map }

    size() { return this._map.size }
}