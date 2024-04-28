<script>
    export let channels
    export let geom

    // Returns text displayed above the channel track
    function mainText(node) { return node ? node.person.label() : '' }
    function subText(node) {
        let more = ''
        if (node.person.isFemale()) {
            const n = node.person.children().length
            more = (n===1) ? ' (1 child)' : ` (${n} children)`
        }
        return node.person.birthPlace().text() + more
    }
</script>

{#each channels.nodesBySeq() as node}
    <text x={geom.grid.nameX(node)} y={geom.grid.nameY(node)}
            text-anchor="middle" font-family="sans-serif" font-weight="bold"
            font-size={0.8*geom.grid.fontSize}>
        {mainText(node)}
    </text>

    <text x={geom.grid.nameX(node)} y={geom.grid.nameY(node) + 1.8*geom.grid.lineWidth}
            text-anchor="middle" font-family="sans-serif" font-weight="lighter"
            font-size={0.7*geom.grid.fontSize}>
        {subText(node)}
    </text>
{/each}
