import { describe, it, expect } from 'vitest'
import { Gedcom } from './Gedcom.js'
import { age } from './age.js'
import { parseDate } from './parseDate.js'
import { parsePlace } from './parsePlace.js'

const fileName = "./src/lib/data/AncestryTest.ged"
const aabKey = '@I292538955709@'    // Aaron Bevins
const cdbKey = '@I292505355536@'    // Collin Douglas Bevins (#1)
const wcbKey = '@I292505358890@'    // William Collins Bevins (#2)
const sxbKey = '@I292505359674@'    // Samuel Bevins (#4)
const wabKey = '@I292505365983@'    // William Alfred Bevins (#8)
const wlbKey = '@I292505366205@'    // William Longford Bevins (#16)
const mwbKey = '@I292512938981@'    // Mark William Bevins
const mmhKey = '@I292505357456@'    // Meartia Margaret Heddens (#2)
const kmbKey = '@I292512938979@'    // Karen Margaret Bevins
const llbKey = '@I292512938980@'    // Laura Lee Bevins
const bbbKey = '@I292506344534@'    // Baby Boy Bevins

describe('Gedcom class generates a GedJson<*>.js file from a GEDCOM.ged file', () => {
    let gedcom = new Gedcom()
	it('awaits the GEDCOM file reader to load async', async () => {
        await gedcom.readFile(fileName)
        expect(gedcom._indi.size).toBeGreaterThanOrEqual(787)
    })
	it('_indi Map has the cdbKey but not a junk key', () => {
        expect(gedcom._indi.has(cdbKey)).toBe(true)
        expect(gedcom._indi.has('junk')).toBe(false)
    })
	it('_all() locates all INDI-NAME-GIVN and INDI-NAME-SOUR GedRecords', () => {
        expect(gedcom._all(cdbKey, ['INDI', 'NAME', 'GIVN'])).toStrictEqual(['Collin Douglas'])
        expect(gedcom._all(cdbKey, ['INDI', 'NAME', 'SOUR']).length).toBe(12)
    })
	it('NAME subrecord access methods work as expected', () => {
        expect(gedcom.name(cdbKey)).toBe('Collin Douglas /Bevins/ (#1)')
        expect(gedcom.nameAll(cdbKey).length).toBe(1)
        expect(gedcom.nameAll(cdbKey)[0]).toBe('Collin Douglas /Bevins/ (#1)')

        expect(gedcom.givenNames(cdbKey)).toBe('Collin Douglas')
        expect(gedcom.givenNamesAll(cdbKey).length).toBe(1)
        expect(gedcom.givenNamesAll(cdbKey)[0]).toBe('Collin Douglas')

        expect(gedcom.surNames(cdbKey)).toBe('Bevins')
        expect(gedcom.surNamesAll(cdbKey).length).toBe(1)
        expect(gedcom.surNamesAll(cdbKey)[0]).toBe('Bevins')

        expect(gedcom.nickNames(cdbKey)).toBe('')
        expect(gedcom.nickNamesAll(cdbKey).length).toBe(0)

        expect(gedcom.namePrefix(cdbKey)).toBe('')
        expect(gedcom.namePrefixAll(cdbKey).length).toBe(0)

        expect(gedcom.surNamePrefix(cdbKey)).toBe('')
        expect(gedcom.surNamePrefixAll(cdbKey).length).toBe(0)

        expect(gedcom.fullName(cdbKey)).toBe('Collin Douglas BEVINS (#1)')
        expect(gedcom.nameKey(cdbKey)).toBe('CollinDouglasBevins1952')
        expect(gedcom.nameLabel(cdbKey)).toBe('Collin Douglas BEVINS (#1) (1952-?)')
        expect(gedcom.nameLabel(wlbKey)).toBe('William Longford BEVINS (#16) (1815-1889)')
    })
    it('BIRT record access methods', () => {
        expect(gedcom.birthDate(cdbKey)).toBe('4 Sep 1952')
        expect(gedcom.birthDateAll(cdbKey).length).toBe(1)
        expect(gedcom.birthDateAll(cdbKey)[0]).toBe('4 Sep 1952')

        expect(gedcom.birthYear(cdbKey)).toBe(1952)
        expect(gedcom.birthYear(wlbKey)).toBe(1815)

        expect(gedcom.birthNote(cdbKey)).toBe('Birth note 1')
        expect(gedcom.birthNoteAll(cdbKey).length).toBe(2)
        expect(gedcom.birthNoteAll(cdbKey)[0]).toBe('Birth note 1')
        expect(gedcom.birthNoteAll(cdbKey)[1])
            .toBe('Birth note 2 Line 1/nBirth note 2 Line 2...more of birth note line 2')
        
        expect(gedcom.birthPlace(cdbKey)).toBe('Grand Rapids, Itasca, MN, USA')
        expect(gedcom.birthPlaceAll(cdbKey).length).toBe(1)
        expect(gedcom.birthPlaceAll(cdbKey)[0]).toBe('Grand Rapids, Itasca, MN, USA')

        expect(gedcom.birthSource(cdbKey).substr(0,2)).toBe('@S')
        expect(gedcom.birthSourceAll(cdbKey).length).toBe(8)
        expect(gedcom.birthSourceAll(cdbKey)[0].substr(0,2)).toBe('@S')
    })
    it('DEAT record access methods', () => {
        expect(gedcom.deathDate(cdbKey)).toBe('')
        expect(gedcom.deathDateAll(cdbKey).length).toBe(0)

        expect(gedcom.deathYear(cdbKey)).toBe('?')
        expect(gedcom.deathYear(cdbKey, 'Not Dead Yet')).toBe('Not Dead Yet')
        expect(gedcom.deathYear(wlbKey)).toBe(1889)

        expect(gedcom.birthDate(wlbKey)).toBe('04 Mar 1815')
        expect(gedcom.birthDateAll(wlbKey)[0]).toBe('04 Mar 1815')

        expect(gedcom.deathDate(wlbKey)).toBe('17 Jun 1889')
        expect(gedcom.deathDateAll(wlbKey)[0]).toBe('17 Jun 1889')

        expect(gedcom.deathNote(wlbKey)).toBe('')
        expect(gedcom.deathNoteAll(wlbKey).length).toBe(0)

        expect(gedcom.deathPlace(cdbKey)).toBe('')
        expect(gedcom.deathPlace(wlbKey)).toBe('Annawan, Henry, Illinois, USA')
        expect(gedcom.deathPlaceAll(wlbKey)[0]).toBe('Annawan, Henry, Illinois, USA')

        expect(gedcom.deathSource(wlbKey).substr(0,2)).toBe('')
        expect(gedcom.deathSourceAll(wlbKey).length).toBe(0)
    })
    it('FAMC and FAMS record access methods', () => {
        expect(gedcom.parentalFamilyKeys(cdbKey)).toStrictEqual(['@F74@'])
        expect(gedcom.spousalFamilyKeys(cdbKey)).toStrictEqual(['@F147@'])

        expect(gedcom.parentalFamilyKeys(wlbKey)).toStrictEqual(['@F72@'])
        expect(gedcom.spousalFamilyKeys(wlbKey)).toStrictEqual(['@F50@', '@F49@'])

        let famKey = gedcom.parentalFamilyKeys(cdbKey)[0]
        expect(famKey).toStrictEqual('@F74@')

        expect(gedcom.familyXKey(famKey)).toBe(mmhKey)
        expect(gedcom.nameKey(gedcom.familyXKey(famKey))).toBe('MeartiaMargaretHeddens1933')
        expect(gedcom.nameKey(gedcom.familyYKey(famKey))).toBe('WilliamCollinsBevins1931')
        expect(gedcom.familyYKey(famKey)).toBe(wcbKey)
        expect(gedcom.familyChildrenKeys(famKey)).toStrictEqual(
            [bbbKey, cdbKey, kmbKey, mwbKey, llbKey])
    })
    it('Life status access methods', () => {
        expect(gedcom.gender(cdbKey)).toBe('M')
        expect(gedcom.gender(mmhKey)).toBe('F')

        expect(gedcom.lifeSpan(cdbKey)).toBe('(1952-?)')
        expect(gedcom.isLiving(cdbKey)).toBe(true)
        expect(gedcom.lifeStatus(cdbKey)).toBe('Alive')
        expect(gedcom.lifeStatus(cdbKey, 'Not Dead Yet', 'Dead as a Doorknob')).toBe('Not Dead Yet')

        expect(gedcom.lifeSpan(wlbKey)).toBe('(1815-1889)')
        expect(gedcom.isLiving(wlbKey)).toBe(false)
        expect(gedcom.lifeStatus(wlbKey)).toBe('Deceased')
        expect(gedcom.lifeStatus(wlbKey, 'Not Dead Yet', 'Rest in Peace')).toBe('Rest in Peace')
        expect(age(
            parseDate(gedcom.birthDate(wlbKey)),
            parseDate(gedcom.deathDate(wlbKey)))).toStrictEqual([74, 3, 13])
    })
    it('age() access methods', () => {
        const wlbBirth = {year: 1815, month: 3, day: 4}
        const wlbDeath = {year: 1889, month: 6, day: 17}
        expect(age(wlbBirth, wlbDeath)).toStrictEqual([74, 3, 13])
    })
    it('parseDate()', () => {
        let date = parseDate('04 Sep 1952')
        expect(date).toStrictEqual({text: '04 Sep 1952', str: '4 Sep 1952',
            year: 1952, month: 9, day: 4, qual: '', time: 0, year2: 0, msg:null})

        date = parseDate('1952')
        expect(date).toStrictEqual({text: '1952', str: '1952',
            year: 1952, month: 0, day: 0, qual: '', time: 0, year2: 0, msg:null})

        date = parseDate('abt 1952')
        expect(date).toStrictEqual({text: 'abt 1952', str: 'about 1952',
            year: 1952, month: 0, day: 0, qual: 'about', time: 0, year2: 0, msg:null})
    })
    it('parsePlace()', () => {
        let p = parsePlace('Home, Grand Rapids, Itasca, Minnesota, USA')
        expect(p).toStrictEqual({
            text: 'Home, Grand Rapids, Itasca, Minnesota, USA',
            key: 'Home, Grand Rapids, Itasca, Minnesota, USA',
            count: 0, country: 'USA', state: 'Minnesota', county: 'Itasca', locale: 'Home, Grand Rapids'})
    })
    it('jsonIndi() for Collin Douglas Bevins', () => {
        let cdb = gedcom.jsonIndi(cdbKey)

        expect(cdb.keys.gedcom).toBe(cdbKey)
        expect(cdb.keys.label).toBe('Collin Douglas BEVINS (#1) (1952-?)')
        expect(cdb.keys.name).toBe('CollinDouglasBevins1952')

        expect(cdb.name.full).toBe('Collin Douglas BEVINS (#1)')
        expect(cdb.name.given).toBe('Collin Douglas')
        expect(cdb.name.name).toBe('Collin Douglas /Bevins/ (#1)')
        expect(cdb.name.nick).toBe('')
        expect(cdb.name.prefix).toBe('')
        expect(cdb.name.suffix).toBe('(#1)')
        expect(cdb.name.surname).toBe('Bevins')
        expect(cdb.name.surnamePrefix).toBe('')

        expect(cdb.notes.length).toBe(0)
        expect(cdb.notes).toStrictEqual([])
        expect(cdb.sources.length).toBe(0)
        expect(cdb.sources).toStrictEqual([])

        expect(cdb.birth.date.text).toBe('4 Sep 1952')
        expect(cdb.birth.date.year).toBe(1952)
        expect(cdb.birth.date.month).toBe(9)
        expect(cdb.birth.date.day).toBe(4)
        expect(cdb.birth.date.qual).toBe('')
        expect(cdb.birth.date.str).toBe('4 Sep 1952')
        expect(cdb.birth.date.time).toBe(0)
        expect(cdb.birth.date.year2).toBe(0)
        expect(cdb.birth.date.msg).toBe(null)
        expect(cdb.birth.place.text).toBe('Grand Rapids, Itasca, MN, USA')
        expect(cdb.birth.place.country).toBe('USA')
        expect(cdb.birth.place.state).toBe('Minnesota')
        expect(cdb.birth.place.county).toBe('Itasca')
        expect(cdb.birth.place.locale).toBe('Grand Rapids')
        expect(cdb.birth.notes.length).toBe(2)
        let notes = cdb.birth.notes
        expect(notes.length).toBe(2)
        expect(cdb.birth.notes[0]).toBe('Birth note 1')
        expect(cdb.birth.notes[1]).toBe('Birth note 2 Line 1/nBirth note 2 Line 2...more of birth note line 2')
        let lines = notes[1].split('/n')
        expect(lines.length).toBe(2)
        expect(lines[0]).toBe('Birth note 2 Line 1')
        expect(lines[1]).toBe('Birth note 2 Line 2...more of birth note line 2')
        expect(cdb.birth.sources.length).toBe(8)
        expect(cdb.birth.sources[1]).toBe('@S1050502673@')
        expect(cdb.birth.sources[7]).toBe('@S1050509662@')

        expect(cdb.death.date.text).toBe('')
        expect(cdb.death.date.qual).toBe('')
        expect(cdb.death.date.year).toBe(0)
        expect(cdb.death.date.month).toBe(0)
        expect(cdb.death.date.day).toBe(0)
        expect(cdb.death.date.year2).toBe(0)
        expect(cdb.death.date.str).toBe('Living')
        expect(cdb.death.date.time).toBe(0)
        expect(cdb.death.date.msg).toBe(null)
        expect(cdb.death.place.text).toBe('')
        expect(cdb.death.place.country).toBe('Unknown')
        expect(cdb.death.place.state).toBe('')
        expect(cdb.death.place.county).toBe('')
        expect(cdb.death.place.locale).toBe('')
        expect(cdb.death.notes.length).toBe(0)
        expect(cdb.death.sources.length).toBe(0)

        expect(cdb.life.age[0]).toBeGreaterThan(70)
        expect(cdb.life.gender).toBe('M')
        expect(cdb.life.isLiving).toBe(true)
        expect(cdb.life.span).toBe('(1952-?)')

        expect(cdb.families.parents.length).toBe(1)
        expect(cdb.families.parents[0]).toBe('@F74@')
        expect(cdb.families.spouses.length).toBe(1)
        expect(cdb.families.spouses[0]).toBe('@F147@')

        let fam = gedcom.jsonFam(cdb.families.parents[0])
        expect(fam.xKey).toBe('MeartiaMargaretHeddens1933')
        expect(fam.yKey).toBe('WilliamCollinsBevins1931')
        expect(fam.children.length).toBe(5)
        expect(fam.children[0]).toBe('BabyBoyBevins1951')
        expect(fam.children[1]).toBe('CollinDouglasBevins1952')
        expect(fam.children[2]).toBe('KarenMargaretBevins1954')
        expect(fam.children[3]).toBe('MarkWilliamBevins1956')
        expect(fam.children[4]).toBe('LauraLeeBevins1959')
        expect(fam.union.date.text).toBe('17 Oct 1950')
        expect(fam.union.date.year).toBe(1950)
        expect(fam.union.date.month).toBe(10)
        expect(fam.union.date.day).toBe(17)
        expect(fam.union.place.text).toBe('Itasca, Minnesota, USA')
        
        fam = gedcom.jsonFam(cdb.families.spouses[0])
        expect(fam.xKey).toBe('BarbaraJeanneRiley1953')
        expect(fam.yKey).toBe('CollinDouglasBevins1952')
        expect(fam.children.length).toBe(2)
        expect(fam.children[0]).toBe('DrewallynBevinsRiley1982')
        expect(fam.children[1]).toBe('KelsynRileyBevins1986')
        expect(fam.union.date.text).toBe('14 Jan 2006')
        expect(fam.union.date.year).toBe(2006)
        expect(fam.union.date.month).toBe(1)
        expect(fam.union.date.day).toBe(14)
        expect(fam.union.place.text).toBe('Las Vegas, Clark, Nevada, USA')
    })
    it('jsonIndi() for William Longford Bevins', () => {
        let wlb = gedcom.jsonIndi(wlbKey)

        expect(wlb.keys.gedcom).toBe(wlbKey)
        expect(wlb.keys.label).toBe('William Longford BEVINS (#16) (1815-1889)')
        expect(wlb.keys.name).toBe('WilliamLongfordBevins1815')

        expect(wlb.notes.length).toStrictEqual(1)
        expect(wlb.sources.length).toStrictEqual(2)
        expect(wlb.sources[0]).toBe('@S1049044688@')

        expect(wlb.death.date.text).toBe('17 Jun 1889')
        expect(wlb.death.date.qual).toBe('')
        expect(wlb.death.date.year).toBe(1889)
        expect(wlb.death.date.month).toBe(6)
        expect(wlb.death.date.day).toBe(17)
        expect(wlb.death.date.year2).toBe(0)
        expect(wlb.death.date.time).toBe(0)
        expect(wlb.death.date.msg).toBe(null)
        expect(wlb.death.place.text).toBe('Annawan, Henry, Illinois, USA')
        expect(wlb.death.place.country).toBe('USA')
        expect(wlb.death.place.state).toBe('Illinois')
        expect(wlb.death.place.county).toBe('Henry')
        expect(wlb.death.place.locale).toBe('Annawan')
        expect(wlb.death.notes.length).toBe(0)
        expect(wlb.death.sources.length).toBe(0)

        expect(wlb.life.isLiving).toBe(false)
        expect(wlb.life.age).toStrictEqual([74, 3, 13])
        expect(wlb.life.span).toBe('(1815-1889)')

        expect(wlb.families.parents.length).toBe(1)
        expect(wlb.families.parents[0]).toBe('@F72@')
        expect(wlb.families.spouses.length).toBe(2)
        expect(wlb.families.spouses[0]).toBe('@F50@')
        expect(wlb.families.spouses[1]).toBe('@F49@')
    })
    it('{places:} exists', () => {
        expect(gedcom._plac.size).toBe(6)
    })
})
