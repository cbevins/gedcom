export class GedRecord {
    constructor(parent=null, lineNo=0, level=0, command='', content='') {
        this._parent = parent       // Reference to the parent GedRecord (null if Level 0)
        // this._parentLine = parent ? parent._lineNo : lineNo
        this._lineNo = lineNo       // GEDCOM file record number
        this._level = level         // GEDCOM file record level
        this._command = command     // GEDCOM file record command (i.e., 'INDI', 'OBJE', etc)
        this._content = content     // String of all GEDCOM file record content without Level and COmmand
        this._records = []          // Array of all children GedRecords
    }
    addRecord(gedRecord) {
        this._records.push(gedRecord)
        return this
    }
    command() { return this._command }
    content() { return this._content }
    context() {
        let parent = this._parent
        let str = this._command
        while (parent) {
            str = parent._command + '-' + str
            parent = parent._parent
        }
        return str
    }
    level() { return this._level }
    lineNo() { return this._lineNo }
    parent() { return this._parent }
    record(i=0) { return this._records[i] }
    records() { return this._records }
}