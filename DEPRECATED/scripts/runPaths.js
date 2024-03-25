// EXPERIMENTAL
import { GedStore } from '../../src/lib/js/GedStore.js'
import { gedJson } from '../../src/lib/data/GedJsonAncestry.js'
import { Relate } from '../../src/lib/js/Relate.js'

const ged = new GedStore(gedJson)
const rel = new Relate(ged)
const cdb = 'CollinDouglasBevins1952'
rel.step(cdb, ['x'])
// rel.relate(cdb)
// const map = rel.map()
// for(const [key, paths] of map.entries()) {
//     console.log(key, paths)
// }
// console.log('AliceKnightHodge1861', map.get('AliceKnightHodge1861'))
// console.log('WilliamLongfordBevins1815', map.get('WilliamLongfordBevins1815'))
// console.log('MarkWilliamBevins1956', map.get('MarkWilliamBevins1956'))
// console.log(map.size)
