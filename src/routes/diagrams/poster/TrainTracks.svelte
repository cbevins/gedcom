<script>
    export let channels
    export let content
    $: channels = content.channels
    $: geom = content.geom
    $: dashes = `${18/geom.scale} ${2/geom.scale}`

    // Return <path d=> data path from subject to child
        function pathData(node, method=0) {
        if (node.child) {
            const x1 = geom.yearX(node.birthYear)
            const y1 = geom.chanY(node.channel)
            const x2 = geom.yearX(node.child.birthYear)
            const y2 = geom.chanY(node.child.channel)
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

    // Returns a gender-based class name
    function color(node) { return node.person.isFemale() ? "red" : "blue" }
</script>

{#each channels.nodesBySeq() as node, i}
    <path d={pathData(node)}
        fill="none"
        stroke={color(node)}
        stroke-linejoin="round"
        stroke-dasharray={dashes}
        stroke-width={geom.trackWidth} />
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
