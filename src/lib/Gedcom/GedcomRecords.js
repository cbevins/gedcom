import { GedcomRecord } from './GedcomRecord.js'

export class GedcomRecords {
    constructor (fileName) {
        this._curr = null
        this._fileName = fileName
        this._maxLevel = 0
        // keys are Level 0 GEDCOM type
        // entries are a Map of GedcomRecord level 0 key-record
        this._topLevel = new Map()
    }

    // Creates a new GedcomRecord and adds it to the collection
    // Returns reference to the *current* GedcomRecord
    addLine(lineNo, level, type, content) {
        if (level === 0) {
            // Get (create if necessary) the GedcomRecord Map object for this record *type*
            if (! this._topLevel.has(type)) this._topLevel.set(type, new Map())
            const recMap = this._topLevel.get(type)
            // Create a new GedcomRecord with no parent
            const record = new GedcomRecord(lineNo, level, type, content, null)
            // Add the new GedcomRecord to its record *type* Map object
            recMap.set(content, record)
            // Make the new level 0  record the current record
            this._curr = record
        }

        // If 'CONC', simply append content to the current record
        else if (type === 'CONC') {
            this._curr._content += content
        }
        // If 'CONT', append both a newline and new content to the current record
        else if (type === 'CONT') {
            this._curr._content += '/n' + content
        }
        // else this is a new record
        else {
            // if necessary, move pointer upwards to line level's parent
            while(this._curr.level() >= level) {
                this._curr = this._curr.parent()
            }
            // Create a new GedcomRecord
            const record = new GedcomRecord(lineNo, level, type, content, this._curr)
            // Add the new GedcomRecord to its parent record's *subs* array
            this._curr.addSub(record)
            // Update the current record reference
            this._curr = record
        }
        if (level > this._maxlevel) this._maxlevel = level
        return this._curr
    }

    // Returns an array of [context, count] arrays sorted by context
    contexts() {
        const contextMap = new Map()
        for(const [type0, typeMap] of this._topLevel.entries()) {
            console.log(type0, typeMap.size)
            const context = []
            for(const [gedKey, gedRec] of typeMap.entries()) {
                this._contextsRecurse(gedRec, context, contextMap)
            }
        }
        return Array.from(contextMap).sort()
    }

    _contextsRecurse(record, context, contextMap) {
        // Add the current record type to the context array
        context.push(record.type())
        // Get the current record count for this context
        const key = context.join('-')
        if (! contextMap.has(key)) contextMap.set(key, 0)
        let n = contextMap.get(key)
        // Update the current record count for this context
        n++
        contextMap.set(key, n)
        // Recurse
        for(let i=0; i<record.subs().length; i++) {
            this._contextsRecurse(record.sub(i), context, contextMap)
        }
        context.pop()
    }

    fileName() { return this._fileName }

    // Returns array of references to all GedcomRecord objects
    // whose top level key and context array matches
    findAll(key, context) {
        const found = []
        const head = this.findHead(context[0], key)
        if (head) {
            // Recurse through all the sub records matching the context
            this.findRecurse(head, context, 1, found)
        }
        return found
    }

    // Returns reference to the FIRST GedcomRecord matching the context with level 0 *key*
    findFirst(key, context) { return this.findAll(key, context)[0] }
    
    // Returns reference to the Level 0 GedcomRecord with *key*
    findHead(type, key) {
        // The top level type must exist
        if (! this._topLevel.has(type)) return null
        const recMap = this._topLevel.get(type)
        // The record key for this top level context[0] must exist
        if (! recMap.has(key)) return null
        return recMap.get(key)
    }

    // Recursive search
    findRecurse(head, context, lvl, found) {
        for(let i=0; i<head.subs().length; i++) {
            const rec = head.sub(i)
            if (rec.type() === context[lvl]) {
                // If there is another contezxt level to test...
                if (lvl+1 < context.length) {
                    this.findRecurse(rec, context, lvl+1, found)
                } else {
                    found.push(rec)
                }
            }
        }
    }

    topLevelMap() { return this._topLevel }

    // Returns array of [type0, count] arrays of all Level 0 record types
    topLevelCounts() {
        const data = []
        for(const [type0, typeMap] of this._topLevel.entries()) {
            data.push([type0, typeMap.size])
        }
        return data
    }
}