<script>
    export let channels
    export let geom

    function across(node) {
        const path = []
        if(node.child) {
            const xoffset = 0.4*geom.grid.lineWidth
            const y = geom.grid.chanY(node.channel) - 0.3 * geom.grid.lineWidth
            const h = 0.6 * geom.grid.lineWidth
            const w = 0.8 * geom.grid.xPerYear
            for (let year=node.birthYear; year<node.child.birthYear; year++) {
                const x = geom.grid.yearX(year) + 0.1 * geom.grid.xPerYear
                path.push([x + xoffset, y, w, h])
            }
        }
        return path
    }

    function down(node) {
        const path = []
        if(node.child) {
            const x = geom.grid.yearX(node.child.birthYear) - 0.25 * geom.grid.xPerYear
            const w = 0.6 * geom.grid.lineWidth
            const h = 0.8 * geom.grid.xPerYear
            const y0 = geom.grid.chanY(node.channel) + 0.5 * geom.grid.lineWidth
            const y1 = geom.grid.chanY(node.child.channel)
            for (let y=y0; y<y1-1; y+=geom.grid.xPerYear) {
                path.push([x, y, w, h])
            }
        }
        return path
    }
    
    // Returns a gender-based class name
    function gender(node) { return node.person.isFemale() ? 'female' : 'male' }

    // Return <path d=> data path from subject to child
        function pathData(node, method=0) {
        if (node.child) {
            const x1 = geom.grid.yearX(node.birthYear)
            const y1 = geom.grid.chanY(node.channel)
            const x2 = geom.grid.yearX(node.child.birthYear)
            const y2 = geom.grid.chanY(node.child.channel)
            const move =  `M ${x1} ${y1} `
            // Right angle lines
            if (method === 0) return move + `L ${x2} ${y1} L ${x2} ${y2}`
            // Straight line 
            if (method === 1)  move + `M ${x1} ${y1} L ${x2} ${y2}`
            // Cubic Bezier
            if (method === 2) return move + `C ${x2} ${y1} ${x1} ${y2} ${x2} ${y2}`
        }
        return ''
    }
</script>

{#each channels.nodesBySeq() as node}
    <!-- Channel/track lines -->
    <path class={gender(node)} d={pathData(node)} stroke-width={geom.grid.lineWidth} />

    <!-- Horizontal track pattern -->
    {#each across(node) as [x, y, w, h] }
        <rect x={x} y={y} width={w} height={h} fill="white" stroke-width={0}/>
    {/each}
    
    <!-- Vertical track pattern -->
    {#each down(node) as [x, y, w, h] }
        <rect x={x} y={y} width={w} height={h} fill="white" stroke-width={0}/>
    {/each}
{/each}

<style>
    .female {
        fill: none;
        stroke: red;
    }
    .male {
        fill: none;
        stroke: blue;
    }
</style>
