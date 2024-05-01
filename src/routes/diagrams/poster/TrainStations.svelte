<script>
    export let content
    $: channels = content.channels
    $: geom = content.geom

    // Returns a gender-based class name
    function color(node) { return node.person.isFemale() ? "red" : "blue" }
</script>

{#each channels.nodesBySeq() as node, i}
    <circle
            cx={geom.yearX(node.birthYear)}
            cy={geom.chanY(node.channel)}
            r={geom.radius}
            stroke={color(node)}
            stroke-width={4 / geom.scale}
            fill="none" />

    <text x={geom.yearX(node.birthYear)}
            y={geom.chanY(node.channel) + 1.6 * geom.radius}
            font-size={0.7*geom.fontSize}
            text-anchor="middle">
        {node.birthYear}
    </text>
{/each}
