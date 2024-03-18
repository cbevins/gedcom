/**
 * Families is a catalog of Family instances
 */
import { Family } from './Family.js'

export class Families {
    constructor(gedcom, people) {
        this._data = {
            famKeyMap: null,    // Map of famKey => Family
            gedcom: gedcom,
            people: people,
            type: 'FAM'
        }
        this._init()
    }

    famKeyMap() { return this._data.famKeyMap }

    // Returns a Family *reference*
    find(famKey) { return this._data.famKeyMap.get(famKey) }

    gedcom() { return this._data.gedcom }

    people() { return this._data.people }

    // key may be a GEDCOM INDI key, a nameKey, or a labelKey
    person(key) { return this._data.people.find(key) }

    size() { return this.famKeyMap().size }

    type() { return this._data.type }

    // ----------------------------------------------------------------------
    // Private methods
    // ----------------------------------------------------------------------
    
    _init() {
        this._data.famKeyMap = new Map()
        const recsMap = this.gedcom().topLevelRecordsFor(this.type())
        for(const famKey of recsMap.keys()) {
            const family = new Family(famKey)
            this._hydrate(famKey, family)
            this.famKeyMap().set(famKey, family)
        }
    }

    _hydrate(famKey, family) {
        family._data.xParent = this.person(this.gedcom().findFirstContent(famKey, ['FAM', 'WIFE']))
        family._data.yParent = this.person(this.gedcom().findFirstContent(famKey, ['FAM', 'HUSB']))
        const ar = this.gedcom().findAllContent(famKey, ['FAM', 'CHIL'])
        const children = []
        for(let i=0; i<ar.length; i++) children.push(this.person(ar[i]))
        family._data.children = children
        // Add this family to each of the parents' spousal family
        if (family.xParent()) family.xParent().addSpouseFamily(family)
        if (family.yParent()) family.yParent().addSpouseFamily(family)
        // Add this family to each of the children's parent family
        for(let i=0; i<children.length; i++) children[i].addParentFamily(family)
    }

    divDate(famKey) { return this._first(famKey, ['FAM', 'DIV', 'DATE']) }
    divNote(famKey) { return this._first(famKey, ['FAM', 'DIV', 'NOTE']) }
    divPlace(famKey) { return this._first(famKey, ['FAM', 'DIV', 'PLAC']) }
    divSources(famKey) { return this._all(famKey, ['FAM', 'DIV', 'SOUR']) }
    marrDate(famKey) { return this._first(famKey, ['FAM', 'MARR', 'DATE']) }
    marrNote(famKey) { return this._first(famKey, ['FAM', 'MARR', 'NOTE']) }
    marrPlace(famKey) { return this._first(famKey, ['FAM', 'MARR', 'PLAC']) }
    marrSources(famKey) { return this._all(famKey, ['FAM', 'MARR', 'SOUR']) }
}
