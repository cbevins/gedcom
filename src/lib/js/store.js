/**
 * This file is used by the SVelte browser app
 */
import { readable, writable } from 'svelte/store'
import { GedStore } from './GedStore.js'
import { gedJson } from '../data/GedJsonAncestry.js'

export const rootNameKey = writable('CollinDouglasBevins1952')
export const subjectNameKey = writable('CollinDouglasBevins1952')
export const ged = readable(null, function start(set) {
	// setup code goes here
	const time1 = new Date()
    let ged = new GedStore(gedJson)
    set(ged)
    
    console.log('lib/js/store.js built GedStore "ged"'
    + ` with ${ged.persons().size} persons in ${new Date()-time1} msec`)
    
    return function stop() {
	    // teardown code goes here
	}
})

// export function getGedStore() {
//     if (!gedStore) {
// 		const time1 = new Date()
//         gedStore = new GedStore(gedJson)
//         console.log('lib/stores/gedstore.js: getGedStore() built singleton gedStore'
//         + ` with ${gedStore.persons().size} persons in ${new Date()-time1} msec`)
//     }
//     return gedStore
// }