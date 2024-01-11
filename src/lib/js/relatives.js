/**
 * Creates a Map() of the relationships between a root person
 * and all other persons in the GedStore.
 * 
 * WORK IN PROGRESS
 * FUNCTION family() is the latest attempt...
 */

export function relatives(gedStore, rootNameKey) {
    const rel = new Map()
    for (const [nameKey, person] of gedStore.persons().entries()) {
        rel.set(nameKey, {vetted: false, paths: []})
    }
    const subject = gedStore.person(rootNameKey)
    _relativesRecurse(gedStore, rel, subject, [['x', rootNameKey]])
    return rel
}

function _relativesRecurse(gedStore, relatives, subject, path) {
    // r = {vetted: false, paths: [[path, nameKey]]}
    const r = relatives.get(subject.keys.name)
    r.paths.push(path)
    if (r.vetted) return
    r.vetted = true
    // Ascend the mother's hierarchy
    const mother = gedStore.mother(subject)   // reference to {person:}
    if (mother) {
        // if (! relatives.get(mother.keys.name).vetted)
            _relativesRecurse(gedStore, relatives, mother, path.concat([['m', mother.keys.name]]))
    }
    // Ascend the father's hierarchy
    const father = gedStore.father(subject)   // reference to {person:}
    if (father) {
        // if (! relatives.get(father.keys.name).vetted)
            _relativesRecurse(gedStore, relatives, father, path.concat([['f', father.keys.name]]))
    }
    // Descend for each child
    for(let i=0; i<subject.families.spouses.length; i++) {
        const family = gedStore.family(subject.families.spouses[i])
        const spouse = gedStore.spouse(subject, i)
        const children = gedStore.children(subject, i)
        for (let j=0; j<children.length; j++) {
            const child = children[j]
            // if (! relatives.get(child.keys.name).vetted) {
                const key = child.life.gender === 'M' ? 's' : 'd'
                _relativesRecurse(gedStore, relatives, child, path.concat([[key, child.keys.name]]))
            // }
        }
    }
}

export function family(gedStore, rootNameKey) {
    console.log('--------------------------------------------------------------')
    const rel = new Map()
    const subject = gedStore.person(rootNameKey)
    const path = [[subject, 'x', null, null]]
    rel.set(subject.keys.name, path)
    _family(gedStore, rel, subject, path)
    return rel
}
let rec = 0
function _family(gedStore, relatives, subject, path) {
    // First assign subject's parents, spouses, and children
    const mother = gedStore.mother(subject)   // reference to {person:}
    const father = gedStore.father(subject)   // reference to {person:}
    const next = []    // [subject {person}, relationship, via {person}, via {person}]
    if (mother && ! relatives.has(mother.keys.name)) {
        const item = [mother, 'm', father, null]
        relatives.set(mother.keys.name, path.concat([item]))
        next.push(item)
    }
    if (father && ! relatives.has(father.keys.name)) {
        const item = [father, 'f', mother, null]
        relatives.set(father.keys.name, path.concat([item]))
        next.push(item)
    }
    for(let i=0; i<subject.families.spouses.length; i++) {
        const spouse = gedStore.spouse(subject, i)
        if (spouse && ! relatives.has(spouse.keys.name)) {
            const item = [spouse, `u${i}`, subject, null]
            relatives.set(spouse.keys.name, path.concat([item]))
            next.push(item)
        }
        const children = gedStore.children(subject, i)
        for (let j=0; j<children.length; j++) {
            const child = children[j]
            if (child && ! relatives.has(child.keys.name)) {
                const rel = child.life.gender === 'M' ? 's' : 'd'
                const item = [child, rel, subject, spouse]
                relatives.set(child.keys.name, path.concat([item]))
                next.push(item)
            }
        }
    }
    // then recurse for each parent, spouse, and child
    for (let i=0; i<next.length; i++) {
        const [person, ...rest] = next[i]
        if(! person)
            console.log('person', person)
        _family(gedStore, relatives, person, path.concat( [next[i]] ))
    }
}
