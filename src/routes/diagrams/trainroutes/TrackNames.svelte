<script>
    export let channels
    export let geom

    // Returns text displayed above the channel track
    function nameText(node) { return node ? node.person.label() : '' }
</script>

{#each channels.nodesBySeq() as node}
    <text x={geom.grid.nameX(node)} y={geom.grid.nameY(node)}
            text-anchor="middle" font-family="sans-serif" font-weight="lighter"
            font-size={geom.grid.fontSize}>
        {nameText(node)}
    </text>
{/each}
