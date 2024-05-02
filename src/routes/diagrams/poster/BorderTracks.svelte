<script>
    export let border
    $: bt = border.thickness / 2
    $: offsets = [2 * bt / 10, 8 * bt / 10]
</script>

<path d="M 0 0 L {border.wd} 0 L {border.wd} {border.ht} L 0 {border.ht} L 0 0"
    fill="none" stroke="black"
    stroke-dasharray="4 4"
    stroke-width={border.thickness}
    stroke-linejoin="miter"
/>

{#each offsets as d}
    <path d="M {d} {d} L {border.wd-d} {d} L {border.wd-d} {border.ht-d} L {d} {border.ht-d} L {d} {d}"
        fill="none" stroke="black"
        stroke-width="1"
    />
{/each}
