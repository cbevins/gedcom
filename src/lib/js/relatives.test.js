import { describe, it, expect } from 'vitest'
import { GedStore } from './GedStore.js'
import { gedJson } from '../data/GedJsonAncestry.js'
import { relatives, family } from './relatives.js'

const gd = new GedStore(gedJson)
const cdbLabel = 'Collin Douglas BEVINS (#1) (1952-?)'
const Collin = 'CollinDouglasBevins1952'
const Karen = 'KarenMargaretBevins1954'
const Barbara = 'BarbaraJeanneRiley1953'
const mmhNameKey = 'MeartiaMargaretHeddens1933'
const wcbNameKey = 'WilliamCollinsBevins1931'
const wlbNameKey = 'WilliamLongfordBevins1815'

const rootNameKey = Collin
let fam = family(gd, rootNameKey)
// show(wlbNameKey)
// path(wlbNameKey)

function show(nameKey) {
    const data = fam.get(nameKey)
    let str = `Path from ${rootNameKey} to ${nameKey}:\n`
    for(let i=0; i<data.length; i++) {
        const [person, rel, via0, via1] = data[i]
        str += `  ${i}: ${person.keys.name}, ${rel}`
        str += via0 ? ` via ${via0.keys.name}` : ''
        str += via1 ? ` and ${via1.keys.name}` : ''
        str += '\n'
    }
    console.log(str)
}

function path(nameKey, idx=0) {
    const data = fam.get(nameKey)
    const a = []
    for(let i=0; i<data.length; i++)
        a.push(data[i][1])
    return a
}

describe('function family()', () => {
    it('creates an initial Map', () => {
        expect(fam.get(Collin).length).toBe(1)
        expect(fam.get(wcbNameKey).length).toBe(2)
    })

    it('constructs direct ancestral lineage correctly', () => {
        // Self
        expect(path('CollinDouglasBevins1952')).toStrictEqual(   ['x'])
       // Parents
        expect(path('WilliamCollinsBevins1931')).toStrictEqual(   ['x', 'f'])
        expect(path('MeartiaMargaretHeddens1933')).toStrictEqual( ['x', 'm'])
        // Grand parents
        expect(path('SamuelBevins1879')).toStrictEqual(         ['x','f','f'])
        expect(path('HattieJaneCollins1889')).toStrictEqual(    ['x','f','m'])
        expect(path('RalphVernonHeddens1909')).toStrictEqual(   ['x','m','f'])
        expect(path('MargaretEvaNattrass1914')).toStrictEqual(  ['x','m','m'])
        // 1st Great Grandparents
        expect(path('WilliamAlfredBevins1843')).toStrictEqual(  ['x','f','f','f'])
        expect(path('MaryAnnWhite1848')).toStrictEqual(         ['x','f','f','m'])
        // 2nd Great Grandparents
        expect(path('WilliamLongfordBevins1815')).toStrictEqual(['x','f','f','f','f'])
        expect(path('MaryBolt1822')).toStrictEqual(             ['x','f','f','f','m'])
        // 2nd Step Great Grandmother
        expect(path('RuthGent1817')).toStrictEqual(             ['x','f','f','f', 'f', 'u0'])
        // 3rd Great Grandparents
        expect(path('JohnBevins1783')).toStrictEqual(           ['x','f','f','f','f','f'])
        expect(path('SarahAnnLongford1795')).toStrictEqual(     ['x','f','f','f','f','m'])
        // 4th Great Grandparents
        expect(path('JosephBevins1762')).toStrictEqual(         ['x','f','f','f','f','f','f'])
        expect(path('MaryAnnIsom1766')).toStrictEqual(          ['x','f','f','f','f','f','m']) // 4th ggm
        // 11th Great Grandparents
        expect(path('ThomasPoole1635')).toStrictEqual(['x','f','m','f','f','m','f','f','f','f','f','f','m','f']) // 11th ggm
        expect(path('AliceLunt1637')).toStrictEqual(  ['x','f','m','f','f','m','f','f','f','f','f','f','m','m']) // 11th ggm
        expect(path('JamesIsaacSpeer1565')).toStrictEqual(['x','f','m','f','f','m','f','f','f','f','f','f','f','f','f']) // 12th ggm
    })
    it('constructs direct descendant lineage correctly', () => {
        // Self
        expect(path('CollinDouglasBevins1952')).toStrictEqual(['x'])
        // Children
        expect(path('DrewallynBevinsRiley1982')).toStrictEqual(['x', 'd'])
        expect(path('KelsynRileyBevins1986')).toStrictEqual(['x', 'd'])
        // Grandchildren
        expect(path('CollinEdmundLyonsBevins2021')).toStrictEqual(['x', 'd', 's'])
        expect(path('CastillejaPearl"Leah"LyonsBevins2021')).toStrictEqual(['x', 'd', 'd'])
    })
    it('constructs spouses correctly', () => {
        // Self
        expect(path('CollinDouglasBevins1952')).toStrictEqual(['x'])
        // Spouse
        expect(path('BarbaraJeanneRiley1953')).toStrictEqual(['x', 'u0'])
    })
    it('constructs cousin lineage correctly', () => {
        // Self
        expect(path('CollinDouglasBevins1952')).toStrictEqual(['x'])
        // Aunts
        expect(path('PatriciaLouHeddens1935')).toStrictEqual(['x', 'm', 'm', 'd'])
        // Uncles by marriage
        expect(path('RaymondArthurHanson1934')).toStrictEqual(['x', 'm', 'm', 'd', 'u0'])
        expect(path('TerranceRaymondHanson1956')).toStrictEqual(['x', 'm', 'm', 'd', 's'])
    })
    it('constructs cousin lineage correctly', () => {
        // 2nd Great Grandparents
        expect(path('WilliamLongfordBevins1815')).toStrictEqual(['x','f','f','f','f'])
        expect(path('MaryBolt1822')).toStrictEqual(             ['x','f','f','f','m'])
    })
    it('constructs half siblings correctly', () => {
        // 2nd Great Grandparents
        fam = family(gd, 'WilliamAlfredBevins1843')
        show('JohnHenryBevins1838')
        expect(path('WilliamAlfredBevins1843')).toStrictEqual(['x'])
        expect(path('WilliamLongfordBevins1815')).toStrictEqual(['x', 'f'])  // father
        expect(path('MaryBolt1822')).toStrictEqual(['x', 'm'])  // mother
        expect(path('SamuelBevins1855')).toStrictEqual(['x', 'm', 's']) // brother
        expect(path('RuthGent1817')).toStrictEqual(['x', 'f', 'u0']) // step mother
        expect(path('JohnHenryBevins1838')).toStrictEqual(['x', 'f', 's']) // half brother
    })
})
