//-------------------------------------------------------------------------
// Command context (e.g., INDI-MARR-DATE-SOUR) counters, helpers, resolvers, etc

function _commandContextsRecurse(head, map) {
    const context = head.context()
    if (!map.has(context)) { map.set(context, 0) }
    const n = map.get(context)
    map.set(context, n+1)
    for(let i=0; i<head.records().length; i++) {
        _commandContextsRecurse(head.record(i), map)
    }
    return map
}

// Returns an array of [commandContext, occurrence]
function commandContextsFor(cmdMap) {
    const map = new Map()
    for (const entry of cmdMap.entries()) {
        let [, head] = entry
        _commandContextsRecurse(head, map)
    }
    let arr = [...map].map((e) => e)
    return arr
}

// Returns ALL the command context occurrences for the input GEDCOM file
export function commandContexts(gedcom) {
    const maps = [gedcom._fam, gedcom._indi, gedcom._obje, gedcom._repo,
        gedcom._sour, gedcom._subm, gedcom._mttag]
    let ar = []
    maps.forEach((map) => { ar = ar.concat(commandContextsFor(map)) })
    return ar.sort()
}
