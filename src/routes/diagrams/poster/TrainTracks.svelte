<script>
    export let channels
    export let content
    $: channels = content.channels
    $: geom = content.geom
    $: dashes = `${0.3 * geom.trackWidth / geom.scale} ${0.3 * geom.trackWidth /geom.scale}`
    $: offset = 0.2 * geom.trackWidth

    // Return <path d=> data path from subject to child
    function pathData(node, offset, method=0) {
        const x1 = geom.yearX(node.birthYear) + offset
        const y1 = geom.chanY(node.channel) + offset
        let x2, y2
        if (node.child) {
            x2 = geom.yearX(node.child.birthYear) + offset
            y2 = geom.chanY(node.child.channel) + offset
        } else if (node === channels.rootNode()) {
            x2 = geom.yearX(geom.yearMax) + offset
            y2 = y1 + offset
        } else {
            return ''
        }
        const move =  `M ${x1} ${y1} `
        // Right angle lines
        if (method === 0) return move + `L ${x2} ${y1} L ${x2} ${y2}`
        // Straight line 
        if (method === 1)  return move + `M ${x1} ${y1} L ${x2} ${y2}`
        // Cubic Bezier
        if (method === 2) return move + `C ${x2} ${y1} ${x1} ${y2} ${x2} ${y2}`
        return ''
    }
</script>

{#each channels.nodesBySeq() as node, i}
    <path d={pathData(node, 0)}
        fill="none"
        stroke={geom.color(node)}
        stroke-linejoin="round"
        stroke-dasharray={dashes}
        stroke-width={geom.trackWidth} />

    <path d={pathData(node, offset)}
        fill="none"
        stroke={geom.color(node)}
        stroke-linejoin="round"
        stroke-width="1" />

    <path d={pathData(node, -offset)}
        fill="none"
        stroke={geom.color(node)}
        stroke-linejoin="round"
        stroke-width="1" />
{/each}
