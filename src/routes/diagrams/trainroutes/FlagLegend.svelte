<script>
    export let x
    export let y
    export let diam
    export let scale = 1
    const flags = ['CAN','ENG','FRA','GER','IRE','NET','NOR','SCO','SWE','USA','WAL','UNK']
</script>

{#each flags as flag, i}
    <g transform="translate({x}, {y}) scale({scale*diam/100})">
        <use x={0} y={i*120} xlink:href="#{flag}" 
            filter="url(#flag-lighting)"
            clip-path="url(#flag-clipper)" />
        <text x={120} y={i*120+60}
            font-size="48"
        >{flag}</text>
    </g>
{/each}
