<script>
    export let geom
    export let height
    export let timeline

    const grid = geom.grid
    const colWd = geom.grid.xPerCol
    const factor = geom.grid.factor
    const vb = geom.vb

    function fromX(event) { return geom.grid.yearX(event.from[0]) }
    function thruX(event) { return geom.grid.yearX(event.thru[0]) }
    function labelY(i) { return height - (1+i%3) * height/4 }
</script>

<!-- Background -->
<rect class="grid" x="0" y="0" width={vb.width} height={height} />

<!-- Year labels -->
{#each Array(grid.cols) as unused, col}
    <text x={col * colWd} y={height}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="lighter"
            font-size={factor * height/4}>
        {grid.yearMin + col * grid.yearsPerCol}
    </text>
{/each}

<!-- Event labels -->
{#each timeline as event, i}
    <line x1={fromX(event)} y1={height} x2={fromX(event)} y2={labelY(i)}
        line-cap="round" stroke="red" fill="none" stroke-opacity="0.5" stroke-width="4" />
    <text x={fromX(event)} y={labelY(i)}
        text-anchor="left"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={0.7 * geom.grid.fontSize}>
        {event.label}
    </text>
{/each}

<style>
    .grid {
        fill: gray;
        stroke: gray;
        stroke-width: 1;
    }
</style>