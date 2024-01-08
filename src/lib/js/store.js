/**
 * This file is only used by the Svelte browser app
 */
import { readable, writable } from 'svelte/store'
import { GedStore } from './GedStore.js'
import { gedJson } from '../data/GedJsonAncestry.js'

export const rootNameKey = writable('CollinDouglasBevins1952')

export const subjectNameKey = writable('CollinDouglasBevins1952')

export const ged = readable(null, function start(set) {
	// setup code goes here
	const time1 = new Date()
    const g = new GedStore(gedJson)
    set(g)
    console.log('lib/js/store.js built GedStore "ged"'
    + ` with ${g.persons().size} persons in ${new Date()-time1} msec`)
    
    // teardown code goes in the stop() function
    return function stop() {}
})
