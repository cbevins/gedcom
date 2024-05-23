import { idGenAbbr } from '$lib/Sylvan/class/Generations.js'

export function geometry(lineage, settings) {
    // Predetermined parameters
    const node = {
        width: 500,
        height: 320,
        // The following are padding between the cell and the node
        left: 100, right: 100, top: 20, bottom: 20
    }

    const cell = {
        width: node.width + node.left + node.right,     // for now, same size as a node
        height: node.height + node.top + node.bottom,   // for now, same size as a node
    }

    // Hydrate the Lineagw.prop and individual node.prop
    hydrate(lineage)
    const prop = lineage.prop
    const grid = {
        cols: prop.maxGen + 1,
        rows: prop.maxSlots //  idGenCount(maxSlotGen)
    }

    const geom = {
        active: lineage.prop.active,
        cell: cell,
        genSlots: prop.genSlots,
        grid: grid,
        height: cell.height * grid.rows,
        lineage: lineage,
        maxGen: prop.maxGen,
        maxSlotGen: prop.maxSlotGen,
        maxSlots: prop.maxSlots,
        node: node,
        nodes: lineage.nodesBySeq(),
        scale: settings.scale,
        width: cell.width * grid.cols,
    }
    
    // Assign node locations
    for (let i=0; i<geom.active.length; i++) {
        const active = geom.active[i]
        active.prop.x = active.gen * cell.width + node.left
        const slotHt = geom.height / geom.genSlots[active.gen]
        active.prop.y = active.prop.genSlot * slotHt + slotHt / 2 + node.top
    }

    return geom
}

/**
 * Returns a Lineage instance with props to draw a generational chart
 * 
 * The hydrates Lineage.prop contains:
 * - prop.active, an array of Lineage node instances ordered by sequence
 * *** NOTE, USE THE Lineage.prop.active ARRAY INSTEAD OF THE Lineage.nodes ARRAY IN THE CHART
 * - prop.genSlots, an array of the number of node instances per generation
 * - prop.maxGen, the highest generation index (subject is generation 0)
 * - prop.maxSlots, the maximum number of nodes in any generation
 * - prop.maxSlotGen, is the highest generation with the most nodes
 * 
 * Furthermore, each node is decorated with the following props:
 *  - prop.active, TRUE if the node has a mother OR a father
 *  - prop.lines, an array of content lines to be displayed in the chart for the node
 *  - prop.genSlot
 */
function hydrate(lineage) {
    // The Chart Union content has 16 lines used as follows:
    const line = {
        father: {name: 2, tags: 3, born: 4, died: 5},
        union: {date: 7, children: 8},
        mother: {name: 10, tags: 11, born: 12, died: 13},
    }

    const nodes = lineage.nodesBySeq()

    // Additional Anodes props
    const active = []                   // nodes with at least 1 known parent
    let maxGen = 0                      // index of highest generation
    let maxSlots = 0                    // maximum number of families in any generation
    let maxSlotGen = 0                  // index of last generation wuth the maximum number of families
    let genSlots = Array(20).fill(0)    // number of families per generation
    
    // Add Anode properties required by the chart diagram
    let lastGen = -1
    let genSlot = -1
    for (let i=0; i<nodes.length; i++) {
        const node = nodes[i]
        node.prop = {}  // .label = node.person.fullName()

        // Because this is a *parent* based chart,
        // only use nodes with at least 1 parent
        // and store them in the active[] array
        node.prop.active = (node.father || node.mother) ? true : false
        if (node.prop.active ) {
            // Add all text to be displayed:
            const lines = Array(16).fill('')
            
            // Add father's content lines
            let l = line.father
            lines[l.name] = 'unknown'
            if (node.father) {
                const p = node.father.person
                lines[l.name] = p.fullName()
                lines[l.born] =
                    `b. ${p.birthYear()} in ${p.birthState()}, ${p.birthCountry()}`
                lines[l.died] = p.isLiving() ? 'Not Dead Yet'
                    : `d. ${p.deathYear()} in ${p.deathState()}, ${p.deathCountry()}`
                lines[l.tags] = idGenAbbr(node.father.seq)
            }
            
            // Add mother's content lines
            l = line.mother
            lines[l.name] = 'unknown'
            if (node.mother) {
                const p = node.mother.person
                lines[l.name] = p.fullName()
                lines[l.born] =
                    `b. ${p.birthYear()} in ${p.birthState()}, ${p.birthCountry()}`
                lines[l.died] = p.isLiving() ? 'Not Dead Yet'
                    : `d. ${p.deathYear()} in ${p.deathState()}, ${p.deathCountry()}`
                lines[l.tags] = idGenAbbr(node.mother.seq)
            }
            
            // Add Union content lines
            const fam = node.person.familyParent(0)
            if (fam) {
                lines[line.union.date] = `m. ${fam.unionDate().year()} ${fam.unionPlace().text()}`
                lines[line.union.children] = `${fam.children().length} children`
            }
            node.prop.lines = lines

            // Accumulate generational statistics
            if (node.gen > lastGen) genSlot = -1
            genSlot++
            lastGen = node.gen
            node.prop.genSlot = genSlot
            maxGen = Math.max(maxGen, node.gen)
            genSlots[node.gen]++

            // Add this node to the active[] array
            active.push(node)
        }
    }
    // Determine maximum families in any generation, and which generation it is
    for(let i=0; i<=maxGen; i++) {
        if (genSlots[i] >= maxSlots) {
            maxSlots = genSlots[i]
            maxSlotGen = i
        }
    }

    // Store stats in the instance props
    lineage.prop.active = active
    lineage.prop.maxSlotGen = maxSlotGen
    lineage.prop.genSlots = genSlots
    lineage.prop.maxGen =  maxGen
    lineage.prop.maxSlots = maxSlots
    return lineage
}
