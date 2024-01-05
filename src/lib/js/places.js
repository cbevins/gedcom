//-------------------------------------------------------------------------
// Place name counters, helpers, resolvers, etc

function _placesRecurse(head, map) {
    if (head.command() === 'PLAC') {
        const place = head.content().trim()
        if (!map.has(place)) { map.set(place, 0) }
        const n = map.get(place)
        map.set(place, n+1)
        return map
    }
    for(let i=0; i<head.records().length; i++) { _placesRecurse(head.record(i), map) }
    return map
}

// Returns an array of [placeNames, occurrence]
export function placesArray(gedcom) {
    const map = new Map()
    for (const [, head] of gedcom._indi.entries()) { _placesRecurse(head, map) }
    let arr = [...map].map((e) => e)
    return arr.sort()
}
