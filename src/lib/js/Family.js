// EXPERIMENTAL
/**
 * Assigns familial relationships between a subject and all other persons in the tree.
 */
export class Family {
    constructor(gedStore) {
        this._gedStore = gedStore
        this._personMap = new Map()
        this._familySet = new Set()
    }
    family(familyKey) { return this._gedStore.family(familyKey) }
    person(personKey) { return this._gedStore.person(personKey) }
    relate(subjectKey) {
        this._personMap = new Map()
        this._familySet = new Set()
        this._storePerson(subjectKey, ['x'], 0, 0)
        this._runAll()
        // this._runSome(2)
    }
    _reportUnrelated() {
        for( const [key, entry] of this._gedStore.persons()) {
            if (! this._personMap.has(key)) {
                console.log('Unrelated to', entry.keys.label)
            }
        }
    }
    _runAll() {
        let persons = 0
        let n = 0
        let atStep = 0
        while(n = this._step(atStep)) {
            persons += n
            console.log(`Step ${atStep} processed ${n} persons`)
            atStep++
        }
        console.log(`Processed ${persons} persons of ${this._gedStore.persons().size}`)
    }
    _runSome(maxStep) {
        let persons = 0
        for(let i=0; i<=maxStep; i++) {
            const n = this._step(i)
            persons += n
            console.log(`Step ${i} processed ${n} persons\n`)
        }
        console.log(`Processed ${persons} persons of ${this._gedStore.persons().size}`)
    }
    _step(atStep) {
        let n = 0
        for (const [key, person] of this._personMap.entries()) {
            if (person.step === atStep) {
                console.log(`Step ${person.step} Gen ${person.gen} Path ${person.path} : ${person.person.keys.label}`)
                this._process(person.person, person.path, person.step, person.gen)
                n++
            }
        }
        return n
    }
    _process(subject, path, step, gen) {
        // Review all subject's parental family groups to get parents and siblings
        for(let i=0; i<subject.families.parents.length; i++) {
            const famKey = subject.families.parents[i]
            if (! this._familySet.has(famKey)) {
                const family = this.family(famKey)
                this._storeParent(family.xKey, path, step, gen)
                this._storeParent(family.yKey, path, step, gen)
                for(let j=0; j<family.children.length; j++) {
                    this._storeSibling(family.children[j], path, step, gen, family)
                }
                this._familySet.add(famKey)
            }
        }
        // Review all subject's spousal family groups to get spouses and children
        for(let i=0; i<subject.families.spouses.length; i++) {
            const famKey = subject.families.spouses[i]
            if (! this._familySet.has(famKey)) {
                const family = this.family(famKey)
                const spouseKey = (family.xKey === subject.keys.name) ? family.yKey : family.xKey
                this._storeSpouse(spouseKey, path, step, gen)
                for(let j=0; j<family.children.length; j++) {
                    this._storeChild(family.children[j], path, step)
                }
                this._familySet.add(famKey)
            }
        }
    }
    _storeChild(childKey, subjectPath, step, subjectGen) {
        const p = [['c', [childKey]]]
        this._storePerson(childKey, subjectPath.concat(['c']), step+1, subjectGen-1 )
    }
    _storeParent(parentKey, subjectPath, step, subjectGen) {
        const p = [['p', [parentKey]]]
        this._storePerson(parentKey, subjectPath.concat(['p']), step+1, subjectGen+1 )
    }
    _storeSibling(siblingKey, subjectPath, step, subjectGen, family) {
        const p = [['p', [family.xKey, family.yKey]], ['c', [siblingKey]]]
        this._storePerson(siblingKey, subjectPath.concat(['p','c']), step+2, subjectGen )
    }
    _storeSpouse(spouseKey, subjectPath, step, subjectGen) {
        const p = [['s', spouseKey]]
        this._storePerson(spouseKey, subjectPath.concat(['s']), step+1, subjectGen )
    }
    _storePerson(personKey, path, step, gen) {
        const person = this.person(personKey)
        if (person && ! this._personMap.has(personKey)) {
            this._personMap.set(personKey, {person: person, step: step, path: path, gen: gen})
        }
    }
    // converts path array to a string
    seq(path) {
        let str = ''
        for(let i=0; i<path.length; i++) {
            str += path[i]
        }
        return str
    }
    // logs all the unique recorded paths
    paths() {
        const paths = new Map()
        for (const [key, person] of this._personMap.entries()) {
            paths.set(this.seq(person.path))
        }
        let i = 1
        for (const key of paths.keys()) {
            console.log(i, key)
            i++
        }
        console.log('Size', paths.size)
    }
}
export const Path = [
    ['x', 'self', 'self'],
    
    ['xp', 'parent', 'mother/father'],
    ['xpc', 'sibling', 'sister/brother'],                                           // 0 cousin, 0 removed
    ['xpcc', 'neice/nephew', 'neice/nephew'],                                       // 0 cousin -1 removed
    ['xpccc', 'grand neice/nephew', 'grand neice/nephew'],                          // 0 cousin -2 removed
    ['xpcccc', '1st great grand neice/nephew', '1st great grand neice/nephew'],     // 0 cousin -3 removed
    ['xpccccc', '2nd great grand neice/nephew', '2nd great grand neice/nephew'],    // 0 cousin -4 removed
    ['xpcccccc', '3rd great grand neice/nephew', '3rd great grand neice/nephew'],   // 0 cousin -5 removed
    ['xpccccccc', '4th great grand neice/nephew', '4th great grand neice/nephew'],  // 0 cousin -6 removed
    ['xpcccccccc', '5th great grand neice/nephew', '5th great grand neice/nephew'], // 0 cousin -7 removed

    ['xpp', 'grandparent', 'grand mother/father'],
    ['xppc', 'aunt/uncle', 'aunt/uncle'],                                   // 0 cousin +1 removed
    ['xppcc', '1st cousin', '1st cousin'],                                  // 1 cousin 0 removed
    ['xppccc', '1st cousin 1 removed', '1st cousin 1 removed'],             // 1 cousin -1 removed
    ['xppcccc', '1st cousin 2 removed', '1st cousin 2 removed'],            // 1 cousin -2 removed
    ['xppccccc', '1st cousin 3 removed', '1st cousin 3 removed'],           // 1 cousin -3 removed
    ['xppcccccc', '1st cousin 4 removed', '1st cousin 4 removed'],          // 1 cousin -4 removed
    ['xppccccccc', '1st cousin 5 removed', '1st cousin 5 removed'],         // 1 cousin -5 removed

    ['xppp', '1st great grandparent', '1st great grand mother/father'],
    ['xpppc', 'grand aunt/uncle', 'grand aunt/uncle'],                      // 0 cousin +2 removed
    ['xpppcc', '1st cousin +1 removed', '1st cousin +1 removed'],           // 1 cousin +1 removed
    ['xpppccc', '2nd cousin', '2nd cousin'],                                // 2 cousin  0 removed
    ['xpppcccc', '2nd cousin -1 removed', '2nd cousin -1 removed'],         // 2 cousin -1 removed
    ['xpppccccc', '2nd cousin -2 removed', '2nd cousin -2 removed'],        // 2 cousin -2 removed
    ['xpppcccccc', '2nd cousin -3 removed', '2nd cousin -3 removed'],       // 2 cousin -3 removed
    ['xpppccccccc', '2nd cousin -4 removed', '2nd cousin -4 removed'],      // 2 cousin -4 removed
    ['xpppcccccccc', '2nd cousin -5 removed', '2nd cousin -5 removed'],     // 2 cousin -5 removed

    ['xpppp', '2nd great grandparent', '2nd great grand mother/father'],
    ['xppppc', 'great grand aunt/uncle', 'great grand aunt/uncle'],         // 0 cousin +3 removed
    ['xppppcc', '1st cousin +2 removed', '1st cousin +2 removed'],          // 1 cousin +2 removed
    ['xppppccc', '2nd cousin +1 removed', '2nd cousin +1 removed'],         // 2 cousin +1 removed
    ['xppppcccc', '3rd cousin', '3rd cousin'],                              // 3 cousin  0 removed
    ['xppppccccc', '3rd cousin -1 removed', '3rd cousin -1 removed'],       // 3 cousin -1 removed
    ['xppppcccccc', '3rd cousin -2 removed', '3rd cousin -2 removed'],      // 3 cousin -2 removed
    ['xppppccccccc', '3rd cousin -3 removed', '3rd cousin -3 removed'],     // 3 cousin -3 removed
    ['xppppcccccccc', '3rd cousin -4 removed', '3rd cousin -4 removed'],    // 3 cousin -4 removed
    ['xppppccccccccc', '3rd cousin -5 removed', '3rd cousin -5 removed'],   // 3 cousin -5 removed

    ['xppppp', '3rd great grandparent', '3rd great grand mother/father'],
    ['xpppppc', '2nd great grand aunt/uncle', '2nd great grand aunt/uncle'],// 1c - 1 = 0 cousin : 5p - 1c = +4 removed
    ['xpppppcc', '1st cousin +3 removed', '1st cousin +3 removed'],         // 2c - 1 = 1 cousin : 5p - 2c = +3 removed
    ['xpppppccc', '2nd cousin +2 removed', '2nd cousin +2 removed'],        // 3c - 1 = 2 cousin : 5p - 3c = +2 removed
    ['xpppppcccc', '3rd cousin +1 removed', '3rd cousin +1 removed'],       // 4c - 1 = 3 cousin : 5p - 4c = +1 removed
    ['xpppppccccc', '4th cousin', '4th cousin'],                            // 5c - 1 = 4 cousin : 5p - 5c =  0 removed 
    ['xpppppcccccc', '4th cousin -1 removed', '4th cousin -1 removed'],     // 5p - 1 = 4 cousin : 5p - 6c = -1 removed
    ['xpppppccccccc', '4th cousin -2 removed', '4th cousin -2 removed'],    // 5p - 1 = 4 cousin : 5p - 7c = -2 removed
    ['xpppppcccccccc', '4th cousin -3 removed', '4th cousin -3 removed'],   // 5p - 1 = 4 cousin : 5p - 8c = -3 removed
    ['xpppppccccccccc', '4th cousin -4 removed', '4th cousin -4 removed'],  // 5p - 1 = 4 cousin : 5p - 9c = -4 removed
    // cousin = min(nc-1, np-1)
    // removed = np - nc

    ['xc', 'child', 'daughter/son'],
    ['xcc', 'grandchild', 'grand daughter/son'],
    ['xccc', '1st great grandchild', '1st great grand daughter/son'],
    ['xcccc', '2nd great grandchild', '2nd great grand daughter/son'],
    ['xccccc', '3rd great grandchild', '3rd great grand daughter/son'],

    ['xs', 'spouse', 'wife/husband'],
    ['xsp', "spouse's parent", 'mother/father-in-law'],
    ['xspc', "spouse's sibling", 'sister/brother-in-law'],
    ['xsc', "spouse's child", 'step-son/daughter'], // by spouse's other union   
    
    ['xss', "spouse's spouse", ],     
    ['xssp', "spouse's spouse's parent", "spouse's mother/father-in-law"],     // unrelated son/daughter     
    ['xssc', "spouse's spouse's child", "spouse's step-son/daughter"],     // unrelated son/daughter     

    ['xcs', "child's spouse", 'daughter/son-in-law'],
    ['xcc', 'grandchild', 'grand daughter/son'],
]