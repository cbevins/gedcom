import { idGenCount, idGenSlot } from '$lib/Sylvan/class/Generations.js'
import { hydrateLineage } from './hydrateLineage.js'

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

    // Hydrate the Lineage.prop and individual node.prop
    hydrateLineage(lineage)
    const prop = lineage.prop
    const grid = {
        cols: prop.maxGen + 1,
        rows: prop.maxSlots //  idGenCount(maxSlotGen)
    }

    const geom = {
        active: lineage.prop.active,
        cell: cell,
        genSlots: prop.genSlots,        // number of families per generation
        grid: grid,
        height: cell.height * grid.rows,
        lineage: lineage,
        maxGen: prop.maxGen,            // index of highest generation
        maxSlotGen: prop.maxSlotGen,    // index of last generation wuth the maximum number of families
        maxSlots: prop.maxSlots,        // maximum number of families in any generation
        node: node,
        nodes: lineage.nodesBySeq(),
        scale: settings.scale,
        width: cell.width * grid.cols,
    }
    _setPositions(geom)

    // Alternative geometry with a fixed number of generations
    const geom2 = {...geom}
    const maxGen = 6
    geom2.active = _setPositions2(geom, maxGen)
    geom2.grid = {cols: maxGen+1, rows: 2**(maxGen)+1}
    geom2.height = cell.height * geom2.grid.rows
    geom2.width = cell.width * geom2.grid.cols
    geom2.maxSlotGen = maxGen
    console.log(`cols=${geom2.grid.cols}, rows=${geom2.grid.rows}`)
    return geom2
}

// Assign node locations
function _setPositions(geom) {
    const {cell, node} = geom
    for (let i=0; i<geom.active.length; i++) {
        const active = geom.active[i]
        active.prop.x = active.gen * cell.width + node.left
        const slotHt = geom.height / geom.genSlots[active.gen]
        active.prop.y = active.prop.genSlot * slotHt + slotHt / 2 + node.top
    }
}

// Assign node locations
function _setPositions2(geom, lastGen=5) {
    const {cell, node} = geom
    // Theorhetical height of a fully completed genealogy
    const fullHt = 2**(lastGen) * geom.cell.height
    const saved = []
    for (let i=0; i<geom.active.length; i++) {
        const active = geom.active[i]
        if (active.gen <= lastGen) {
            active.prop.x = active.gen * cell.width + node.left
            // Number of slots for this gen
            const nSlots = idGenCount(active.seq)
            // Which of the nslots this node belongs
            const mySlot = idGenSlot(active.seq)
            // Determine y center of mySlot
            const slotHt = fullHt / nSlots
            active.prop.y = mySlot * slotHt + slotHt/2 + node.top
            // console.log(`Seq=${active.seq} is mySlot=${mySlot} of nSlots=${nSlots} y=${active.prop.y}`)
            saved.push(active)
        }
    }
    return saved
}
