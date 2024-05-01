<script>
    export let content
    $: channels = content.channels
    $: geom = content.geom

    function birthPlace(node) {
        return node.person.birthPlace().text()
    }

    function children(node) {
        let str = ''
        if (node.person.isFemale()) {
            const n = node.person.children().length
            str = (n===1) ? ' (1 child)' : ` (${n} children)`
        }
        return str
    }

    function suffixNoSeq(suffix) {
        let idx = suffix.search("#")
        return (idx >= 0) ? (suffix.slice(0, idx-1)).trim() : suffix.trim()
    }

    function firstNames(node) {
        return node
            ? '#' + node.seq + ' '
                + (node.person.namePrefix()
                + ' ' + node.person.nameGiven()).trim()
            : ''
    }
    
    function lastNames(node) {
        return node
            ? (node.person.nameSurnames() + ' '
                + suffixNoSeq(node.person.nameSuffix())).trim()
                + node.person.lifeSpan()
            : ''
    }
</script>

{#each channels.nodesBySeq() as node}
    <text   x={geom.nameX(node)}
            y={geom.nameY(node) - geom.fontSize}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="bold"
            font-size={geom.fontSize}>
        {firstNames(node)}
    </text>

    <text   x={geom.nameX(node)}
            y={geom.nameY(node) - 0.05*geom.fontSize}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="bold"
            font-size={geom.fontSize}>
        {lastNames(node)}
    </text>

    <text   x={geom.nameX(node)}
            y={geom.nameY(node) + 2*geom.trackWidth}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="lighter"
            font-size={geom.fontSize}>
        {birthPlace(node)}
    </text>

    <text   x={geom.nameX(node)}
            y={geom.nameY(node) + 3*geom.trackWidth}
            text-anchor="middle"
            font-family="sans-serif"
            font-weight="lighter"
            font-size={geom.fontSize}>
        {children(node)}
    </text>
{/each}
