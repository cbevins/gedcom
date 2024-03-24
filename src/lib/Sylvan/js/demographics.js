
export function demographics(sylvan, persons) {
    for (let i=0; i<persons.length; i++) {
        const person = persons[i]
        const data = [person.birthYear(), person.deathYear(), person.gender(), person.age()]

    }    
}