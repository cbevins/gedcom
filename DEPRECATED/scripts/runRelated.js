import { GedStore } from '../js/GedStore.js'
import { gedJson } from '../../src/lib/data/GedJsonAncestry.js'
import { relationship } from '../js/relationship.js'

const time1 = new Date()
const subjectKey = 'CollinDouglasBevins1952'
const otherKey = 'WilliamCollinsBevins1931'
const gedStore = new GedStore(gedJson)
const log = true
const rel = relationship(gedStore, subjectKey, otherKey, log)
console.log(rel)
const time2 = new Date()
console.log(`\n${(time2-time1)} msec elapsed time`)
