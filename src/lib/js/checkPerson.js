import { Ancestors } from '../js/Ancestors.js'

// Returns an array of Ancestor objects
// with diagnostic messages contained in an additional msg: [] field
export function checkAncestors(gedStore, key, prefix) {
    const ancestors = new Ancestors(gedStore)
    const map = ancestors.ancestors(key)
    for (const [key, person] of gedStore.persons()) {
        if (map.has(key)) {
            const a = map.get(key)
            const msg = []
            const id = '(#' + prefix + a.id + ')'
            a.msg = checkPerson(person, id, key)
            map.set(key, a)
        }
    }
    const ar = Array.from(map, ([key, anc]) => (anc))
    ar.sort(function(a, b){return a.id - b.id})
    return ar
}


export function checkPerson(person, id=null, key=null) {
    const msg = []
    if (id) {
        // Test 1: Ancestors must have a correct file id in its name suffix
        if (! person.name.suffix || person.name.suffix === '') msg.push(`ID ? '${id}'`)
        else if (! person.name.suffix.includes(id)) msg.push(`ID '${person.name.suffix}' ==> '${id}'`)
    }
    // Test 2: Ancestors must have a birth year and country
    if (! person.birth.date.year) msg.push('BirthYear ?')
    if (person.birth.place.country === 'unknown country' || person.birth.place.state === 'unknown state')
        msg.push(`BirthPlace ? [${person.birth.place.text}]`)

    // Test 3: Ancestors must have a death year and country
    if (! person.life.isLiving ) {
        if (! person.death.date.year) msg.push('DeathYear ?')
        if (person.death.place.country === 'unknown country' || person.death.place.state === 'unknown state')
            msg.push(`DeathPlace ? [${person.death.place.text}]`)
    }
    // Test 4: Persons must have a gender
    if (person.life.gender !== 'M' && person.life.gender !== 'F') msg.push(`Gender unnown [${person.life.gender}]`)
    return msg
}
