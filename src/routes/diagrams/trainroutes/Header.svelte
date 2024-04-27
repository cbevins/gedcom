<script>
    export let channels
    export let geom

    const nodes = channels.nodesBySeq()
    const grid = geom.grid
    const vb = geom.vb
</script>

<h3>River Channel Chart for {channels.rootPerson().label()}</h3>
<ul>
    <li>There are {nodes.length} Ancestors born from {channels.yearMin()} through {channels.yearMax()}
        ({channels.yearMax() - channels.yearMin() + 1} years).</li>
    <li>The grid displays years from {grid.yearMin} through {grid.yearMax} ({grid.yearSpan} years).</li>
    <li>The grid is {vb.width} ({grid.yearSpan} years x {grid.xPerYear} units/year) wide 
        and {vb.height} ({channels.channelMaxCount()} channels x {grid.yPerChan} units/channel) high.</li>
</ul>
