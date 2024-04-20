<script>
    import Union from '$lib/Sylvan/svelte/GenChartV2/Union.svelte'
    export let subject
    export let genData

    const drawGrid = false
    $: factor = .25
    $: node = {width: factor * 500, height: factor * 320,
        // The following are padding between the cell and the node
        left: factor * 100, right: factor * 100, top: factor * 20, bottom: factor * 20}

    // The following are recalculated by setGeometry()
    $: vb = {width: 4000, height: 4000}
    $: grid = {cols: 10, rows: 10}
    $: cell = {width: factor * 500, height: factor * 100}
    $: geom = {factor: factor}

    // OK, here we go...
    $: anodes = init(subject)   // only Anodes with at least 1 parent are in this array

    function init() {
        anodes = genData.prop.active
        geom = setGeometry()
        return anodes
    }

    function setGeometry() {
        grid = {
            cols: genData.prop.maxGen + 1,
            rows: genData.prop.maxSlots //  idGenCount(maxSlotGen)
        }
        cell = {
            width: node.width + node.left + node.right,     // for now, same size as a node
            height: node.height + node.top + node.bottom,   // for now, same size as a node
        }
        vb = {
            height: cell.height * grid.rows,
            width: cell.width * grid.cols
        }
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.x = anode.gen * cell.width + node.left
            const slotHt = vb.height / genData.prop.genSlots[anode.gen]
            anode.y = anode.prop.genSlot * slotHt + slotHt / 2 + node.top
        }
        console.log(`${grid.cols} cols, ${grid.rows} rows that are ${cell.width} x by ${cell.height} y (vb ${vb.width} by ${vb.height}).`)
        return {cell: cell, factor: factor, grid: grid, node: node, vb: vb}
    }
</script>

<svg xmlns="http://www.w3.org/2000/svg"
    width={vb.width} height={vb.height} viewBox="0, 0, {vb.width}, {vb.height}" transform="scale(1)">

    <!-- Background -->
    <rect class="grid" x="0" y="0" width={vb.width} height={vb.height} />
    
    <!-- Optional reference grid with labels -->
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