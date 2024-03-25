import { GedStore } from '../js/GedStore.js'
import { gedJson } from '../../src/lib/data/GedJsonAncestry.js'
import { profile, profileCard } from '../js/profile.js'

const time1 = new Date()
const ged = new GedStore(gedJson)
const cdb = 'CollinDouglasBevins1952'
const wlb = 'WilliamLongfordBevins1815'
// console.log(JSON.stringify(profile(ged, cdb), null, 2))
console.log(profileCard(ged, cdb))
console.log(profileCard(ged, wlb))
let i = 0
ged.persons().forEach((person) => {
    profile(ged, person.keys.name)
    i++
})
const time2 = new Date()
console.log(`\nProdued all ${i} Profiles in ${(time2-time1)} msec`)
