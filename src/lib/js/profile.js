import { age } from '../js/age.js'

// TO DO
// Sort spouses by union date
// Sort children by birth date

function birthLine(person) { return datePlace(person.birth) }

function datePlace(event) {
    const date = event.date.str==='?' ? 'unknown date' : event.date.str
    const place = event.place.text==='' ? 'unknown place' : event.place.text
    return `on ${date} at ${place}`
}

function deathLine(person) {
    if (person.life.isLiving) {
        const a = age(person.birth.date)
        return `Living (currently ${a[0]}y, ${a[1]}m, ${a[2]}d)` 
    }
    const a = person.life.age
    return datePlace(person.death) + ` (at ${a[0]}y, ${a[1]}m, ${a[2]}d)`
}

function unionLine(family) { return datePlace(family.union) }

export function profile(ged, subjectKey, recurse=true) {
    const person = ged.person(subjectKey)
    if (!person) {
        return {
            personKey: subjectKey,
            nameLine: 'Unknown',
            birthLine: 'unknown date and place',
            birthNotes: [],
            birthSources:  [],
            deathLine: 'unknown date and place',
            deathNotes: [],
            deathSources: [],
            notes: [],
            sources: [],
            parents: [],
            spouses: []
        }
    }
    const data = {
        personKey: subjectKey,
        nameLine: person.name.full + ' ' + person.life.span,
        birthLine: birthLine(person),
        birthNotes: person.birth.notes,
        birthSources: person.birth.sources,
        deathLine: deathLine(person),
        deathNotes: person.death.notes,
        deathSources: person.death.sources,
        notes: person.notes,
        sources: person.sources,
        parents: [],
        spouses: []
    }
    if (! recurse) return data
    // data.parents = []
    // data.spouses = []
    for(let i=0; i<person.families.parents.length; i++) {
        const famKey = person.families.parents[i]
        const family = ged.family(famKey)
        const famData = {
            familyKey: famKey,
            motherKey: family.xKey,
            fatherKey: family.yKey,
            unionLine: unionLine(family),
            unionNotes: family.union.notes,
            unionSources: family.union.sources,
            childKeys: family.children
        }
        data.parents.push(famData)
    }
    for(let i=0; i<person.families.spouses.length; i++) {
        const famKey = person.families.spouses[i]
        const family = ged.family(famKey)
        const spouseKey = (subjectKey === family.xKey) ? family.yKey : family.xKey
        const famData = {
            familyKey: famKey,
            spouseKey: spouseKey,
            unionLine: unionLine(family),
            unionNotes: family.union.notes,
            unionSources: family.union.sources,
            childKeys: family.children
        }
        data.spouses.push(famData)
    }
    return data
}

export function profileCard(ged, subjectKey) {
    const lines = []
    function add(pad, label, text) {
        lines.push(' '.padStart(pad) + ' ' + label + ' ' + text)
    }
    let family, p
    const prof = profile(ged, subjectKey)
    add(0, 'Subject Name', prof.nameLine)
    add(4, 'Born:', prof.birthLine)
    add(8, 'Notes:', prof.birthNotes.length)
    add(8, 'Sources:', prof.birthSources.length)
    add(4, 'Died:', prof.deathLine)
    add(8, 'Notes:', prof.deathNotes.length)
    add(8, 'Sources:', prof.deathSources.length)
    add(4, 'Notes:', prof.notes.length)
    add(4, 'Sources:', prof.sources.length)

    for(let i=0; i<prof.parents.length; i++) {
        family = prof.parents[i]
        add(4, 'Parents:', `(Family ${prof.parents.length})`)
        p = profile(ged, family.motherKey)
        add(8, 'Mother:', p.nameLine)
        add(12, 'Born:', p.birthLine)
        add(12, 'Died:', p.deathLine)
        p = profile(ged, family.fatherKey)
        add(8, 'Father:', p.nameLine)
        add(12, 'Born:', p.birthLine)
        add(12, 'Died:', p.deathLine)
        add(8, 'Union:', family.unionLine)
        add(8, 'Children:', family.childKeys.length)
        for(let j=0; j<family.childKeys.length; j++) {
            p = profile(ged, family.childKeys[j])
            add(12, `${j+1}:`, p.nameLine)
            add(16, 'Born:', p.birthLine)
            add(16, 'Died:', p.deathLine)
        }
    }

    for(let i=0; i<prof.spouses.length; i++) {
        family = prof.spouses[i]
        p = profile(ged, family.spouseKey)
        add(4, `Spouse ${i+1}:`, p.nameLine)
        add(8, 'Born:', p.birthLine)
        add(8, 'Died:', p.deathLine)
        add(8, 'Union:', family.unionLine)
        add(8, 'Children:', family.childKeys.length)
        for(let j=0; j<family.childKeys.length; j++) {
            p = profile(ged, family.childKeys[j])
            add(12, `${j+1}:`, p.nameLine)
            add(16, 'Born:', p.birthLine)
            add(16, 'Died:', p.deathLine)
        }
    }
    return lines
}