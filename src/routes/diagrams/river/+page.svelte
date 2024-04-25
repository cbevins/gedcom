<script>
    import { onMount } from 'svelte'
    import { Channels } from './Channels.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE THE STORE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: factor = 0.5
    $: yearWidth = factor * 24       // apply factor just once, right here
    $: chanHeight = factor * 72      // apply factor just once, right here
    $: lineWidth = factor * 10
    $: radius = factor * 20
    $: fontSize = factor * 24
    
    // The following are recalculated by setGeometry()
    $: vb = {width: 4000, height: 4000}
    $: grid = {minYear: 0, maxYear: 0}

    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: channels = init(subject)
    $: nodes = channels.nodesBySeq()

    function init(sub) {
        channels = new Channels(sub)
        setGeometry()
        return channels
    }
    
    onMount(() => {
        window.scrollTo(yearX(1700), chanY(50))
    })

    function setGeometry() {
        const colYears = 10                 // column tic span in years
        const yearMax = Math.trunc(new Date().getFullYear() / colYears) * colYears
        const yearMin = Math.trunc((channels.yearMin()-1) / colYears) * colYears
        console.log(`Year min ${channels.yearMin()}, max ${channels.yearMax()}`)
        grid = {
            cols: (yearMax - yearMin) / colYears,
            colYears: colYears,
            colWidth: colYears * yearWidth,
            rows: channels.channelMaxCount()+2,
            yearMin: yearMin,
            yearMax: yearMax,
            yearSpan: yearMax - yearMin,
            chanHeight: chanHeight,
            yearWidth: yearWidth           // user units width of 1 year after applying scale factor
        }
        vb = {
            height: grid.rows * grid.chanHeight,
            width: grid.cols * grid.colWidth
        }
    }

    // data path from subject to child
    function pathData(node, method=2) {
        if (node.child) {
            const x1 = yearX(node.birthYear)
            const y1 = chanY(node.channel)
            // const y1 = nodeY(node)
            const x2 = yearX(node.child.birthYear)
            // const y2 = nodeY(node.child)
            const y2 = chanY(node.child.channel)
            const move =  `M ${x1} ${y1} `
            // Right angle lines
            if (method === 0) return move + `L ${x2} ${y1} L ${x2} ${y2}`
            // Straight line 
            if (method === 1)  move + `M ${x1} ${y1} L ${x2} ${y2}`
            // Cubic Bezier
            if (method === 2) return move + `C ${x2} ${y1} ${x1} ${y2} ${x2} ${y2}`
        }
        return ''
    }

    function chanY(chan) { return (chan+1) * grid.chanHeight + grid.chanHeight / 2 }
    function nodeY(node) { return (node.y) * vb.height }

    function gender(node) { return node.person.isFemale() ? 'female' : 'male' }
    
    function nameText(node) { return node ? node.person.label() : '' }

    function nameX(node) {
        return (node && node.child) ? yearX((node.birthYear + node.child.birthYear) / 2) : 0
    }

    function nameY(node) { return node ? chanY(node.channel) - lineWidth : 0 }
    
    function yearX(year) { return (year - grid.yearMin) * grid.yearWidth }
</script>

<h3>River Channel Chart for {subject.label()}</h3>
<ul>
    <li>There are {nodes.length} Ancestors born from {channels.yearMin()} through {channels.yearMax()}
        ({channels.yearMax() - channels.yearMin() + 1} years).</li>
    <li>The displayed years are from {grid.yearMin} through {grid.yearMax} ({grid.yearSpan} years).</li>
    <li>There are {channels.channelMaxCount()} channels.</li>
    <li>The grid is {vb.width} ({grid.yearSpan} years x {grid.yearWidth} units/year) wide 
        and {vb.height} ({channels.channelMaxCount()} channels x {grid.chanHeight} units/channel) high.</li>
</ul>

<svg xmlns="http://www.w3.org/2000/svg"
    width={vb.width} height={vb.height} viewBox="0, 0, {vb.width}, {vb.height}" transform="scale(1)">

    <!-- Background -->
    <rect class="grid" x="0" y="0" width={vb.width} height={vb.height} />

    {#each Array(grid.cols) as unused, col}
        <line class="grid" x1={col * grid.colWidth} y1={0} x2={col * grid.colWidth} y2={vb.height} />
        <text class="grid" x={col * grid.colWidth} y={20}>{grid.yearMin + col * grid.colYears}</text>
    {/each}
    <line class="grid" x1={0} y1={vb.height/2} x2={vb.width} y2={vb.height/2} />
    
    {#each nodes as node, i}
        <path class={gender(node)} d={pathData(node)} stroke-width={lineWidth} />
    {/each}
    
    {#each nodes as node, i}
        <circle class={gender(node)+'Dot'} cx={yearX(node.birthYear)} cy={chanY(node.channel)} r={radius} />
    <!-- <circle class={gender(node)+'Dot'} cx={yearX(node.birthYear)} cy={nodeY(node)} r={radius} /> -->
    {/each}
    
    {#each nodes as node, i}
        <text x={nameX(node)} y={nameY(node)}
            text-anchor="middle" font-family="sans-serif" font-weight="lighter" font-size={fontSize}>
            {nameText(node)}
        </text>
    {/each}
</svg>

<style>
    .dot {
        fill: red;
        stroke: black;
        stroke-width: 1;
    }
    .femaleDot {
        fill: red;
        stroke: red;
    }
    .maleDot {
        fill: blue;
        stroke: blue;
    }
    .female {
        fill: none;
        stroke: red;
    }
    .male {
        fill: none;
        stroke: blue;
    }
    .grid {
        fill: lightgreen;
        font-family: Tahoma;
        font-size: 0.5em;
        font-weight: lighter;
        stroke: gray;
        stroke-width: 1;
    }
</style>