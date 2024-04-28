<script>

</script>

<g id="CAN">
    <rect x="0" y="0" width="100" height="100" fill="white" stroke="black" stroke-width="0"/>
    <rect x="0" y="0" width="25" height="100" fill="red" />
    <rect x="75" y="0" width="25" height="100" fill="red" />
</g>
<g id="ENG">
    <rect x="0" y="0" width="100" height="100" fill="white" stroke="black" stroke-width="0"/>
    <line x1="50" y1="0" x2="50" y2="100" stroke="red" stroke-width="20" />
    <line x1="0" y1="50" x2="100" y2="50" stroke="red" stroke-width="20" />
</g>
<g id="FRA">
    <rect x="0" y="0" width="100" height="100" fill="white" stroke="black" stroke-width="0"/>
    <rect x="0" y="0" width="33" height="100" fill="#0055a4" />
    <rect x="67" y="0" width="33" height="100" fill="#ef4135" />
</g>
<g id="GER">
    <rect x="0" y="0" width="100" height="100" fill="red" stroke="black" stroke-width="0"/>
    <rect x="0" y="0" width="100" height="33" fill="black" />
    <rect x="0" y="67" width="100" height="33" fill="#ffcc00" />
</g>
<g id="IRE">
    <rect x="0" y="0" width="100" height="100" fill="white" stroke="black" stroke-width="0"/>
    <rect x="0" y="0" width="33" height="100" fill="#009A49" />
    <rect x="67" y="0" width="33" height="100" fill="#ff7900" />
</g>
<g id="NET">
    <rect x="0" y="0" width="100" height="100" fill="white" stroke="black" stroke-width="0"/>
    <rect x="0" y="0" width="100" height="33" fill="#ad1d25" />
    <rect x="0" y="67" width="100" height="33" fill="#1e4785" />
</g>
<g id="NOR">
    <rect x="0" y="0" width="100" height="100" fill="#ba0c2f" stroke="black" stroke-width="0"/>
    <line x1="50" y1="0" x2="50" y2="100" stroke="white" stroke-width="{400/22}" />
    <line x1="0" y1="50" x2="100" y2="50" stroke="white" stroke-width="{400/22}" />
    <line x1="50" y1="0" x2="50" y2="100" stroke="#00205b" stroke-width="{200/22}" />
    <line x1="0" y1="50" x2="100" y2="50" stroke="#00205b" stroke-width="{200/22}" />
</g>
<g id="SCO">
    <rect x="0" y="0" width="100" height="100" fill="#005eb8" stroke="black" stroke-width="0"/>
    <line x1="0" y1="0" x2="100" y2="100" stroke="white" stroke-width="20" />
    <line x1="0" y1="100" x2="100" y2="0" stroke="white" stroke-width="20" />
</g>
<g id="SWE">
    <rect x="0" y="0" width="100" height="100" fill="#006aa7" stroke="black" stroke-width="0"/>
    <line x1="50" y1="0" x2="50" y2="100" stroke="#ffcd00" stroke-width="20" />
    <line x1="0" y1="50" x2="100" y2="50" stroke="#ffcd00" stroke-width="20" />
</g>
<g id="UNK">
    <rect x="0" y="0" width="100" height="100" fill="gray" stroke="black" stroke-width="0"/>
</g>
<g id="USA">
    <rect x="0" y="0" width="100" height="100" fill="red" stroke="black" stroke-width="0"/>
    <rect x="0" y={2*100/13} width="100" height="{100/13}" fill="white" stroke="none" />
    <rect x="0" y={4*100/13} width="100" height="{100/13}" fill="white" stroke="none" />
    <rect x="0" y={6*100/13} width="100" height="{100/13}" fill="white" stroke="none" />
    <rect x="0" y={8*100/13} width="100" height="{100/13}" fill="white" stroke="none" />
    <rect x="0" y={10*100/13} width="100" height="{100/13}" fill="white" stroke="none" />
    <rect x="0" y={12*100/13} width="100" height="{100/13}" fill="white" stroke="none" />
    <rect x="0" y="0" width="50" height="{6*100/13}" fill="blue" stroke="none" />
    {#each Array(6) as unused, col}
        {#each Array(5) as unused, row}
            <circle cx={(2*col+1)*50/12} cy={(2*row+1)*60/13} r="1" fill="white" />
        {/each}
    {/each}
    {#each Array(5) as unused, col}
        {#each Array(4) as unused, row}
            <circle cx={(2*(col+1))*50/12} cy={(2*(row+1))*60/13} r="1" fill="white" />
        {/each}
    {/each}
</g>
<g id="WAL">
    <rect x="0" y="0" width="100" height="100" fill="green" stroke="black" stroke-width="0"/>
    <rect x="0" y="0" width="100" height="50" fill="white" />
</g>
