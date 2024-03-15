/**
 * Line number, command type and level, content, and subcommands
 * for a single GEDCOM file line.
 */
export class GedcomRecord {
    constructor(lineNo, level, type, content='', parent=null) {
        this._content = content
        this._level = level
        this._lineNo = lineNo
        this._parent = parent
        this._subs = []
        this._type = type
    }

    // Adds a nested GedcomRecord to *this* parent
    addSub(gedcomRecord) {
        this._subs.push(gedcomRecord)
        return this
    }

    // Returns the content, which may be a (possibly empty) string or an array of strings
    content() { return this._content }

    // Returns this records context as an array
    context() {
        let ctx = []
        let curr = this
        while (curr) {
            ctx.push(curr.type())
            curr = curr.parent()
        }
        return ctx.reverse()
    }

    isTopLevel() { return this._level === 0 }

    // Returns the record's nesting level with 0 being the top level command
    level() { return this._level }

    // Returns the original GEDCOM file line number
    lineNo() { return this._lineNo }

    // Returns array of strings indented by level
    listBlock(block=null, spaces=2) {
        if (! block) block = []
        let pad = ' '.padStart(this.level()*spaces)
        let str = `${pad} ${this.lineNo()}: ${this.level()} ${this.type()} ${this.content()}`
        block.push(str)
        for(let i=0; i<this.subs().length; i++) {
            const rec = this.sub(i)
            rec.listBlock(block)
        }
        return block
    }

    // Returns a reference to this record's parent record, or NULL if its a top-level
    parent() { return this._parent }

    // Returns the nested GedcomRecord at index i
    sub(i) { return this._subs[i] }

    // Returns array of nested GedcomRecords
    subs() { return this._subs }

    // Returns the original command field, like 'INDI' or 'FAM'
    type() { return this._type }
}