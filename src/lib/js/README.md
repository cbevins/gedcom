# gedcom/src/lib/js

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
## JSON data types

- **{person}**
- **{profile}**
- **{family}**
- **{date}**
- **{place}**