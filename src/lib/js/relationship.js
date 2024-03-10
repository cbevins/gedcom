// EXPERIMENTAL
import { Ancestors } from './Ancestors.js'
// Returns a data object describing subject's relationship to the *other*
// {subjectKey:, otherKey:, ccaKeys:, cousin:, removed:, text:}
//
// 'subject' and other' are nameKeys
export function relationship(gedStore, subjectKey, otherKey, log=false) {
    const data = {subjectKey: subjectKey, otherKey: otherKey, ccaKeys: [], cousin: 0, removed: 0, text: 'Unrelated'}
    const subject = gedStore.person(subjectKey)
    const other = gedStore.person(otherKey)
    const subjectAnc = new Ancestors(gedStore)
    const otherAnc = new Ancestors(gedStore)
    const subjectMap = subjectAnc.ancestors(subjectKey)    // {gen:, person:, mother:, father:}
    const otherMap = otherAnc.ancestors(otherKey)
    let minDist = 999999
    let subjectDist = 999999
    let otherDist = 999999
    subjectMap.forEach((a1, key, map)=> { // value = {gen: gen, person: person}
        // console.log(a1.gen, a1.person.keys.label)
        if (otherMap.has(key)) {
            // Shared ancestor found
            const a2 = otherMap.get(key)
            const dist = a1.gen + a2.gen
            // console.log(`---- ${a1.gen}+${a2.gen}=${dist} for ${a2.person.keys.label}`)
            if (dist <= minDist) {
                subjectDist = a1.gen
                otherDist = a2.gen
                minDist = dist
                data.ccaKeys.push(key)
            }
        }
    })
    if (! data.ccaKeys.length) return data
    // cousin = lesser distance between the two persons and their closest common ancestors
    data.cousin = (subjectDist <= otherDist) ? subjectDist : otherDist
    // removed = difference between the two persons' distances to their closest common ancestors
    data.removed = subjectDist - otherDist
    data.text = relatedText(data.cousin, data.removed, other.life.gender)
    
    if (log) {
        console.log(`\nThere are ${data.ccaKeys.length} Closest Common Ancestors`)
        for(let i=0; i<data.ccaKeys.length; i++) {
            const ccaPerson = gedStore.person(data.ccaKeys[i])
            console.log(`   ${i+1}: ${ccaPerson.keys.label} ${ccaPerson.life.gender}`)
        }
        console.log(`Subject ${subject.keys.label} distance is ${subjectDist}`)
        console.log(`Other ${other.keys.label} distance is ${otherDist}`)
        console.log(`Cousin=${data.cousin}, Removed=${data.removed}, Gender=${other.life.gender}`)
        console.log(`${other.keys.label} is the ${data.text} of ${subject.keys.label}`)
    }
    return data
}

// const Rel = [
//     // C0: ancestors C1: 0 cousins  C2: 1st cousins
//     ['Self',         'Sibling',    '1st Cousin',           '2nd Cousin'],
//     ['Parent',       'Uncle/Aunt', '1st Cousin 1x Removed', '2nd Cousin 1x Removed' ],
//     ['Grand Parent', 'Grand UA',   '1st Cousin 2x Removed', '2nd Cousin 2x Removed' ],
//     ['1st GGP',      '1st GGUA',   '1st Cousin 3x Removed', '2nd Cousin 3x Removed' ],
//     ['2nd GGP',      '2nd GGUA',   '1st Cousin 4x Removed', '2nd Cousin 4x Removed' ],
// ]
// const Invert = [
//     // C0: ancestors C1: 0 cousins  C2: 1st cousins
//     ['Self',         'Sibling',    '1st Cousin',           '2nd Cousin'],
//     ['Child',        'Nephew/Neice', '1st Cousin 1x Removed', '2nd Cousin 1x Removed' ],
//     ['Grand Child',  'Grand NN',   '1st Cousin 2x Removed', '2nd Cousin 2x Removed' ],
//     ['1st GGC',      '1st GGNN',   '1st Cousin 3x Removed', '2nd Cousin 3x Removed' ],
//     ['2nd GGC',      '2nd GGNN',   '1st Cousin 4x Removed', '2nd Cousin 4x Removed' ],
// ]

// Returns a string
export function relatedText(cousin, removed, otherGender) {
    const Ord = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th',
        '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th']
    const otherFemale = otherGender === 'F' ? true : false
    if (cousin === 0) {
        if (removed === 0) { return 'Self'}
        else if (removed === 1) { return otherFemale ? 'Mother' : 'Father' }
        else if (removed === 2) { return otherFemale ? 'Grand Mother' : 'Grand Father' }
        else if (removed > 2) {
            return `${Ord[removed-2]} Great Grand ` + (otherFemale ? 'Mother' : 'Father')
        }
        else if (removed === -1) { return otherFemale ? 'Daughter' : 'Son' }
        else if (removed === -2) { return otherFemale ? 'Grand Daughter' : 'Grand Son' }
        else if (removed < -2) {
            return `${Ord[Math.abs(removed)-2]} Great Grand ` + (otherFemale ? 'Daughter' : 'Son')
        }
    } else if (cousin === 1) {
        if (removed === 0) { return otherFemale ? 'Sister' : 'Brother'}
        else if (removed === 1) { return otherFemale ? 'Aunt' : 'Uncle' }
        else if (removed === 2) { return otherFemale ? 'Grand Aunt' : 'Grand Uncle' }
        else if (removed > 2) {
            return `${Ord[removed-2]} Great Grand ` + (otherFemale ? 'Aunt' : 'Uncle')
        }
        else if (removed === -1) { return otherFemale ? 'Neice' : 'Nephew' }
        else if (removed === -2) { return otherFemale ? 'Grand Neice' : 'Grand Nephew' }
        else if (removed < -2) {
            return `${Ord[Math.abs(removed)-2]} Great Grand ` + (otherFemale ? 'Neice' : 'Nephew')
        }
    } else {
        return `${Ord[cousin-1]} Cousin` + (removed ? ` ${removed}x Removed` : '')
    }
    return 'Unknown'
}
