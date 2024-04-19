<script>
    export let x
    export let y
    export let factor
    export let content
</script>

<text x={x} y={y} text-anchor="middle" font-family="sans-serif" font-weight="lighter" font-size={16 * factor}>
    {content}
</text>
