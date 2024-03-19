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
            families: null,
            gedcomFile: null,
            gedrecs: null,
            locations: null,
            people: null,
            places: null,
            readerMessages: [],
            source: 'unknown'
        }
    }

    // Returns reference to a Families instance
    families() { return this._data.families }

    // Returns the name of the original GEDCOM file
    gedcomFile() { return this._data.gedcomFile }

    // Returns reference to a GedcomRecords instance
    gedrecs() { return this._data.gedrecs }

    // Retuns the GedcomReader messages
    readerMessages() { return this._data.readerMessages }

    // Returns reference to a Locations instance
    locations() { return this._data.locations }

    // Returns reference to a People instance
    people() { return this._data.people }

    // Returns reference to a Places instance
    places() { return this._data.places }

    // Returns name of the GEDCOM file source
    source() { return this._data.source }

    async init(gedcomFile) {
        // Step 1 - Read the raw GEDCOM file into a GedcomRecords instance
        this._data.gedcomFile = gedcomFile
        const reader = new GedcomReader()
        const gedrecs = await reader.readFile(this.gedcomFile())

        // THINK ABOUT NOT STORING the GedcomRecords instance so it can be garbage cleaned!
        this._data.gedrecs = gedrecs
        this._data.readerMessages = reader.messages()
        this._data.source = gedrecs.isAncestry() ? 'Accestry.com' : 'Roots Magic'

        // Step 2 - Create Places instance
        this._data.places = new Places()
        
        // Step 3 - Create the People instance
        this._data.people = new People(gedrecs, this.places())
        
        // Step 4 - Create the Families instance
        this._data.families = new Families(gedrecs, this.people(), this.places())

        // Step 5 - Create the Locations instance
        this._data.locations = new Locations(gedrecs)
    }
}