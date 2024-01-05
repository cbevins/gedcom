import { describe, it, expect } from 'vitest'
import { GedStore } from './GedStore.js'
import { gedJson } from './GedJsonAncestry.js'
import { relationship } from './relationship.js'

const gd = new GedStore(gedJson)
const cdbLabel = 'Collin Douglas BEVINS (#1) (1952-?)'
const Collin = 'CollinDouglasBevins1952'
const Karen = 'KarenMargaretBevins1954'
const Barbara = 'BarbaraJeanneRiley1953'
const mmhNameKey = 'MeartiaMargaretHeddens1933'
const wcbNameKey = 'WilliamCollinsBevins1931'
const wlbNameKey = 'WilliamLongfordBevins1815'

describe('GedStore class', () => {
    it('runGedStoreGenerator.js creates syntactically correct gedJson', () => {
        expect(gedJson.person.size).toBe(787)
        expect(gedJson.labels.size).toBe(770) // this is less because of 17 duplicate persons
        expect(gedJson.family.size).toBe(219)
    })
    it('GedStore.person() access method', () => {
        expect(gd.person(Collin).keys.name).toBe(Collin)
        expect(gd.person(Barbara).keys.name).toBe(Barbara)
        expect(gd.person(Collin).families.parents[0]).toBe('@F74@')
        expect(gd.person('junk')).toBe(undefined)
    })
    it('GedStore.family() access method', () => {
        let famKey = '@F74@'
        expect(gd.family(famKey).key).toBe(famKey)
        expect(gd.family('junk')).toBe(undefined)
    })
    it('GedStore.nameKey() access method', () => {
        expect(gd.nameKey(cdbLabel)).toBe(Collin)
        expect(gd.nameKey('junk')).toBe(undefined)
    })
    it('GedStore.mother() method accepts either nameKey string or {indi:} object', () => {
        expect(gd.mother(Collin).keys.name).toBe(mmhNameKey)
        expect(gd.mother(gd.person(Collin)).keys.name).toBe(mmhNameKey)
    })
    it('GedStore.father() method accepts either nameKey string or {indi:} object', () => {
        expect(gd.father(Collin).keys.name).toBe(wcbNameKey)
        expect(gd.father(gd.person(Collin)).keys.name).toBe(wcbNameKey)
    })
    it('GedStore.siblings() method accepts either nameKey string or {indi:} object', () => {
        expect(gd.siblings(Collin).length).toBe(5)
        expect(gd.siblings(Collin)[0].keys.name).toBe('BabyBoyBevins1951')
        expect(gd.siblings(Collin)[4].keys.name).toBe('LauraLeeBevins1959')
    })
    it('GedStore.spouse() method accepts either nameKey string or {indi:} object', () => {
        expect(gd.spouse(Collin, 0).keys.name).toBe(Barbara)
        expect(gd.spouse(gd.person(Collin), 0).keys.name).toBe(Barbara)
        expect(gd.spouse(Barbara, 1).keys.name).toBe(Collin)
        expect(gd.spouse(gd.person(Barbara), 1).keys.name).toBe(Collin)
    })
    it('GedStore.children() method accepts either nameKey string or {indi:} object', () => {
        expect(gd.children(Collin).length).toBe(2)
        expect(gd.children(Collin)[0].keys.name).toBe('DrewallynBevinsRiley1982')
        expect(gd.children(Collin)[1].keys.name).toBe('KelsynRileyBevins1986')
        expect(gd.children(wlbNameKey, 0).length).toBe(1)
        expect(gd.children(wlbNameKey, 1).length).toBe(12)
    })
    it('GedStore.allChildren() method accepts either nameKey string or {indi:} object', () => {
        expect(gd.allChildren(Collin).length).toBe(2)
        expect(gd.allChildren(wlbNameKey).length).toBe(13)
    })
    it('{places:} exists', () => {
        expect(gd.places().size).toBe(611)
    })
    it('relationship()', () => {
        expect(relationship(gd, Collin, 'WilliamCollinsBevins1931').text).toBe('Father')
        expect(relationship(gd, 'WilliamCollinsBevins1931', Collin).text).toBe('Son')

        expect(relationship(gd, Karen, 'WilliamCollinsBevins1931').text).toBe('Father')
        expect(relationship(gd, 'WilliamCollinsBevins1931', Karen).text).toBe('Daughter')
        
        expect(relationship(gd, Collin, 'MeartiaMargaretHeddens1933').text).toBe('Mother')
        expect(relationship(gd, 'MeartiaMargaretHeddens1933', Collin).text).toBe('Son')

        expect(relationship(gd, Karen, 'MeartiaMargaretHeddens1933').text).toBe('Mother')
        expect(relationship(gd, 'MeartiaMargaretHeddens1933', Karen).text).toBe('Daughter')

        expect(relationship(gd, Collin, 'SamuelBevins1879').text).toBe('Grand Father')
        expect(relationship(gd, 'SamuelBevins1879', Collin).text).toBe('Grand Son')

        expect(relationship(gd, Karen, 'SamuelBevins1879').text).toBe('Grand Father')
        expect(relationship(gd, 'SamuelBevins1879', Karen).text).toBe('Grand Daughter')

        expect(relationship(gd, Collin, 'HattieJaneCollins1889').text).toBe('Grand Mother')
        expect(relationship(gd, 'HattieJaneCollins1889', Collin).text).toBe('Grand Son')
        
        expect(relationship(gd, Karen, 'HattieJaneCollins1889').text).toBe('Grand Mother')
        expect(relationship(gd, 'HattieJaneCollins1889', Karen).text).toBe('Grand Daughter')

        expect(relationship(gd, Collin, 'WilliamAlfredBevins1843').text).toBe('1st Great Grand Father')
        expect(relationship(gd, 'WilliamAlfredBevins1843', Collin).text).toBe('1st Great Grand Son')
        
        expect(relationship(gd, Karen, 'WilliamAlfredBevins1843').text).toBe('1st Great Grand Father')
        expect(relationship(gd, 'WilliamAlfredBevins1843', Karen).text).toBe('1st Great Grand Daughter')
        
        expect(relationship(gd, Collin, 'MaryAnnWhite1848').text).toBe('1st Great Grand Mother')
        expect(relationship(gd, 'MaryAnnWhite1848', Collin).text).toBe('1st Great Grand Son')
        
        expect(relationship(gd, Karen, 'MaryAnnWhite1848').text).toBe('1st Great Grand Mother')
        expect(relationship(gd, 'MaryAnnWhite1848', Karen).text).toBe('1st Great Grand Daughter')

        expect(relationship(gd, Collin, 'WilliamLongfordBevins1815').text).toBe('2nd Great Grand Father')
        expect(relationship(gd, 'WilliamLongfordBevins1815', Collin).text).toBe('2nd Great Grand Son')

        expect(relationship(gd, Karen, 'WilliamLongfordBevins1815').text).toBe('2nd Great Grand Father')
        expect(relationship(gd, 'WilliamLongfordBevins1815', Karen).text).toBe('2nd Great Grand Daughter')

        expect(relationship(gd, Collin, 'MaryBolt1822').text).toBe('2nd Great Grand Mother')
        expect(relationship(gd, 'MaryBolt1822', Collin).text).toBe('2nd Great Grand Son')

        expect(relationship(gd, Karen, 'MaryBolt1822').text).toBe('2nd Great Grand Mother')
        expect(relationship(gd, 'MaryBolt1822', Karen).text).toBe('2nd Great Grand Daughter')

        expect(relationship(gd, Collin, 'KelsynRileyBevins1986').text).toBe('Daughter')
        expect(relationship(gd, 'KelsynRileyBevins1986', Collin).text).toBe('Father')
        expect(relationship(gd, Collin, 'DrewallynBevinsRiley1982').text).toBe('Daughter')

        expect(relationship(gd, Collin, 'KennethAlfredBevins1911').text).toBe('Uncle')
        expect(relationship(gd, 'KennethAlfredBevins1911', Collin).text).toBe('Nephew')

        expect(relationship(gd, Karen, 'KennethAlfredBevins1911').text).toBe('Uncle')
        expect(relationship(gd, 'KennethAlfredBevins1911', Karen).text).toBe('Neice')

        expect(relationship(gd, Collin, 'PatriciaLouHeddens1935').text).toBe('Aunt')
        expect(relationship(gd, 'PatriciaLouHeddens1935', Collin).text).toBe('Nephew')

        expect(relationship(gd, Karen, 'PatriciaLouHeddens1935').text).toBe('Aunt')
        expect(relationship(gd, 'PatriciaLouHeddens1935', Karen).text).toBe('Neice')

        expect(relationship(gd, Collin, 'FeebeBevins1880').text).toBe('Grand Aunt')
        expect(relationship(gd, 'FeebeBevins1880', Collin).text).toBe('Grand Nephew')

        expect(relationship(gd, Karen, 'FeebeBevins1880').text).toBe('Grand Aunt')
        expect(relationship(gd, 'FeebeBevins1880', Karen).text).toBe('Grand Neice')

        expect(relationship(gd, Collin, 'PhebeMayBevins1862').text).toBe('1st Great Grand Aunt')
        expect(relationship(gd, 'PhebeMayBevins1862', Collin).text).toBe('1st Great Grand Nephew')

        expect(relationship(gd, Karen, 'PhebeMayBevins1862').text).toBe('1st Great Grand Aunt')
        expect(relationship(gd, 'PhebeMayBevins1862', Karen).text).toBe('1st Great Grand Neice')

        expect(relationship(gd, Collin, 'DavidLyalOmer1948').text).toBe('1st Cousin')
        expect(relationship(gd, Collin, 'KathrynJaneBrorson1953').text).toBe('1st Cousin')
        expect(relationship(gd, Karen, 'DavidLyalOmer1948').text).toBe('1st Cousin')
        expect(relationship(gd, Karen, 'KathrynJaneBrorson1953').text).toBe('1st Cousin')
    })
})
