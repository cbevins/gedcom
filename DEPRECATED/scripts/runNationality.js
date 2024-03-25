/*
A simple script showing how to determine and display
the subject's ancestral country of origin fractions.
Currently uses the last location segment as the 'origin'.
*/
import { GedStore } from '../js/GedStore.js'
import { gedJson } from '../../src/lib/data/GedJsonAncestry.js'
import { calcNationality, logNationality } from '../js/nationality.js'

const time1 = new Date()
const gedStore = new GedStore(gedJson)
const subjectKey = 'CollinDouglasBevins1952'
const ar = calcNationality(gedStore, subjectKey)
logNationality(ar)
const time2 = new Date()
console.log(`\n${(time2-time1)} msec elapsed time`)
