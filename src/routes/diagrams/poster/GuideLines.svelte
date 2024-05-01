<script>
    export let guides
    export let sheet        // object with {wd:, ht:, upi:}
    export let lpi = 4      // guide lines per inch

    // Returns an array of y-coordinates for 0.25" vertical guide lines
    function pos(units) {
        const lines = (lpi * Math.trunc(units / sheet.upi))
        const upl = units / lines   // units per line
        const pos = []
        for(let i=0; i<=lines; i++) pos.push(i * upl)
        return pos
    }
</script>

{#if guides.lines}
    {#each pos(sheet.wd) as x, i }
        {#if i%lpi}
            <line class="guide-dash" x1={x} y1={0} x2={x} y2={sheet.ht} />
        {:else}
            <line class="guide-solid" x1={x} y1={0} x2={x} y2={sheet.ht} />
            <text x={x} y="16" text-anchor="middle">{Math.trunc(i/lpi)}</text>
        {/if}
    {/each}

    {#each pos(sheet.ht) as y, i }
        {#if i%lpi}
            <line class="guide-dash" x1={0} y1={y} x2={sheet.wd} y2={y} />
        {:else}
            <line class="guide-solid" x1={0} y1={y} x2={sheet.wd} y2={y} />
            <text x={0} y={y+6} text-anchor="start">{Math.trunc(i/lpi)}</text>
        {/if}
    {/each}
{/if}

<style>
    .guide-dash {
        fill: none;
        stroke: grey;
        stroke-dasharray: 10 10;
        stroke-opacity: 0.5;
        stroke-width: 1;
    }
    .guide-solid {
        fill: none;
        stroke: grey;
        stroke-opacity: 0.5;
        stroke-width: 1;
    }
</style>
