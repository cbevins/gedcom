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
    let ged = new GedStore(gedJson)
    // Add the {key:, label:} objects used by person selectors
    const options = []
    ged.persons().forEach (function(value, key) {
        options.push({key: key, label: value.keys.label})
    })
    ged.setKeyLabels(options)
    // Set the GedStore and the store
    set(ged)
    
    console.log('lib/js/store.js built GedStore "ged"'
    + ` with ${ged.persons().size} persons in ${new Date()-time1} msec`)
    
    return function stop() {
	    // teardown code goes here
	}
})
