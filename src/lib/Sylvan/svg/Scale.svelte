<script>
    $: cols = 600
    $: rows = 64
    $: colWd = 100
    $: rowHt = 100
    $: width = cols * colWd
    $: height = rows * rowHt
    $: scale = 1
</script>
<p></p>
<svg xmlns="http://www.w3.org/2000/svg"
    width={width} height={height}
    viewBox='0 0 {width} {height}'
    preserveAspectRatio='xMaxYMax meet'
    transform="scale({scale})">

    <!-- Reference grid background with labels -->
    <rect class="grid" x="0" y="0" width={width} height={height} />
    {#each Array(cols) as unused, col}
        {#each Array(rows) as moreUnused, row}
            <rect class="grid" x={col*colWd} y={row*rowHt} width={colWd} height={rowHt} /> 
            <text class="grid" x={col*colWd+colWd/2-20} y={row*rowHt+rowHt/2+5}>{row}, {col}</text> 
        {/each}
    {/each}
</svg>

<style>
    .grid {
        fill: lightgreen;
        stroke: black;
        stroke-linecap: round;
        stroke-width: 1;
        font-size: 100%;
        font-weight:lighter
    }
</style>