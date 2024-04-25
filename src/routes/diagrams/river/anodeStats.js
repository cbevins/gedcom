/**
 * Returns an object with the following information about an Anodes array:
 * 
 * - genSlots is an array of the number of Anode instances per generation
 * - maxGen is the highest generation index (subject is generation 0)
 * - maxSlots is the maximum number of Anodes in any generation
 * - maxSlotGen is the highest generation with the most Anodes
 * 
 * Each Anode also has the following props added:
 *  - genSlot is the Anode's index of existential occurrence within its generation,
 *      that is, it may be the 4th mathematical Anode, but the 1st to actually occur
 */
export function anodeStats(anodes) {
    
    // Additional Anodes props
    const active = []                   // Anodes with at least 1 known parent
    let maxGen = 0                      // index of highest generation
    let maxSlots = 0                    // maximum number of families in any generation
    let maxSlotGen = 0                  // index of last generation wuth the maximum number of families
    let genSlots = Array(20).fill(0)    // number of families per generation
    
    // Add Anode properties required by the chart diagram
    let lastGen = -1
    let genSlot = -1
    for (let i=0; i<anodes.length; i++) {
        const anode = anodes[i]
        // Accumulate generational statistics
        if (anode.gen > lastGen) genSlot = -1
        genSlot++
        lastGen = anode.gen
        // Set the anode.genSlot prop
        anode.prop.genSlot = genSlot
        maxGen = Math.max(maxGen, anode.gen)
        genSlots[anode.gen]++
    }
    // Determine maximum Anodes in any generation, and in which generation it occurs
    for(let i=0; i<=maxGen; i++) {
        if (genSlots[i] >= maxSlots) {
            maxSlots = genSlots[i]
            maxSlotGen = i
        }
    }
    // Return stats in an object
    return {genSlots: genSlots, maxGen: maxGen, maxSlots: maxSlots, maxSlotGen: maxSlotGen}
}    