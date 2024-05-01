<script>
    export let footer
    $: textHt = footer.fontSize
</script>

<text x={footer.wd-10} y={2*footer.ht/3}
        text-anchor="end"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={textHt}>
    Last Updated on April 30, 2024
</text>

<text x={10} y={2*footer.ht/3}
        text-anchor="start"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={textHt}>
    Copyright Collin Douglas Bevins, 2024
</text>