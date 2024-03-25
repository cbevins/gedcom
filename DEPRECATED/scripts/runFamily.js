// EXPERIMENTAL
import { GedStore } from '../../src/lib/js/GedStore.js'
import { gedJson } from '../../src/lib/data/GedJsonAncestry.js'
import { Family } from '../../src/lib/js/Family.js'

const gedStore = new GedStore(gedJson)
const family = new Family(gedStore)
const cdb = 'CollinDouglasBevins1952'
family.relate(cdb)
family.paths()
