class Family {
    constructor(key, fatherKey, motherKey, childrenKeys) {
        this._key = key
        this._fatherKey = fatherKey
        this._motherKey = motherKey
        this._childrenKeys = childrenKeys
    }
}

class Person {
    constructor(key){
        this._key = key
        this._gender = 'U'
        this._fatherKey = null
        this._motherKey = null
        this._spouses = []   // array of {spouse: key, children: []}
    }
    addFather(fatherKey) { this._fatherKey = fatherKey; return this}
    addGender(gender) { this._gender = gender; return this}
    addMother(motherKey) { this._motherKey = motherKey; return this}
    addSpouse(spouseKey, childrenKeys) {
        this._spouses.push({spouseKey: spouseKey, childrenKeys: childrenKeys})
        return this
    }
    gender() { return this._gender }
    fatherKey() { return this._fatherKey }
    key() { return this._key }
    motherKey() { return this._motherKey }
    spouses() { return this._spouses }
    spouseKey(i) { return this._spouses[i].spouseKey }
    childrenKeys(i) { return this._spouses[i].childrenKeys }
    spouseChildKey(i, j) { return this._spouses[i].childrenKeys[j] }
}

const smallFamily = [
    ['SamuelBevins', 'HattieJaneCollins', ['WilliamCollinsBevins', 'MaryLeeBevins']],
    ['RalphVHeddens', 'MargaretEvaNattrass', ['MeartiaMargaretHeddens', 'PatriciaLouHeddens']],
    ['WilliamCollinsBevins', 'MeartiaMargaretHeddens', ['CollinDouglasBevins', 'KarenMargaretBevins']],
    ['CollinDouglasBevins', 'BarbaraJeanneRiley', ['DrewallynBevinsRiley', 'KelsynRileyBevins']],
    ['KelsynRileyBevins', 'LauraElizabethLyons', ['CollinEdmundLyonsBevins', 'CatellilejaPearlLyonsBevins']],
]
const myFamily = [
    // Gen +4
    ['WilliamLongfordBevins', 'RutherGent', ['JohnHenryBevins']],
    ['WilliamLongfordBevins', 'MaryBolt', ['WillaimAlfredBevins', 'JuliaBevins']],
    ['ThomasWhite', 'JaneOliver', ['MaryAnnWhite', 'RobertWhite']],
    // Gen +3
    ['WilliamAlfredBevins', 'MaryAnnWhite',  ['SamuelBevins', 'FeebeeBevins']],
    ['GeorgeWCollins', 'FrancesShofner', ['HattieJaneCollins', 'ErnestCollins']],
    ['RalphRoyHeddens', 'MeartiaMaeLemler', ['RalphVHeddens', 'AudrayHeddens']],
    ['HarrySingNattrass', 'GinaOliviaMyhre', ['MargaretEvaNattrass', 'AlfredNattrass']],
    // Gen +2
    ['SamuelBevins', 'HattieJaneCollins', ['WilliamCollinsBevins', 'MaryLeeBevins']],
    ['RalphVHeddens', 'MargaretEvaNattrass', ['MeartiaMargaretHeddens', 'PatriciaLouHeddens']],
    ['SheldonJamesRiley', 'GladysMaeDeReus', ['SheldonJuniorRiley', 'DonnaLeeRiley']],
    ['HaroldRichardTrombley', 'MyrtleEstelleNelson', ['DorothyMaeTrombley', 'CarolLouiseTrombley']],
    // Gen +1
    ['WilliamCollinsBevins', 'MeartiaMargaretHeddens', ['CollinDouglasBevins', 'KarenMargaretBevins']],
    ['ArdenLarieJohnson', 'MaryLeeBevins', ['StephenJohnson']],
    ['SheldonJuniorRiley', 'DorothyMayTrombley', ['BarbaraJeanneRiley', 'CindyCarolRiley']],
    // Gen 0
    ['CollinDouglasBevins', 'BarbaraJeanneRiley', ['DrewallynBevinsRiley', 'KelsynRileyBevins']],
    ['RobertJohnson', 'KarenMargaretBevins', ['KateJohnson']],
    ['GregHelbert', 'CindyCarolRiley', ['BrianHelbert', 'BradleyHelbert']],
    // Gen -1
    ['DrewallynBevinsRiley', 'AllenMatassy', []],
    ['KelsynRileyBevins', 'LauraElizabethLyons', ['CollinEdmundLyonsBevins', 'CatellilejaPearlLyonsBevins']],
    ['BrianHelbert', 'DebraHelbert', ['LittleBrianHelbert']],
]

const familyMap = new Map()
const personMap = new Map()

function buildMaps(families) {
    for(let i=0; i<families.length; i++) {
        const [fatherKey,  motherKey, childrenKeys] = families[i]
        const familyKey = '@F'+i+'@'
        familyMap.set(familyKey, new Family(familyKey, fatherKey, motherKey, childrenKeys))
        
        if (!personMap.has(fatherKey)) personMap.set(fatherKey, new Person(fatherKey))
        let person = personMap.get(fatherKey)
        person.addSpouse(motherKey, childrenKeys).addGender('M')
        
        if (!personMap.has(motherKey)) personMap.set(motherKey, new Person(motherKey))
        person = personMap.get(motherKey)
        person.addSpouse(fatherKey, childrenKeys).addGender('F')
        
        for(let j=0; j<childrenKeys.length; j++) {
            const childKey = childrenKeys[j]
            if (!personMap.has(childKey)) personMap.set(childKey, new Person(childKey))
            person = personMap.get(childKey)
            person.addFather(fatherKey).addMother(motherKey)
        }
    }
}

function listPersons() {
    console.log(`There are ${familyMap.size} families with ${personMap.size} people:`)
    for (const [key, person] of personMap.entries()) {
        let str = ` [${person._gender}] ${key}: key=${person.key()}, father=${person.fatherKey()}, mother=${person.motherKey()}, spouses=${person.spouses().length}`
        for(let i=0; i<person.spouses().length; i++) {
            str += `\n        ${person.spouseKey(i)} with ${person.childrenKeys(i).length} children`
        }
        console.log(str)
    }
}

let pathMap = new Map()
let extended = new Set()

function walkTree(rootKey) {
    pathMap = new Map()
    const path = ['r']
    pathMap.set(rootKey, path)
    recurse(rootKey, path)
}

function recurse(subjectKey, path) {
    // First *assign* the subject's path
    if (!pathMap.get(subjectKey)) pathMap.set(subjectKey, [])
    const p = pathMap.get(subjectKey)
    pathMap.set(subjectKey, p.push(path))
    console.log('Assigned', subjectKey, path)
    // First, *assign* the updated path to each member of the subject's family
    if (extended.has(subjectKey)) return
    // Then *expand* the subject's relationships
    const subject = personMap.get(subjectKey)
    if (subject.motherKey()) recurse(subject.motherKey(), path.concat(['m']))
    if (subject.fatherKey()) recurse(subject.fatherKey(), path.concat(['f']))
    for(let i=0; i<subject.spouses().length; i++) {
        for(let j=0; j<subject.spouseChildrenKeys(i).length; j++) {
            const childKey = subject.spouseChildKey(i, j)
            recurse(childKey, path.concat(['c']))
        }
        if (subject.spouseKey(i)) recurse()
    }
}
buildMaps(smallFamily)
listPersons()
// walkTree('CollinDouglasBevins')
