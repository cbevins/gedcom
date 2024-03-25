import { GedStore } from '../../src/lib/js/GedStore.js'
import { gedJson } from '../../src/lib/data/GedJsonAncestry.js'
import { demographics } from '../../src/lib/js/demographics.js'

const YEARS = 0
const SPOUSES = 1
const CHILDREN = 2
const time1 = new Date()
const gedStore = new GedStore(gedJson)
const subjectKey = 'CollinDouglasBevins1952'
const dem = demographics(gedStore, subjectKey)
dem.log(YEARS)
dem.log(SPOUSES)
dem.log(CHILDREN)
const time2 = new Date()
console.log(`\n${(time2-time1)} msec elapsed time`)
