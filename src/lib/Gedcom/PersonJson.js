/**
 * Parses a GedcomRecords instance to produce an array of Person records
 * in plain old JSON format (without any object references) that is:
 * - network-transportable and
 * - may be directly imported by other JS files
 */
import fs from 'fs'

export class PersonJson {
    constructor(gedrecs) {
        this._gedrecs = gedrecs
    }

    // Returns array of *content* for each matching GedcomRecord
    _all(key, context) {
        const recs = this._gedrecs.findAll(key, context)
        const contents = []
        for (let i=0; i<recs.length; i++) {
            contents.push(recs[i].content())
        }
        return contents
    }
    // Returns *content* or *missing*
    _first(key, context, missing='') {
        const rec = this._gedrecs.findFirst(key, context)
        return rec ? rec.content() : missing
    }
}