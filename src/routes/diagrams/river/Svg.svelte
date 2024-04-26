<script>
    import { onMount } from 'svelte'
    import Background from './Background.svelte'
    import Header from './Header.svelte'
    import Tracks from './Tracks.svelte'
    import TrackNames from './TrackNames.svelte'
    import TrackStations from './TrackStations.svelte'

    export let channels
    export let factor

    // Apply the scaling factor just once, right here
    $: lineWidth = factor * 20      // channel/track/line width in ViewBox units
    $: radius = factor * 20         // station/circle radius in ViewBox units
    $: fontSize = factor * 24       // channel Person name font size
    $: xPerYear = factor * 24       // x units per year in the ViewBox
    $: yPerChan = factor * 72       // y units per channel/track in the ViewBox

    $: geom = setGeometry(channels)
    
    onMount(() => {
        window.scrollTo(geom.grid.yearX(1700), geom.grid.chanY(50))
    })

    function setGeometry() {
        const grid = {
            factor: factor,
            xPerYear: xPerYear,
            yPerChan: yPerChan,
            yearsPerCol: 10, // number of years between each column guide
            channels: channels.channelMaxCount()+2,
            lineWidth: lineWidth,   // channel/track line width
            lineStrokeWidth: lineWidth * 0.2,  // channel/track line width
            radius: radius,         // station/dot circle radius
            fontSize: fontSize,     
        }
        // Calculate grid first and last column values (in years)
        grid.yearMax = Math.trunc((channels.yearMax()+10) / grid.yearsPerCol) * grid.yearsPerCol
        grid.yearMin = Math.trunc((channels.yearMin()-1) / grid.yearsPerCol) * grid.yearsPerCol
        grid.yearSpan = grid.yearMax - grid.yearMin
        // Calculate grid number and width of year columns
        grid.cols = (grid.yearMax - grid.yearMin) / grid.yearsPerCol
        grid.xPerCol = grid.yearsPerCol * grid.xPerYear
        // Calculate grid number and height of channels/rows
        grid.rows = grid.channels
        // Function that returns x-coordinate for the year
        grid.yearX = function (year) { return (year - this.yearMin) * this.xPerYear }
        // Function that returns y-coordinate of channel index
        grid.chanY = function (chan) { return (chan+1) * this.yPerChan + this.yPerChan / 2 }
        // Function that returns x-coordinate of center point for name label
        grid.nameX = function (node) {
            return (node && node.child) ? this.yearX((node.birthYear + node.child.birthYear) / 2) : 0
        }
        // Function that returns y-coordinate for name label
        grid.nameY = function (node) { return node ? this.chanY(node.channel) - this.lineWidth : 0 }

        // Calculate the ViewBox
        const vb = {
            height: grid.channels * grid.yPerChan,
            width: grid.xPerYear * grid.yearSpan
        }
        return {grid: grid, vb: vb}
    }
    function diam() { return 2 * geom.grid.radius }
    function rad() { return geom.grid.radius }
    function scale() { return geom.grid.radius / 100 }
    function starX(col) { return col * (diam()/2/6) + (diam()/2/6/2)}
    function starY(row) { return row * 6*diam()/13/5 + 6*diam()/13/5/2}
</script>
<Header channels={channels} {geom} />

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.vb.width} height={geom.vb.height}
    viewBox="0, 0, {geom.vb.width}, {geom.vb.height}" transform="scale(1)">

    <defs>
        <clipPath id="flag">
            <circle cx={rad()} cy={rad()} r={rad()} />
        </clipPath>
        <g id="usa">
            <rect x="0" y="0" width={diam()} height={diam()} fill="red" stroke="black" stroke-width="1"/>
            {#each Array(6) as unused, i}
                <rect x="0" width={diam()} height={diam()/13} y={2 * i * diam()/13 + diam()/13}
                    fill="white" stroke-width="0"></rect>
            {/each}
            <rect x="0" y="0" width={diam()/2} height={6*diam()/13} fill="blue" stroke-width="0"></rect>
            {#each Array(5) as unused, row}
                {#each Array(6) as unused, col}
                    <circle cx={starX(col)} cy={starY(row)} r={factor} fill="white" />
                {/each}
            {/each}
        </g>
    </defs>

    <Background {geom} />
    <Tracks {channels} {geom} />
    <TrackStations {channels} {geom} />
    <TrackNames {channels} {geom} />
 
    <!-- Nest SVG examples -->
    {#if true}
    <svg x="250" y="250" width="750" height="500" style="background: gray">
        <svg x="200" y="200">
            <circle cx="50" cy="50" r="50" style="fill: red" />
            <text x="50" y="50">1</text>
            <rect x="0" y="0" width="200" height="200" fill="none" stroke="red" />
        </svg>
        <circle cx="50" cy="50" r="50" style="fill: yellow" />
        <text x="50" y="50">2</text>
        <rect x="0" y="0" width="750" height="500" fill="none" stroke="yellow" />
    </svg>
    {/if}

</svg>

<style>
    .dot {
        fill: red;
        stroke: black;
        stroke-width: 1;
    }
</style>
