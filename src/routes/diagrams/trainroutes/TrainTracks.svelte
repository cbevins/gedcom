<script>
    export let channels
    export let geom

    // Track section dimensions
    const secLength = geom.grid.xPerYear
    const secWidth = 0.6 * geom.grid.lineWidth
    
    // Returns a gender-based class name
    function gender(node) { return node.person.isFemale() ? 'female' : 'male' }

    // Returns an array of coordinates for placing horizontal track sections
    function horizontal(node) {
        const ar = []
        const y = geom.grid.chanY(node.channel)
        const endYear = node.child ? node.child.birthYear : node.birthYear + 30
        for(let year=node.birthYear; year<endYear; year++) {
            const x = geom.grid.yearX(year)
            ar.push([x, y])
        }
        return ar
    }

    // Returns an array of coordinates for placing vertical track sections
    function vertical(node) {
        const ar = []
        if(node.child) {
            const begChan = Math.max(node.channel, node.child.channel)
            const x = geom.grid.yearX(node.child.birthYear)
            const sections = 4 * Math.abs(node.channel - node.child.channel)
            const y = geom.grid.chanY(begChan) - 0.65 * secLength
            for(let i=0; i<sections; i++) ar.push([x, y-i*secLength])
        }
        return ar
    }
</script>

{#each channels.nodesBySeq() as node, i}
    {#each horizontal(node) as [x, y]}
        {#if node === channels.rootNode() }
            <rect class={gender(node)} x={x} y={y-secWidth/2}
                width={0.9*secLength} height={secWidth} />
        {:else}
            <rect class={gender(node)} x={x} y={y-secWidth/2}
                width={0.9*secLength} height={secWidth} />
        {/if}
    {/each}
    {#each vertical(node) as [x, y], i}
        <rect class={gender(node)} x={x-secWidth/2} y={y}
            width={secWidth} height={0.9*secLength} />
    {/each}
{/each}

<style>
    .female {
        fill: red;
        stroke: red;
    }
    .male {
        fill: blue;
        stroke: blue;
    }
</style>
