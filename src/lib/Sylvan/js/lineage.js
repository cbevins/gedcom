/**
 * Determines the lineage chain between two generations of Persons.
 * @param {*} subject Person at bottom of the lineage
 * @param {*} target Person at the top of the lineage
 * @param {*} chain This defaults and should not be passed in
 * @returns An array of [Person, Person] pairs, where
 *  the first Person is the ancestor of lineage and the second Person is the consort,
 *  and the top of the lineage is the first element
 *  and the subject Person is NOT appended to the array
 */
export function lineage(subject, target, chain=[]) {
    if (subject === target) {
        return chain
    } else if (subject.mother() && lineage(subject.mother(), target, chain)) {
        chain.push([subject.mother(), subject.father()])
        return chain
    } else if (subject.father() && lineage(subject.father(), target, chain)) {
        chain.push([subject.father(), subject.mother()])
        return chain
    }
    return false
}
