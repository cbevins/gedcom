
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
        return  null
    }

    map() { return this._map }

    size() { return this._map.size }
}
