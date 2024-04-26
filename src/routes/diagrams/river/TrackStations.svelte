<script>
    export let channels
    export let geom

    // Returns a gender-based class name
    function gender(node) { return node.person.isFemale() ? 'female' : 'male' }
</script>

{#each channels.nodesBySeq() as node}
    <circle class={gender(node)}
        cx={geom.grid.yearX(node.birthYear)} cy={geom.grid.chanY(node.channel)} r={geom.grid.radius} />
    <!-- <circle cx={geom.grid.yearX(node.birthYear)} cy={geom.grid.chanY(node.channel)} r={3} fill="yellow"/> -->
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