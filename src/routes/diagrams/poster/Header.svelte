<script>
    export let layout
    $: header = layout.header
    $: content = layout.content
    $: geom = content.geom
    $: channels = geom.channels
    $: rootNode =  channels.rootNode()

    $: father = rootNode.father.person.nameSurnames()
    $: mother = rootNode.mother.person.nameSurnames()
    $: title = `${father}-${mother} Lineage Map`
    
    $: titleHt = 3 * header.fontSize
    $: subTitleHt = 2 * header.fontSize
</script>

<text x={header.wd/2} y={0.5*header.ht}
        text-anchor="middle"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={titleHt}>
    {title}
</text>

<text x={header.wd/2} y={0.9*header.ht}
        text-anchor="middle"
        font-family="sans-serif"
        font-weight="lighter"
        font-size={subTitleHt}>
    Running Since {channels.yearMin()}
</text>