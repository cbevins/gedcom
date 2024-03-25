// Writes all the standardized Place names and their counts to a file
import fs from 'fs'
import { GedStore } from '../js/GedStore.js'
import { gedJson } from '../../src/lib/data/GedJsonAncestry.js'
import {Countries, Regions, States, Recodes} from '../../src/lib/data/Places.js'

const time1 = new Date()
const gedStore = new GedStore(gedJson)
const placesFile = './places.txt'
const countryMap = new Map()
const logger = fs.createWriteStream(placesFile, {flags: 'w'})
for(const [key, place] of gedStore.places()) {
    logger.write(`${place.count.toString().padStart(4)} [${place.key}]\n`)
    const parts = place.key.split(',')
    if (parts.length) {
        const country = parts[parts.length-1].trim()
        let part = country.toLowerCase()
        if (! Countries.has(part)) {
            console.log(`No country for ${place.key}`)
        }
        if (! countryMap.has(country)) countryMap.set(country, 0)
        let n = countryMap.get(country)
        countryMap.set(country, n+1)
    }
}
logger.end()
console.log('\nUnique Place Names by Country')
for (const [country, count] of countryMap) { console.log(count.toString().padStart(4), country) }
const time2 = new Date()
console.log(`\nWrote ${gedStore.places().size} places file '${placesFile}' in ${(time2-time1)} msec`)
