// Increments the count at the level+1 for the origin key to the map,
// creating a the origin key array first if necessary
function addNationality(map, origin, level, n=1) {
    if (!origin || origin === '?')
        origin = 'unknown'
    if (!map.has(origin)) {
        map.set(origin, {fraction: 0, count: 0, counts: new Array(20).fill(0)})
    }
    const rec = map.get(origin)
    rec.counts[level+1] += n
    rec.count += n
    // console.log(`Added ${n} to level ${level+1} at ${origin}`)
    // map.set(origin, ar)
    return map
}

// Recursively descends the ancestor chain,
// accumulating the origin of furthest descended ancestors
function recurseNationality(gedStore, subject, map=new Map(), level=0) {
    const origin = subject.birth.place.country ? subject.birth.place.country : null
    const parents = [gedStore.mother(subject), gedStore.father(subject)]
    parents.forEach((parent) => {
        // If parent is known, recurse; otherwise assign same nationality as subject
        if (parent) {
            recurseNationality(gedStore, parent, map, level+1)
        } else {
            addNationality(map, origin, level)
        }
    })
    return map
}

// Returns an array of [fraction, origin]
export function calcNationality(gedStore, nameKey) {
    const person = gedStore.person(nameKey)
    const map = recurseNationality(gedStore, person)
    const ar = []
    let total = 0
    let count = 0
    for (const x of map.entries()) {
        const origin = x[0]
        const rec = x[1]
        let fraction = 0
        for(let i=1; i<rec.counts.length; i++) {
            if (rec.counts[i]) {
                fraction += Math.pow(0.5, i) * rec.counts[i]
            }
        }
        total += fraction
        count += rec.count
        ar.push([fraction, origin, rec.count])
    }
    ar.push([total, 'TOTAL', count])
    return ar.sort().reverse()
}

export function logNationality(ar) {
    let maxlen = 0
    for (let i=0; i<ar.length; i++) {
        let [, origin] = ar[i]
        if (origin.length > maxlen) maxlen = origin.length
    }
    for (let i=0; i<ar.length; i++) {
        let [fraction, origin, count] = ar[i]
        console.log(fraction.toFixed(4), origin.padEnd(maxlen+1), count.toString().padStart(4))
    }
}