/**
 * Reads a GEDCOM file using the Node environment's 'fs' and 'readline' modules
 * 
 * To read a GEDCOM file and convert it to a plain old JSON object:
 *      const gedcom = new Gedcom()
 *      await gedcom.readFile(fileName)
 * 
 * To write the plain old JSON object to a file that can  be
 * transported across the network (server to client)
 * and subsequently used to hydrate a GedStore instance:
 *      fs.writeFile(outputFileName, gedcom.toJsonFile(2), errorFn)
 * 
 * To create a GedStore instance directly from the GEDCOM file:
 *      const gedStore = new GedStore(gedcom.toJson())
 * 
 * For examples, see the cripts:
 * ../scripts/runGedcom.js
 * ../scripts.runGedJsonGenerator.js
 */

/**
 * TO DO List
 * 1 - Reconcile FAM-MARR and INDI-MARR
 * 2 - Include INDI events in the JSON object
 * 3 - Include SOUR Map() in the JSON object
*/

import fs from 'fs'
import readline from 'readline'
import { age } from './age.js'
import { GedRecord } from './GedRecord.js'
import { parseDate } from './parseDate.js'
import { parsePlace } from './parsePlace.js'

export class Gedcom {
    constructor() {
        this._initFileReader()
        this._initRecordStore()
    }

    _addBlock(head) {
        const cmd = head.command()
        const key = head.content()
        if (cmd === 'INDI') {
            this._indi.set(key, head)
            // console.log(`${this._indi.size} ${key} ${cmd}`)
        } else if (cmd === 'FAM') {
            this._fam.set(key, head)
        } else if (cmd === 'OBJE') {
            this._obje.set(key, head)
        } else if (cmd === 'SOUR') {
            this._sour.set(key, head)
        } else if (cmd === '_MTTAG') {
            this._mttag.set(key, head)
        } else if (cmd === '_PLAC') {
            this._plac.set(key, head)
        } else if (cmd === '_EVDEF') {
            this._evdef.set(key, head)
        } else if (cmd === 'SUBM') {
            this._subm.set(key, head)
        } else if (cmd === 'HEAD') {
            this._head = head
        } else if (cmd === 'REPO') {
            this._repo.set(key, head)
        } else {
            this._msg(`Line ${head.lineNo()}: unhandled level 0 command ${head.context()}`)
        }
        return this
    }

    // Attempts to parse and standardize place keys and names, and store them in a Map()
    // Returns the {place:} data object reference
    // pkey and event are optional for reporting where the place need fixing
    _addPlace(text, pkey=null, event='') {
        let place = parsePlace(text, pkey, event) // returns {text:, key:, count:, country:, state:, county:, locale:}
        // console.log(pkey, event, ':', place.text)
        if (! this._plac.has(place.key)) {
            this._plac.set(place.key, place)
        }
        place = this._plac.get(place.key)
        place.count++
        return place
    }

    _initFileReader() {
        this._maxlevel = 0
        this._head = null // head Record for a 0-level Record block
        // Current line info
        this._lineNo = 0
        this._row = null
        this._cols = []
        this._level = 0
        this._command = null
        this._curr = null // reference to the current Record
        this._lines = []
        // Diagnostics
        this._diag = new Map()
        this._dupKeys = new Map()
    }

    _initRecordStore() {
        this._fam = new Map()   // Map of GEDCOM FAMC/FAMS '@F123@' => {family:} data objects
        this._indi = new Map()  // Map of GEDCOM INDI '@I123@' => {person:} data objects
        this._head = null
        // Ancestry only
        this._mttag = new Map()
        this._obje = new Map()
        this._repo = new Map()
        this._sour = new Map()
        this._subm = new Map()
        // RootsMagic only
        this._plac = new Map()  // Map of GEDCOM PLAC string content to {place:} data objects
        this._evdef = new Map()
        // Array of error and warning messages accessing the GEDCOM file records
        this._messages = []
        // Array of [oldIndi, newIndi, label, name] INDI duplicates
        this._indiDups = []
        // Maps Person.name().label() to INDI '@Innn@' key strings
        this._labelMap = new Map()
        // Maps Person.nameKey() to INDI '@Innn@' key strings
        this._nameMap = new Map()
    }

    // Stores a GEDCOM file error or warning message
    _msg(text) {
        this._messages.push(text)
        throw new Error(text)
    }

    _parseRecord(row) {
        this._lineNo++
        this._row = row
        this._cols = row.split(' ')
        this._level = Number(this._cols[0])
        if (this._level > this._maxlevel)
            this._maxlevel = this._level
        // GEDCOM has 11 Level 0 records that start of a block definition
        // '0 HEAD' for both Ancestry and RootsMagic
        // '0 @SUBM1@ SUBM' Ancestry only
        // '0 @I292505355536@ INDI' Ancestry or '0 @I1@ INDI' RootsMagic
        // '0 @F1@ FAM' for both Ancestry and RootsMagic
        // '0 @O1@ OBJE' Ancestry only
        // '0 @S1049043527@ SOUR' Ancestry or '0 @S1@ SOUR' RootsMagic
        // '0 @R955570779@ REPO' Ancestry or '0 @R1@ REPO' RootsMagic
        // '0 @T24@ _MTTAG' Ancestry only for MyTreeTags
        // '0 _PLAC , , , Ireland' RootsMagic only for place name geocodes
        // '0 _EVDEF <eventTag>' RootsMagic only
        // '0 TRLR' for both Ancestry and RootsMagic
        if (this._level === 0) { 
            // Determine which record field has the command (see above comments)
            this._command = ['HEAD', 'TRLR', '_PLAC', '_EVDEF'].includes(this._cols[1])
                ? this._cols[1] : this._cols[2]
            // If starting a new Level 0 Block, process the old block
            if (this._command !== 'HEAD') {
                this._addBlock(this._head)
            }
            // Start a new block head; determine which arg is the content (usually a key)
            this._content = ['_PLAC', '_EVDEF'].includes(this._command) ? this._cols[2] : this._cols[1]
            this._head = new GedRecord(null, this._lineNo, this._level, this._command, this._content)
            this._curr = this._head
        } else {
            this._command = this._cols[1]
            this._content = this._row.slice(3+this._command.length)
            // if moving to a deeper level ...
            if (this._level > this._curr.level()) {
                // If 'CONC' or 'CONT', add content to the current record
                if (this._command === 'CONC') {
                    this._curr._content += this._content
                } else if (this._command === 'CONT') {
                    this._curr._content += '/n' + this._content
                // else this is a new record
                } else {
                    const record = new GedRecord(this._curr, this._lineNo, this._level, this._command, this._content)
                    this._curr.addRecord(record)
                    this._curr = record // make the new GedRecord the current parent
                }
            // else moving back up one or more levels
            } else {
                // climb back up to the parent of current level
                while(this._curr._level >= this._level) {
                    this._curr = this._curr._parent
                }
                // create a new record with this._curr as its parent
                const record = new GedRecord(this._curr, this._lineNo, this._level, this._command, this._content)
                this._curr.addRecord(record) // add the new record to the parent children
                this._curr = record // make this the current parent
            }
        }
    }

    async readFile(fileName, onCloseCallback=null) {
        this._initFileReader()
        this._initRecordStore()
        const stream = fs.createReadStream(fileName)
        const reader = readline.createInterface({ input: stream })
        reader.on('error', (err) => {
            throw new Error(`Unable to read GEDCOM file '${fileName}': ${err}`)
        })
        reader.on('close', () => { if (onCloseCallback) onCloseCallback(this) })
        // IMPORTANT!!! MUST USE FOLLOWING INSTEAD OF 'reader.on("line")' TO GET PROPER AWAIT
        for await (const line of reader) { this._parseRecord(line) }
    }

    //--------------------------------------------------------------------------
    // GEDCOM data *content* access methods
    //--------------------------------------------------------------------------

    // Return the GedRecord (and its subrecords) matching the 'key', or NULL
    fam(key) { return this._fam.has(key) ? this._fam.get(key) : null }
    indi(key) { return this._indi.has(key) ? this._indi.get(key) : null }
    sour(key) { return this._sour.has(key) ? this._sour.get(key) : null }

    // _all() is an access method that returns an *Array* of ALL GedRecord *content*
    // with 'key' that match the command context array (z.B. ['INDI', 'NAME', 'SURN'])
    _all(key, context) {
        let map = null
        let cmd = context[0].toUpperCase()
        if (cmd === 'INDI') map = this._indi
        else if (cmd === 'FAM') map = this._fam
        else if (cmd === 'OBJE') map = this._obje
        else if (cmd === 'SOUR') map = this._sour
        else if (cmd === '_MTTAG') map = this._mttag
        else if (cmd === '_PLAC') map = this._plac
        else if (cmd === '_EVDEF') map = this._evdef
        else if (cmd === 'SUBM') map = this._subm
        else if (cmd === 'HEAD') map = this._head
        else if (cmd === 'REPO') map = this._repo
        else throw new Error(`Gedcom.find('${key}', '${cmd}' is invalid Level 0 context`)

        const found = []
        if (map.has(key)) {
            const head = map.get(key)
            // console.log(`Key ${key} found with ${head.records().length} records`)
            this._allRecurse(head, context, 1, found)
        }
        // console.log(`Found ${found.length}`)
        return found
    }

    // Recursive search
    _allRecurse(head, context, lvl, found) {
        for(let i=0; i<head.records().length; i++) {
            const rec = head.record(i)
            const cmd = rec.command()
            if (cmd === context[lvl]) {
                // console.log(`Level ${lvl} found ${context[lvl]}`)
                if (lvl+1 < context.length) {
                    this._allRecurse(rec, context, lvl+1, found)
                } else {
                    // console.log(`Level ${lvl} push ${cmd}`)
                    found.push(rec.content()) // must check for CONC and CONT
                }
            }
        }
    }

    // _first() is an access method that returns a *string* containing either:
    // *content* of the FIRST GEDCOM record with 'key'
    // matching the context array (z.B. ['INDI', 'NAME', 'SURN'])
    // or a designated missing value if no such record is found
    _first(key, context, missing='') {
        const found = this._all(key, context)
        return found.length ? found[0] : missing
    }

    _year(dateText, missing='?') {
        const date = parseDate(dateText)
        return date.year ? date.year : missing
    }

    // INDI
    indiNote(key) { return this._first(key, ['INDI', 'NOTE']) }
    indiNoteAll(key) { return this._all(key, ['INDI', 'NOTE']) }
    indiSource(key) { return this._first(key, ['INDI', 'SOUR']) }
    indiSourceAll(key) { return this._all(key, ['INDI', 'SOUR']) }

    // INDI-BIRT
    birthDate(key) { return this._first(key, ['INDI', 'BIRT', 'DATE']) }
    birthDateAll(key) { return this._all(key, ['INDI', 'BIRT', 'DATE']) }
    birthNote(key) { return this._first(key, ['INDI', 'BIRT', 'NOTE']) }
    birthNoteAll(key) { return this._all(key, ['INDI', 'BIRT', 'NOTE']) }
    birthPlace(key) { return this._first(key, ['INDI', 'BIRT', 'PLAC']) }
    birthPlaceAll(key) { return this._all(key, ['INDI', 'BIRT', 'PLAC']) }
    birthSource(key) { return this._first(key, ['INDI', 'BIRT', 'SOUR']) }
    birthSourceAll(key) { return this._all(key, ['INDI', 'BIRT', 'SOUR']) }
    birthYear(key, missing='?') { return this._year(this.birthDate(key), missing) }

    // INDI-DEAT
    deathDate(key) { return this._first(key, ['INDI', 'DEAT', 'DATE']) }
    deathDateAll(key) { return this._all(key, ['INDI', 'DEAT', 'DATE']) }
    deathNote(key) { return this._first(key, ['INDI', 'DEAT', 'NOTE']) }
    deathNoteAll(key) { return this._all(key, ['INDI', 'DEAT', 'NOTE']) }
    deathPlace(key) { return this._first(key, ['INDI', 'DEAT', 'PLAC']) }
    deathPlaceAll(key) { return this._all(key, ['INDI', 'DEAT', 'PLAC']) }
    deathSource(key) { return this._first(key, ['INDI', 'DEAT', 'SOUR']) }
    deathSourceAll(key) { return this._all(key, ['INDI', 'DEAT', 'SOUR']) }
    deathYear(key, missing='?') { return this._year(this.deathDate(key), missing) }

    // INDI-MARR
    marriageDate(key) { return this._first(key, ['INDI', 'MARR', 'DATE']) }
    marriageDateAll(key) { return this._all(key, ['INDI', 'MARR', 'DATE']) }
    marriageNote(key) { return this._first(key, ['INDI', 'MARR', 'NOTE']) }
    marriageNoteAll(key) { return this._all(key, ['INDI', 'MARR', 'NOTE']) }
    marriagePlace(key) { return this._first(key, ['INDI', 'MARR', 'PLAC']) }
    marriagePlaceAll(key) { return this._all(key, ['INDI', 'MARR', 'PLAC']) }
    marriageSource(key) { return this._first(key, ['INDI', 'MARR', 'SOUR']) }
    marriageSourceAll(key) { return this._all(key, ['INDI', 'MARR', 'SOUR']) }
    marriageYear(key, missing='?') { return this._year(this.deathDate(key), missing) }

    // Family - these all return GEDCOM FAM keys like '@F12@' (singular or arrays)
    parentalFamilyKeys(subjectKey) { return this._all(subjectKey, ['INDI', 'FAMC'])}
    spousalFamilyKeys(subjectKey) { return this._all(subjectKey, ['INDI', 'FAMS'])}
    familyXKey(famKey) { return this._first(famKey, ['FAM', 'WIFE'])}
    familyYKey(famKey) { return this._first(famKey, ['FAM', 'HUSB'])}
    familyChildrenKeys(famKey) { return this._all(famKey, ['FAM', 'CHIL'])}
    familyUnionDate(key) { return this._first(key, ['FAM', 'MARR', 'DATE']) }
    familyUnionDateAll(key) { return this._all(key, ['FAM', 'MARR', 'DATE']) }
    familyUnionNote(key) { return this._first(key, ['FAM', 'NOTE']) }
    familyUnionNoteAll(key) { return this._all(key, ['FAM', 'NOTE']) }
    familyUnionPlace(key) { return this._first(key, ['FAM', 'MARR', 'PLAC']) }
    familyUnionPlaceAll(key) { return this._all(key, ['FAM', 'MARR', 'PLAC']) }
    familyUnionSource(key) { return this._first(key, ['FAM', 'SOUR']) }
    familyUnionSourceAll(key) { return this._all(key, ['FAM', 'SOUR']) }

    // Life
    gender(key) { return this._first(key, ['INDI', 'SEX']) }
    isLiving(key) { return this.lifeStatus(key, true, false) }
    lifeSpan(key, missing) { return `(${this.birthYear(key, missing)}-${this.deathYear(key, missing)})` }
    lifeStatus(key, alive='Alive', deceased='Deceased') {
        if (this.deathYear(key, '?') !== '?') return deceased
        const birth = this.birthYear(key, '?')
        if (birth !== '?') if (new Date().getFullYear() - birth > 110 ) return deceased
        return alive
    }

    // Names
    fullName(key) {
        const name = []
        const npfx = this.namePrefix(key)
        const givn = this.givenNames(key)
        const nick = this.nickNames(key)
        const spfx = this.surNamePrefix(key)
        const surn = this.surNames(key)
        const nsfx = this.nameSuffix(key)
        
        if (npfx !== '') name.push(npfx)
        if (givn !== '') name.push(givn)
        if (nick !== '') name.push('"' + nick + '"')
        if (spfx !== '') name.push(spfx)
        if (surn !== '') name.push(surn.toUpperCase())
        if (nsfx !== '') name.push(nsfx)
        return name.join(' ')
    }
    givenNames(key) { return this._first(key, ['INDI', 'NAME', 'GIVN']) }
    givenNamesAll(key) { return this._all(key, ['INDI', 'NAME', 'GIVN']) }
    name(key) { return this._first(key, ['INDI', 'NAME']) }
    nameAll(key) { return this._all(key, ['INDI', 'NAME']) }
    // Returns the name as a key like 'CollinDouglasBevins'
    nameKey(key) { return (this.givenNames(key) + this.surNames(key)).replace(/\s/g,'') + this.birthYear(key) }
    // Returns the name as a key like 'Collin Douglas Bevins (#1) (1952-?)'
    nameLabel(key) { return this.fullName(key) + ' ' + this.lifeSpan(key) }
    namePrefix(key) { return this._first(key, ['INDI', 'NAME', 'NPFX']) }
    namePrefixAll(key) { return this._all(key, ['INDI', 'NAME', 'NPFX']) }
    nameSuffix(key) { return this._first(key, ['INDI', 'NAME', 'NSFX']) }
    nameSuffixAll(key) { return this._all(key, ['INDI', 'NAME', 'NSFX']) }
    nickNames(key) { return this._first(key, ['INDI', 'NAME', 'NICK']) }
    nickNamesAll(key) { return this._all(key, ['INDI', 'NAME', 'NICK']) }
    surNames(key) { return this._first(key, ['INDI', 'NAME', 'SURN']) }
    surNamesAll(key) { return this._all(key, ['INDI', 'NAME', 'SURN']) }
    surNamePrefix(key) { return this._first(key, ['INDI', 'NAME', 'SPFX']) }
    surNamePrefixAll(key) { return this._all(key, ['INDI', 'NAME', 'SPFX']) }

    // Creates and returns a {person:} data object from the GEDCOM INDI record block
    // 'key' is the GEDCOM INDI key like '@I123@'
    jsonIndi(key) {
        // NULL always means unprocessed
        const label = this.nameLabel(key)
        let data = {
            keys: {
                gedcom: key,    // GEDCOM INDI record key, like '@I1234@'
                label: this.nameLabel(key), // string like 'Collin Douglas Bevins (1952-?)'
                name: this.nameKey(key) // string like 'CollinDouglasBevins1952'
            },
            notes: this.indiNoteAll(key), // array of notes, which may contain newline separators '/n'
            sources: this.indiSourceAll(key),   // array of source keys
            name: {
                full: this.fullName(key),
                given: this.givenNames(key),
                name: this.name(key),                   // string from GEDCOM NAME record, like 'Collin Douglas /Bevins/'
                nick: this.nickNames(key),
                prefix: this.namePrefix(key),
                suffix: this.nameSuffix(key),
                surname: this.surNames(key),
                surnamePrefix: this.surNamePrefix(key),
            },
            birth: {
                date: parseDate(this.birthDate(key)),   // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
                notes: this.birthNoteAll(key),          // array of notes, which may contain newline separators '/n'
                place: this._addPlace(this.birthPlace(key), label, 'birth'), // {text:, key:, count:, country:, state:, county:, locale:}
                sources: this.birthSourceAll(key)       // array of sources keys like '@S1234@'
            },
            death: {
                date: parseDate(this.deathDate(key)),   // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
                notes: this.deathNoteAll(key),          // array of notes, which may contain newline separators '/n'
                place: this._addPlace(this.deathPlace(key), label, 'death'), // {text:, key:, count:, country:, state:, county:, locale:}
                sources: this.deathSourceAll(key)       // array of sources keys like '@S1234@'
            },
            events: [],
            life: {
                age: null,                      // [years, months, days], calculated later
                gender: this.gender(key),       // string 'F' or 'M'
                isLiving: this.isLiving(key),   // boolean TRUE or FALSE
                span: this.lifeSpan(key)        // string like '(1815-1888)'
            },
            families: {
                // array of subject's parental FAMC and spousal FAMS GEDCOM famKeys like ['@F123@']
                parents: this.parentalFamilyKeys(key),  // array of FAM '@F123@' keys
                spouses: this.spousalFamilyKeys(key),   // array of FAM '@F123@' keys
            }
        }
        let a = age(data.birth.date, (data.life.isLiving ? null : data.death.date))
        if (a[0]<0 || a[0] === null) a[0] = 0
        if (a[1]<0 || a[1] === null) a[1] = 0
        if (a[2]<0 || a[2] === null) a[2] = 0
        data.life.age = a
        data.death.date.str = data.life.isLiving ? 'Living' : data.death.date.str
        return data
    }

    // Creates and returns an array of all the GEDCOM [nameKey, jasonIndi] arrays
    // 'nameKey' is a GEDCOM INDI key like '@I123@'
    // Return value may be used like: const map = new Map(gedcom.jsonIndiArray())
    jsonIndiArray() {
        const ar = []
        let n = 0
        let nDups = 0
        for (const key of this._indi.keys()) { // 'key' is a GEDCOM INDI key like '@I123@'
            n++
            const indi = this.jsonIndi(key)
            // Returns number of duplicates for this key
            const dups = this.checkDuplicateKey(indi)
            if (dups) {
                const suffix = `(Copy${dups})`
                indi.keys.label += ` ${suffix})`
                indi.keys.name += `${suffix}`
                nDups++
            }
            ar.push([indi.keys.name, indi])
        }
        console.log(`${n} INDI records, ${nDups} apparent duplicates`)
        this.reportDuplicateKeys()
        return ar
    }
    // Check for INDI with duplicate keys
    checkDuplicateKey(indi) {
        let n = 0
        if (this._dupKeys.has(indi.keys.name)) {
            const gedKeys = this._dupKeys.get(indi.keys.name)
            gedKeys.push(indi.keys.gedcom)
            this._dupKeys.set(indi.keys.name, gedKeys)
            n = gedKeys.length
            // console.log(`Duplicate indi.keys.name for ${indi.keys.name} (${indi.keys.gedcom}) in [${gedKeys}]`)
        } else {
            this._dupKeys.set(indi.keys.name, [indi.keys.gedcom])
        }
        return n
    }
    addDiagnostic(indi, type, text) {
        if (! this._diag.has(indi.keys.name)) this._diag.set(indi.keys.name)
    }
    reportDuplicateKeys() {
        console.log('\nDuplicate Keys:')
        for (const [key, gedKeys] of this._dupKeys.entries()) {
            if (gedKeys.length > 1)
                console.log(key, gedKeys)
        }
    }
    // Creates and returns a {family:} data object from the GEDCOM FAMC/FAMS
    // 'famKey' is the GEDCOM FAMC/FAMS key, like '@F123@'
    jsonFam(famKey) {
        const label = this.nameKey(this.familyXKey(famKey))
        const data = {
            key: famKey,
            xKey: this.nameKey(this.familyXKey(famKey)),    // '?' if none
            yKey: this.nameKey(this.familyYKey(famKey)),    // '?' if none
            children: [],   // = nameKey(child[i].keys.gedcom)
            union: {
                date: parseDate(this.familyUnionDate(famKey)), // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
                notes: this.familyUnionNoteAll(famKey), // array of notes, which may contain newline separators '/n'
                place: this._addPlace(this.familyUnionPlace(famKey), label, 'union'), // {text:, key:, count:, country:, state:, county:, locale:}
                sources: this.familyUnionSourceAll(famKey)  // array of sources, which may contain newline separators '/n'
            }
        }
        this.familyChildrenKeys(famKey).forEach((childKey) => {
            data.children.push(this.nameKey(childKey))
        })
        return data
    }

    // Creates and returns an array of all the GEDCOM [famKey, {jsonFam}] arrays
    // famKey is like '@F123@'
    // Return value may be used like: const map = new Map(gedcom.jsonFamArray())
    jsonFamArray() {
        const ar = []
        const dups = new Map()
        let ids = []
        for (const key of this._fam.keys()) { // 'key' is a GEDCOM FAM key like '@F123@'
            const json = this.jsonFam(key)
            const unionKey = json.xKey + '&' + json.yKey
            ids = []
            if (dups.has(unionKey)) {
                ids = dups.get(unionKey)
                // key += `Copy${n+1}`
                console.log(`Duplicate union keys for ${unionKey} (${json.key}) in families [${ids}]`)
            }
            ids.push(json.key)
            dups.set(unionKey, ids)
            ar.push([key, json])
        }
        return ar
    }
    // Returns a plain old JSON object with all the GEDCOM data of interest
    // embedded inside a Javascript declaration
    toJsonFile(indent=0, varName='gedJson') {
        const indiArr = this.jsonIndiArray()
        const famArr = this.jsonFamArray()
        let text = `// auto-generated by runGedJsonGenerator.js on ${new Date().toLocaleString()}\n`
        text += `export const ${varName} = {\n`
        text += `person: ${JSON.stringify(indiArr, null, indent)},\n`
        text += `family: ${JSON.stringify(famArr, null, indent)},\n`
        text += `places: ${JSON.stringify(Array.from(this._plac), null, indent)}\n`
        text += '}'
        return text
    }
    // Returns a plain old JSON object with all the GEDCOM data of interest
    toJson() {
        const indiArr = this.jsonIndiArray()
        const famArr = this.jsonFamArray()
        const json = {
            person: indiArr,
            family: famArr,
            places: Array.from(this._plac)
        }
        return json
    }
}