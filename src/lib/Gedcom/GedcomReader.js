/**
 * Reads a GEDCOM file, such as those produced by Ancestry.com and Roots Magic,
 * into a nested Json record structure for subsequent parsing, translation, and analysis.
 * 
 * The following GEDCOM file format rules are enforced:
 * - Every text line is a series of blank-separated fields
 * - Every text line has at least 2 fields
 * - The first field of every text line is a *level* number [0-n]
 * - If the second field is enclosed in '@' characters, it is a *key*, and the record *type* is in the third field
 * - Otherwise, the second field is the record *type*
 * - Any fields after the record *type* are the record *content*
 * 
 * The readFile() method returns a Map() object where the
 * - key is a Level 0 command such as 'HEAD', 'INDI', 'FAM', 'SOUR', 'REPO', 'TRLR', '_PLAC', '_MTTAG', '_OBJ', and
 * - entry is a <record> = {lineNo: <n>, level: <n>, type: <str>, content: <str>, parent: {record}, subs: [<record>]}
 */
import fs from 'fs'
import readline from 'readline'

export class GedcomReader {
    constructor() {
        this._init()
    }

    _init() {
        this._curr = null // reference to the current Record
        this._lineNo = 0
        this._recordMap = new Map()
    }

    _isKey(field) { return field[0] === '@' }

    _parseRecord(line) {
        this._lineNo++
        const fields = line.split(' ')
        if (fields.length < 2) {
            throw new Error(`Line ${this._lineNo} has less than 2 fields`)
        }
        const level = Number(fields[0])
        const record = {lineNo: this._lineNo, level: level, parent: null, subs: []}
        // If the second field is a key field ...
        if (this._isKey(fields[1])) {
            // ... there must be a third field with the record *type* (like 'INDI' or 'FAMC')
            if (fields.length < 3) {
                throw new Error(`Line ${this._lineNo} has a key field '${fields[1]}' but no type field`)
            }
            record.type = fields[2]
            record.content = fields[1]
        } else {
            record.type = fields[1]
            record.content = fields.length > 2 ? fields[2] : ''
            for(let i=3; i<fields.length; i++) record.content += ' ' + fields[i]
        }
        if (level === 0 ) {
            this._processLevel0(record)
        } else {
            this._processRecord(record)
        }
    }
    
    // Maintains a Map() of all Level 0 commands
    _processLevel0(record) {
        if (!this._recordMap.has(record.type)) this._recordMap.set(record.type, [])
        const records = this._recordMap.get(record.type)
        records.push(record)
        this._recordMap.set(record.type, records)
        this._curr = record
    }
    
    _processRecord(record) {
        if (record.level > this._maxlevel) this._maxlevel = record.level
        // if necessary, move up to the current record's parent
        while(this._curr.level >= record.level) {
            this._curr = this._curr.parent
        }
        record.parent = this._curr
        this._curr.subs.push(record)
        this._curr = record
    }

    async readFile(fileName, onCloseCallback=null) {
        this._init()
        const stream = fs.createReadStream(fileName)
        const reader = readline.createInterface({ input: stream })
        reader.on('error', (err) => {
            throw new Error(`Unable to read GEDCOM file '${fileName}': ${err}`)
        })
        reader.on('close', () => { if (onCloseCallback) onCloseCallback(this) })
        // IMPORTANT!!! MUST USE FOLLOWING INSTEAD OF 'reader.on("line")' TO GET PROPER AWAIT
        for await (const line of reader) { this._parseRecord(line) }
        return this._recordMap
    }
}
