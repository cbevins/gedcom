// TO DO
// Sort spouses by union date
// Sort children by birth date

function noteLines(notes) {
    let a = []
    for (let i=0; i<notes.length; i++) a = a.concat(notes[i].split('/n'))
    return a
}

function notesStr(notes, pad) {
    const lines = noteLines(notes)
    const padding = ''.padStart(pad)
    let str = ''
    for (let i=0; i<lines.length; i++) str += padding + lines[i] + '\n'
    return str
}

export function profile(subject, recurse=false) {
    let str = `Name: ${subject.label()}\n`
    str += `Born: ${subject.birthLine()}\n`
    str += `      Notes: ${subject.birthNotes()}\n`
    str += `      Source Keys: ${subject.birthSourceKeys()}\n`
    str += `Died: ${subject.deathLine()}\n`
    str += `      Notes: ${subject.deathNotes()}\n`
    str += `      Source Keys: ${subject.deathSourceKeys()}\n`
    str += `Notes: ${notesStr(subject.notes(), 8)}\n`
    str += `Source Keys: ${subject.sourceKeys()}\n`
    str += '---------------------------------------------\n'
    str += `Father:   ${subject.father().fullName()}\n`
    str += `Mother:   ${subject.mother().fullName()}\n`
    const siblings = subject.siblings()
    str += `Siblings: ${siblings.length}\n`
    for (let i=0; i<siblings.length; i++) {
        str += `          ${siblings[i].fullName()}\n`
    }
    str += '---------------------------------------------\n'
    const families = subject.familySpouses()
    str += `Spouses: ${families.length}\n`
    for (let i=0; i<families.length; i++) {
        str += '---------------------------------------------\n'
        const family = families[i]
        const spouse = (subject === family.xParent()) ? family.yParent() : family.xParent()
        str += `Spouse ${i+1}: ${spouse ? spouse.fullName(): 'unknown'}\n`
        str += `Married: ${family.unionLine()}\n`
        str += `Children: ${family.children().length}\n`
        for (let j=0; j<family.children().length; j++) {
            const child = family.child(j)
            str += `          ${j+1} ${child.fullName()}\n`
        }
    }
    return str
}
