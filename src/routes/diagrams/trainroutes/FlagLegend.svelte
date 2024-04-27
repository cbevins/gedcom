<script>
    export let x
    export let y
    const flags = ['CAN','ENG','FRA','GER','IRE','NET','NOR','SCO','SWE','USA','WAL','UNK']
</script>

<g transform="translate({x}, {y})">
    {#each flags as flag, i}
        <use x={0} y={i*50}
            href="#{flag}"
            filter="url(#flag-lighting)"
            clip-path="url(#flag-clipper)" /> 
        <text x={50} y={25+i*50}>{flag}</text>
    {/each}
</g>