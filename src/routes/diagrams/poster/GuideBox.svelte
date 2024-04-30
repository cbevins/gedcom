<script>
    export let guides   // boolean
    export let geom     // {wd: <n>, ht: <n>, label: <str>}
    const textHt = 16
</script>

{#if guides}
    <rect class="guide" x="0" y="0" width={geom.wd} height={geom.ht} />
    <text x="0" y={textHt}>{geom.label}</text>
    <text x="0" y={geom.ht}>{geom.label}</text>
    <text x={geom.wd} y="16" text-anchor="end">{geom.label}</text>
    <text x={geom.wd} y={geom.ht} text-anchor="end">{geom.label}</text>
{/if}

<style>
    .guide {
        fill: none;
        stroke: red;
        stroke-width: 2;
    }
</style>