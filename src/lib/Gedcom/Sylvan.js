/**
 */
import * as process from 'process'
import { GedcomReader } from './GedcomReader.js'
import { Locations } from './Locations.js'
import { Families } from './Families.js'
import { People } from './People.js'
import { Places } from './Places.js'
import { Review } from './Review.js'

export class Sylvan {
    constructor() {
        this._data = {
            families: null,     // Families reference
            gedcom: {
                contexts: null, // Array of [context, count] arrays sorted by context
                fileName: null,
                gedrecs: null,  // GedcomRecords instance
                level0: null,   // Array of [type0, count] arrays of all Level 0 record types
            },
            locations: null,    // Locations reference
            messages: {
                multipleFathers: [],    // Array of Persons with more than 1 father
                multipleMothers: [],    // Array of Persons with more than 1 mother
                reader: [],             // Array of GedcomReader messages
            },
            people: null,       // People reference
            places: null,       // Places reference
            source: 'unknown'   // GEDCOM file source
        }
    }

    // Returns an array of [context, count] arrays sorted by context
    contexts() { return this._data.gedcom.contexts }

    // Returns reference to a Families instance
    families() { return this._data.families }

    // Returns the name of the original GEDCOM file
    gedcomFile() { return this._data.gedcom.fileName }

    // Returns reference to a GedcomRecords instance
    gedrecs() { return this._data.gedcom.gedrecs }

    // Retuns the GedcomReader messages
    readerMessages() { return this._data.messages.reader }

    // Returns reference to a Locations instance
    locations() { return this._data.locations }

    // Returns reference to a People instance
    people() { return this._data.people }

    // Returns reference to a Places instance
    places() { return this._data.places }

    // Returns name of the GEDCOM file source
    source() { return this._data.source }

    // Returns array of [type0, count] arrays of all Level 0 record types
    topLevelRecords() { return this._data.gedcom.level0 }

    // Returns an array of Persons with more than 1 father
    multipleFathers() { return this._data.messages.multipleFathers }
    
    // Returns an array of Persons with more than 1 mother
    multipleMothers() { return this._data.messages.multipleMothers }

    async init(gedcomFile, store=false) {
        // Step 1 - Read the raw GEDCOM file into a GedcomRecords instance
        this._data.gedcom.fileName = gedcomFile
        const reader = new GedcomReader()
        const gedrecs = await reader.readFile(this.gedcomFile())

        // Store stats
        this._data.messages.reader = reader.messages()
        this._data.source = gedrecs.isAncestry() ? 'Accestry.com' : 'Roots Magic'
        this._data.gedcom.level0 = gedrecs.topLevelCounts()
        this._data.gedcom.contexts = gedrecs.contexts()

        // DO NOT STORE the GedcomRecords instance so it can be garbage collected!
        if (store) this._data.gedcom.gedrecs = gedrecs

        // Step 2 - Create Places instance
        this._data.places = new Places()
        
        // Step 3 - Create the People instance
        this._data.people = new People(gedrecs, this.places())
        
        // Step 4 - Create the Families instance
        this._data.families = new Families(gedrecs, this.people(), this.places())

        // Step 5 - Create the Locations instance
        this._data.locations = new Locations(gedrecs)

        // Step 6 - Perform review and store messages
        const review = new Review(this.people(), this.families(), this.places(), this.locations())
        this._data.messages.multipleMothers = review.multipleMothers()
        this._data.messages.multipleFathers = review.multipleFathers()
    }
}