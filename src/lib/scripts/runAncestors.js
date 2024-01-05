import { Ancestors } from '../js/Ancestors.js'
import { GedStore } from '../js/GedStore.js'
import { gedJson } from '../data/GedJsonAncestry.js'

const time1 = new Date()
const gedStore = new GedStore(gedJson)
const cdb = 'CollinDouglasBevins1952'
const anc = new Ancestors(gedStore)
const ancMap = anc.ancestors(cdb)
anc.list()
const time2 = new Date()
console.log(`\n${(time2-time1)} msec elapsed time`)
