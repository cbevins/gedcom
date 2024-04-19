<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { idGenCount, idGenSlot } from '$lib/Sylvan/class/Generations.js'
    import Union from '$lib/Sylvan/svelte/GenChartV2/Union.svelte'
    export let sylvan
    export let subjectNameKey

    const drawGrid = false
    let disc = null
    $: factor = 1
    $: node = {width: factor * 500, height: factor * 320,
        // The following are padding between the cell and the node
        left: factor * 100, right: factor * 100, top: factor * 20, bottom: factor * 20}

    $: maxGen = 20                  // index of generation wuth most families
    $: maxSlots = 32                // maximum number of families in any generation
    $: maxSlotGen = 0               // index of last generation wuth the maximum number of families
    $: genSlots = Array(20).fill(0) // number of families per generation

    // The following are recalculated by setGeometry()
    $: vb = {width: 4000, height: 4000}
    $: grid = {cols: 10, rows: 10}
    $: cell = {width: factor * 500, height: factor * 100}
    $: geom = {factor: factor}

    // OK, here we go...
    $: subject = sylvan.people().find(subjectNameKey)
    $: anodes = init(subject)   // only Anodes with at least 1 parent are in this array

    function init(subject) {
        anodes = createAnodes(subject)
        geom = setGeometry()
        return anodes
    }

    function createAnodes(subject) {
        // Create the subject's ancestor nodes
        disc = new Anodes(subject)
        anodes = disc.anodesBySeq()
        const active = []               // Anodes with at least 1 known parent
        maxGen = 0                      // index of generation wuth most families
        maxSlots = 0                    // maximum number of families in any generation
        maxSlotGen = 0                  // index of last generation wuth the maximum number of families
        genSlots = Array(20).fill(0)    // number of families per generation
        // Add Anode properties required by this diagram
        let lastGen = -1
        let genSlot = -1
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.prop.label = anode.person.fullName()
            // Because this is a *parent* based chart, only use Anodes with at least 1 parent
            anode.prop.active = (anode.fatherAnode || anode.motherAnode)
            if (anode.prop.active ) {
                if (anode.gen > lastGen) genSlot = -1
                genSlot++
                lastGen = anode.gen
                anode.prop.genSlot = genSlot
                maxGen = Math.max(maxGen, anode.gen)
                genSlots[anode.gen]++
                active.push(anode)
            }
        }
        for(let i=0; i<=maxGen; i++) {
            if (genSlots[i] >= maxSlots) {
                maxSlots = genSlots[i]
                maxSlotGen = i
            }
        }
        console.log(`${active.length} Anodes, Gens 0-${maxGen}, ${maxSlots} max Anodes in Gen ${maxSlotGen}`)
        return active
    }

    function setGeometry() {
        grid = {
            cols: maxGen + 1,
            rows: maxSlots //  idGenCount(maxSlotGen)
        }
        cell = {
            width: node.width + node.left + node.right,     // for now, same size as a node
            height: node.height + node.top + node.bottom,    // for now, same size as a node
        }
        vb = {
            height: cell.height * grid.rows,
            width: cell.width * grid.cols
        }
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.x = anode.gen * cell.width + node.left
            const slotHt = vb.height / genSlots[anode.gen]
            anode.y = anode.prop.genSlot * slotHt + slotHt / 2 + node.top
        }
        console.log(`${grid.cols} cols, ${grid.rows} rows that are ${cell.width} x by ${cell.height} y (vb ${vb.width} by ${vb.height}).`)
        return {cell: cell, factor: factor, grid: grid, node: node, vb: vb}
    }
</script>

<svg xmlns="http://www.w3.org/2000/svg"
    width={vb.width} height={vb.height} viewBox="0, 0, {vb.width}, {vb.height}" transform="scale(1)">

    <!-- Reference grid background with labels -->
    <rect class="grid" x="0" y="0" width={vb.width} height={vb.height} />

    {#if drawGrid}
        {#each Array(grid.cols) as unused, col}
            {#each Array(grid.rows) as moreUnused, row}
                <rect class="grid" x={col*cell.width} y={row * cell.height} width={cell.width} height={cell.height} /> 
                <text class="grid"  x={col*cell.width + cell.width/2 - 10}
                    y={row*cell.height + cell.height/2+6}>{col},{row}</text>
            {/each}
        {/each}
    {/if}

    {#each anodes as anode}
        <Union anode={anode} geom={geom}/>
    {/each}

</svg>

<style>
    .grid {
        fill: lightgreen;
        font-family: Tahoma;
        font-size: 0.5em;
        font-weight: lighter;
        stroke: gray;
        stroke-width: 1;
    }
</style>