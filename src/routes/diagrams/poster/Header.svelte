<script>
    export let header
    $: titleHt = 3 * header.fontSize
    $: subTitleHt = 2 * header.fontSize
</script>

<text x={header.wd/2} y={0.5*header.ht}
        text-anchor="middle"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={titleHt}>
    Bevins-Heddens Lineage Routes
</text>

<text x={header.wd/2} y={0.9*header.ht}
        text-anchor="middle"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={subTitleHt}>
    Running Since 1500
</text>