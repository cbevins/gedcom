export function locations(gedrecs) {
    if (gedrecs.isRootsMagic()){
        return locationsRootsMagic(gedrecs)
    } else {
        return []
        // return placesAncestry(gedrecs)
    }
}

// Returns an array of [placeText, placeStnd]
function locationsRootsMagic(gedrecs) {
    const places = gedrecs.topLevelMap().get('_PLAC')
    console.log(`There are ${places.size} _PLAC records`)
    const ar = []
    for(const [key, record] of places.entries()) {
        const stndRec = gedrecs.findFirst(key, ['_PLAC', 'STND'])
        const latiRec = gedrecs.findFirst(key, ['_PLAC', 'MAP', 'LATI'])
        const lat = latiRec ? latiRec.content() : 0
        const longRec = gedrecs.findFirst(key, ['_PLAC', 'MAP', 'LONG'])
        const lon = longRec ? longRec.content() : 0
        ar.push([record.content(), stndRec.content(), lat, lon])
    }
    return ar.sort()
}
