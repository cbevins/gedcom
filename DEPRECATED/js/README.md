# Bevis-Riley Genealogy Web App

## To Do

### Errors
- profile() must not link to unknown parents or spouses

### GedCom
- Sort children and spouse lists and events by date
- Parse for date records like `DATE estimated 1745`
- Add INDI events to JSON data
- Add SOUR [key, text] array to JSON data
- Report PLAC records with unknown or missing country

### Browser App
- Add Note text to the person/explorer Profile
- Add Source text to the person/explorer Profile
- Remove link anchor from unknown persons in the Profile

# gedcom/src/lib/js Files

This folder contains all the javascript code for the genealogy **gedcom** app.  The **gedcom** app offers
additional display, analysis, and exploration options to the
ANcestry and RootsMagic apps.

There are functionally two sets of files that:
- transform an GEDCOM data file produced by Ancestry.com or RootsMagic
into a static JSON object, and
- access and analyze the JSON data to produce person profiles,
family groups, ancestry trees, immigrant lists, countries of origin,
and demographics.

## GEDCOM to JSON Transformation and GEDCOM Integrity

Ancestry.com, RootsMagic, and other genealogy apps often offer the
capability of exporting a family tree to a common file format known
as GEDCOM.  This is an old-style ASCII text record with a well defined
syntax, but which allows allows vendor-specific extensions.

The <code>gedcom/src/lib/scripts</code> node script reads a GEDCOM file
(with a <code>.ged</code> extension), extracts the desired data from its
INDI, FAM, SOURCE, (etc) records, and rewrites them as a large JSON
object containing arrays pf {person}, {family}, and {source} JSON objects.
This object is then written to a *javascript* file like 
<code>gedcom/src/lib/data/GedJsonAncestry.js</code> or other location
where it is referenced by the <code>gedcom</code> browser app.

To create the JSON data javascript file

```bash
# create a new JSON data Javascript file from a GEDCOM file
cd gedcom/src/lib/scripts
node runGedJsonGenerator.js
```

You must first edit the <code>runGedJsonGenerator.js</code> to change
the source GEDCOM file name and the output JSON file name.

Several utility scripts are provided to check the structure and integrity
of the GEDCOM source file:

```bash
# Diplay to console all the command context counts for a GEDCOM source file
node runCommandContexts.js
```

```bash
# Diplay to console GEDCOM source file record counts and node memory usage stats
node runGedcom.js
```

The following files in <code>src/lib/js</code> are required for this process:
- Gedcom.js
- GedRecord.js
- age.js
- parseDate.js
- parsePlace.js
- reports.js

## JSON Data Analysis

The remaining files in <code>src/lib/js</code> are used to analize the JSON data file.

The following scripts in <code>src/lib/scripts</code> demonstrate
how to perform various analyses.  They must all be run from the
<code>src/lib/scripts</code> folder.  They each must be edited if you want to
chnage the JSON file name or the displayed persons or families.

```bash
# Diplay to console a nested list of ancestors for a subject person
node runAncestors.js
```

```bash
# Diplay to console the age at death, number of spouse,
# and number of children by decade for a subject person
node runDemographics.js
```

```bash
# Diplay to console the nationality fraction for a subject person
node runNationality.js
```

```bash
# Diplay to console the number of place records by country
# and writes all unqiue place names and counts to places.txt
node runPlaces.js
```

```bash
# Diplay to console the {profile} JSON data for a subject person
node runProfile.js
```

```bash
# Diplay to console the relationship between 2 subject persons
node runRelated.js
```

----
## JSON data types

----
### {date} JSON Object

```js
const date = {
    text: <string>, // original text from GEDCOM DATE record 
    year: <integer>,
    month: <integer>,
    day: <integer>,
    qual: <string>,
    time: <string>,
    year2: <integer>,
    str: <string>,
    msg: <string>}
```

### {place} JSON Object

```js
const place = {
    text: <string>,
    key: <string>,
    count: <integer>,
    country: <string>,
    state: <string>,
    county: <string>,
    locale: <string>
}
```

### {family} JSON Object

```js
const family = {
    key: famKey,
    xKey: motherNameKey,    // birth mother's person.key.name or '?' if none
    yKey: otherNameKey,     // other parent's person.name.key or '?' if none
    children: [],           // array of person.key.name for all children
    union: {
        date: dateObj,  // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
        notes: [notes],             // array of notes, which may contain newline separators '/n'
        place: placeObj,    // {text:, key:, count:, country:, state:, county:, locale:}
        sources: [sourceKeys]       // array of source keys like '@S1234@'
    }
}
```

### {person} JSON Object

```js
const person = {
    keys: {
        gedcom: gedcomKey,      // GEDCOM INDI record key, like '@I1234@'
        label: personLabel,     // string like 'Collin Douglas Bevins (1952-?)'
        name: nameKey           // string like 'CollinDouglasBevins1952'
    },
    notes: [notes],             // array of notes, which may contain newline separators '/n'
    sources: [sourceKeys]       // array of source keys like '@S1234@'
    name: {
        full: fullName,         // string like 'Collin Douglas Bevins'
        given: givenNames,      // string like 'Collin Douglas'
        name: gedcomName,       // string from GEDCOM NAME record, like 'Collin Douglas /Bevins/'
        nick: nickNames,        // string of comma separated nick names like 'Polly, Slick'
        prefix: namePrefix,     // string like 'Dr'
        suffix: nameSuffix,     // string like 'IV' or 'Jr'
        surname: surNames,      // string like 'Bevins'
        surnamePrefix: surNamePrefix    // string like 'de la' or 'von'
    },
    birth: {
        date: dateObj,          // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
        notes: [notes],         // array of notes, which may contain newline separators '/n'
        place: placeObj,        // {text:, key:, count:, country:, state:, county:, locale:}
        sources: [sourceKeys]   // array of source keys like '@S1234@'
    },
    death: {
        date: dateObj,          // {text:, year:, month:, day:, qual:, time:, year2:, str:, msg:}
        notes: [notes],         // array of notes, which may contain newline separators '/n'
        place: placeObj,        // {text:, key:, count:, country:, state:, county:, locale:}
        sources: [sourceKeys]   // array of source keys
    },
    events: [],
    life: {
        age: [integer],         // [years, months, days]
        gender: string,         // one of 'F' or 'M' or 'U'
        isLiving: boolean,      // boolean TRUE or FALSE
        span: string            // string like '(1815-1888)'
    },
    families: {
        parents: [familyKeys],  // array of FAM '@F123@' keys from GEDCOM FAMC parental records
        spouses: [familyKeys]   // array of FAM '@F123@' keys from GEDCOM FAMS spousal records
    }
}
```

## {profile} JSON Object

The {profile} JSON object repackages the {person} data into a more
text-based format for easier display of person profiles and family groups.

```js
const profile = {
    personKey: subjectKey,      // string like 'CollinDouglasBevins1952'
    nameLine: name,             // string like 'Collin Douglas BEVINS (#1) (1952-?)
    birthLine: birth,           // string like 'Born: on 4 Sep 1952 at Grand Rapids, Itasca, MN, USA'
    birthNotes: [notes],        // notes array
    birthSources: [sources],    // array of source keys
    deathLine: death,           // string like 'Died: Living (currently 71y, 4m, 3d)'
    deathNotes: [notes],        // notes array
    deathSources: [sources],    // array of source keys
    notes: [notes],             // notes array
    sources: [sources],         // array of source keys
    parents: [parentObj],       // array of {parentFamily} JSON objects
    spouses: [spouseObj]        // array of {spouseFamily} JSON object
}
```

The {parentFamily} JSON object defines the family group
of a subject person's parents:

```js
const parentFamily = {
    familyKey: famKey,
    motherKey: family.xKey,
    fatherKey: family.yKey,
    unionLine: unionLine(family),
    unionNotes: family.union.notes,
    unionSources: family.union.sources,
    childKeys: family.children
}
```

The {spouseFamily} JSON object defines the family group
of a subject person's various spouses:

```js
const spouseFamily = {
    familyKey: famKey,
    spouseKey: spouseKey,
    unionLine: unionLine(family),
    unionNotes: family.union.notes,
    unionSources: family.union.sources,
    childKeys: family.children
}
```