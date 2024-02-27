// EXPERIMENTAL
import { GedStore } from '../js/GedStore.js'
import { gedJson } from '../data//GedJsonAncestry.js'
import { Family } from '../js/Family.js'

const gedStore = new GedStore(gedJson)
const family = new Family(gedStore)
const cdb = 'CollinDouglasBevins1952'
family.relate(cdb)
family.paths()
