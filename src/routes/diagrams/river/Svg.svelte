<script>
    import { onMount } from 'svelte'
    import Background from './Background.svelte'
    import Header from './Header.svelte'
    import Tracks from './Tracks.svelte'
    import TrackNames from './TrackNames.svelte'
    import TrackStations from './TrackStations.svelte'

    import CAN from './CAN.svelte'
    import ENG from './ENG.svelte'
    import FRA from './FRA.svelte'
    import GER from './GER.svelte'
    import IRE from './IRE.svelte'
    import NET from './NET.svelte'
    import SCO from './SCO.svelte'
    import SWE from './SWE.svelte'
    import UNK from './UNK.svelte'
    import USA from './USA.svelte'
    import WAL from './WAL.svelte'

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
</script>
<Header channels={channels} {geom} />

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.vb.width} height={geom.vb.height}
    viewBox="0, 0, {geom.vb.width}, {geom.vb.height}" transform="scale(1)">

    <defs>
        <!-- MUST BE DEFINED HERE, AS ITS USED BY SUVCOMPONENTS!! -->
        <clipPath id="flag-clipper"><circle cx={rad()} cy={rad()} r={rad()} /></clipPath>
        <!-- FLAGS -->
        <g id="CAN"><CAN d={diam()} /></g>
        <g id="ENG"><ENG d={diam()} /></g>
        <g id="FRA"><FRA d={diam()} /></g>
        <g id="GER"><GER d={diam()} /></g>
        <g id="IRE"><IRE d={diam()} /></g>
        <g id="NET"><NET d={diam()} /></g>
        <g id="SCO"><SCO d={diam()} /></g>
        <g id="SWE"><SWE d={diam()} /></g>
        <g id="UNK"><UNK d={diam()} /></g>
        <g id="USA"><USA d={diam()} /></g>
        <g id="WAL"><WAL d={diam()} /></g>
    </defs>

    <filter id = "flag-lighting">
        <feGaussianBlur in = "SourceAlpha" stdDeviation = "4" result = "blur1"/>
        <feSpecularLighting result = "specOut" in = "blur1" specularExponent = "100" lighting-color = "#aaaaaa">
            <fePointLight x = "10" y = "10" z = "20"/>
        </feSpecularLighting>
        <feComposite in = "SourceGraphic" in2 = "specOut" operator = "arithmetic" k1 = "0" k2 = "1" k3 = "1" k4 = "0"/>
    </filter>

    <Background {geom} />
    <Tracks {channels} {geom} />
    <TrackStations {channels} {geom} />
    <TrackNames {channels} {geom} />

    <!-- USA Flag tests -->
    {#if true}
        <use x={0} y={0} href="#SCO" transform="scale(5)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <use x={100} y={200} href="#CAN" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={225}>CAN</text>
        <use x={100} y={250} href="#ENG" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={275}>ENG</text>
        <use x={100} y={300} href="#FRA" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={325}>FRA</text>
        <use x={100} y={350} href="#GER" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={375}>GER</text>
        <use x={100} y={400} href="#IRE" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={425}>IRE</text>
        <use x={100} y={450} href="#NET" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={475}>NET</text>
        <use x={100} y={500} href="#SCO" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={525}>SCO</text>
        <use x={100} y={550} href="#SWE" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={575}>SWE</text>
        <use x={100} y={600} href="#USA" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={625}>USA</text>
        <use x={100} y={650} href="#WAL" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={675}>WAL</text>
        <use x={100} y={700} href="#UNK" transform="scale(1)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        <text x={150} y={755}>UNK</text>
        {/if}

    <!-- Nest SVG examples -->
    {#if false}
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
