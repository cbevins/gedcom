/**
 * Families is a catalog of Family instances
 */
import { Family } from './Family.js'
import { parseDate } from '../js/parseDate.js'

export class Families {
    constructor(gedcom, people, places) {
        this._data = {
            famKeyMap: null,    // Map of famKey => Family
            gedcom: gedcom,
            people: people,
            places: places,
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

    places() { return this._data.places }

    size() { return this.famKeyMap().size }

    type() { return this._data.type }

    // ----------------------------------------------------------------------
    // Private methods
    // ----------------------------------------------------------------------
    
    _addPlace(text, person=null, event='unknown') {
        let place = this.places().parsePlace(text)
        if (person && place.messages().length) {
            for (let i=0; i<place.messages().length; i++) {
                person.addMessage(`Event '${event}' PLAC '${text}': ${place.messages()[i]}`)
            }
        }
        return place
    }

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

        family._data.union = {
            date: parseDate(this._marrDate(famKey)),    // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
            notes: this._marrNoteAll(famKey),          // array of notes, which may contain newline separators '/n'
            place: this._addPlace(this._marrPlace(famKey), family.xParent(), 'union'),
            sources: this._marrSourceAll(famKey)       // array of sources keys like '@S1234@'
        }

        family._data.disunion = {
            date: parseDate(this._divDate(famKey)),    // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
            notes: this._divNoteAll(famKey),          // array of notes, which may contain newline separators '/n'
            place: this._addPlace(this._marrPlace(famKey), family.xParent(), 'union'),
            sources: this._divSourceAll(famKey)       // array of sources keys like '@S1234@'
        }
    }

    _divDate(key) { return this.gedcom().findFirstContent(key, ['FAM', 'DIV', 'DATE']) }
    _divNoteAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'DIV', 'NOTE']) }
    _divPlace(key) { return this.gedcom().findFirstContent(key, ['FAM', 'DIV', 'PLAC']) }
    _divSourceAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'DIV', 'SOUR']) }

    _marrDate(key) { return this.gedcom().findFirstContent(key, ['FAM', 'MARR', 'DATE']) }
    _marrNoteAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'MARR', 'NOTE']) }
    _marrPlace(key) { return this.gedcom().findFirstContent(key, ['FAM', 'MARR', 'PLAC']) }
    _marrSourceAll(key) { return this.gedcom().findAllContent(key, ['FAM', 'MARR', 'SOUR']) }
}
