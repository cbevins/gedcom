<script>
    export let channels
    export let geom

    function color(node) { return node.person.isFemale() ? "red" : "blue" }
    function x(node) { return geom.grid.yearX(node.birthYear) - geom.grid.radius }
    function y(node) { return geom.grid.chanY(node.channel) - geom.grid.radius }
</script>

{#each channels.nodesBySeq() as node}
    <use x={x(node)} y={y(node)} href="#usa" clip-path="url(#flag)" /> 
    <circle
        cx={geom.grid.yearX(node.birthYear)}
        cy={geom.grid.chanY(node.channel)}
        r={geom.grid.radius + 1*geom.grid.factor}
        fill="none"
        stroke={color(node)}
        stroke-width={4 * geom.grid.factor} />
{/each}
