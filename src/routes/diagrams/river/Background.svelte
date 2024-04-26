<script>
    export let geom

    const grid = geom.grid
    const colWd = geom.grid.xPerCol
    const vb = geom.vb
</script>

<!-- Background -->
<rect class="grid" x="0" y="0" width={vb.width} height={vb.height} />

<!-- Year column lines -->
{#each Array(grid.cols) as unused, col}
    <line class="grid" x1={col * colWd} y1={0} x2={col * colWd} y2={vb.height} />
    <text class="grid" x={col * colWd} y={20}>{grid.yearMin + col * grid.yearsPerCol}</text>
{/each}

<!-- y midline -->
<line class="grid" x1={0} y1={vb.height/2} x2={vb.width} y2={vb.height/2} />

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