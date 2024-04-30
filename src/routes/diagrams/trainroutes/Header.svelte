<script>
    export let channels
    export let geom

    const nodes = channels.nodesBySeq()
    const grid = geom.grid
    const vb = geom.vb
    
    const height = Math.trunc(vb.height)
    const width = Math.trunc(vb.width)
    const xPerYear = Math.trunc(grid.xPerYear)
    const yPerChan = Math.trunc(grid.yPerChan)
    const ratio = round2(vb.width/vb.height)
    function round2(num) { return Math.round((num + Number.EPSILON) * 100) / 100 }
</script>

<h3>River Channel Chart for {channels.rootPerson().label()}</h3>
<ul>
    <li>There are {nodes.length} Ancestors born from {channels.yearMin()} through {channels.yearMax()}
        ({channels.yearMax() - channels.yearMin() + 1} years).</li>
    <li>The grid displays years {grid.yearMin} through {grid.yearMax} ({grid.yearSpan} years).</li>
    <li>The grid is {width} ({grid.yearSpan} years x {xPerYear} units/year) wide 
        and {height} ({channels.channelMaxCount()} channels x {yPerChan} units/channel) high
        ({ratio} w x 1 h).</li>
</ul>
