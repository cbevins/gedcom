/**
 * Reads a GEDCOM file, such as those produced by Ancestry.com and Roots Magic,
 * and returns a GedcomRecords instance for subsequent parsing, translation, and analysis.
 * 
 * This class does not assume existence of any specific GEDCOM record types, it just syores them.
 * 
 * The following GEDCOM input file format rules are enforced:
 * - Every text line is a series of blank-separated fields
 * - Every text line has at least 2 fields
 * - The first field of every text line is a *level* number [0-n]
 * - If the second field is enclosed in '@' characters, it is a *key*, and the record *type* is in the third field
 * - Otherwise, the second field is the record *type*
 * - Any fields after the record *type* are the record *content*
 * 
 * Usage:
 * The class instances are created and returned by the GedcomReader class:
 *     const reader = new GedcomReader()
 *     const gedrecs = await reader.readFile(gedcomFileName)
 */
import fs from 'fs'
import readline from 'readline'
import { GedcomRecords } from './GedcomRecords.js'

export class GedcomReader {
    constructor() {
        this._init()
    }

    _init(fileName='') {
        this._gedcom = new GedcomRecords(fileName)
        this._lineNo = 0
        this._msg = []
    }

    _isKey(field) { return field[0] === '@' }

    _parseRecord(line) {
        this._lineNo++
        // console.log(`${this._lineNo}: [${line}]`)
        const fields = line.split(' ')
        if (fields.length < 2) {
            this._msg.push(`Line ${this._lineNo} has less than 2 fields: [${line}]`)
            // throw new Error(`Line ${this._lineNo} has less than 2 fields`)
        }
        // First field must be a level integer (base 0)
        const level = Number(fields[0])

        // If the second field is a @A123@ style GEDCOM key field ...
        if (this._isKey(fields[1])) {
            // ... there must be a third field with the GedcomRecord *type* (like 'INDI' or 'FAM')
            if (fields.length < 3) {
                throw new Error(`Line ${this._lineNo} has a key field '${fields[1]}' but no type field`)
            }
            // (lineNo, level, type, content)
            this._gedcom.addLine(this._lineNo, level, fields[2], fields[1])
        }
        // otherwise the second field is the GedcomRecord *type* and the remaining fields are the content
        else {
            let content = fields.length > 2 ? fields[2] : ''
            for(let i=3; i<fields.length; i++) content += ' ' + fields[i]
            // (lineNo, level, type, content)
            this._gedcom.addLine(this._lineNo, level, fields[1], content)
        }
    }

    messages() { return this._msg }

    async readFile(fileName, onCloseCallback=null) {
        this._init(fileName)
        const stream = fs.createReadStream(fileName)
        const reader = readline.createInterface({ input: stream })
        reader.on('error', (err) => {
            throw new Error(`Unable to read GEDCOM file '${fileName}': ${err}`)
        })
        reader.on('close', () => { if (onCloseCallback) onCloseCallback(this) })
        // IMPORTANT!!! MUST USE FOLLOWING INSTEAD OF 'reader.on("line")' TO GET PROPER AWAIT
        for await (const line of reader) { this._parseRecord(line) }
        return this._gedcom
    }
}
