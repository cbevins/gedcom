<script>
    export let guides   // boolean
    export let geom     // {wd: <n>, ht: <n>, label: <str>}
    $: textHt = guides.fontSize
</script>

{#if guides.borders}
    <rect class="guide" x="0" y="0" width={geom.wd} height={geom.ht} />
    {#if guides.labels}
        <text x="0" y={textHt} font-size={textHt}>{geom.label}</text>
        <text x="0" y={geom.ht} font-size={textHt}>{geom.label}</text>
        <text x={geom.wd} y={textHt} font-size={textHt} text-anchor="end">{geom.label}</text>
        <text x={geom.wd} y={geom.ht}  font-size={textHt} text-anchor="end">{geom.label}</text>
    {/if}
{/if}

<style>
    .guide {
        fill: none;
        stroke: red;
        stroke-width: 2;
    }
</style>