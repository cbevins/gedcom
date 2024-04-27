<script>
    import { onMount } from 'svelte'
    import Background from './Background.svelte'
    import Header from './Header.svelte'
    import Tracks from './Tracks.svelte'
    import TrackNames from './TrackNames.svelte'
    import TrackStations from './TrackStations.svelte'

    import CAN from '$lib/images/svg/CAN.svelte'
    import ENG from '$lib/images/svg/ENG.svelte'
    import FRA from '$lib/images/svg/FRA.svelte'
    import GER from '$lib/images/svg/GER.svelte'
    import IRE from '$lib/images/svg/IRE.svelte'
    import NET from '$lib/images/svg/NET.svelte'
    import NOR from '$lib/images/svg/NOR.svelte'
    import SCO from '$lib/images/svg/SCO.svelte'
    import SWE from '$lib/images/svg/SWE.svelte'
    import UNK from '$lib/images/svg/UNK.svelte'
    import USA from '$lib/images/svg/USA.svelte'
    import WAL from '$lib/images/svg/WAL.svelte'
    import WAL2 from '$lib/images/svg/WAL2.svelte'

    export let channels
    export let factor

    // Apply the scaling factor just once, right here
    $: lineWidth = factor * 20      // channel/track/line width in ViewBox units
    $: radius = factor * 20         // station/circle radius in ViewBox units
    $: fontSize = factor * 24       // channel Person name font size
    $: xPerYear = factor * 24       // x units per year in the ViewBox
    $: yPerChan = factor * 72       // y units per channel/track in the ViewBox

    $: geom = setVariableDiagramSizeGeometry(channels)
    
    onMount(() => {
        window.scrollTo(geom.grid.yearX(1700), geom.grid.chanY(50))
    })

    // TODO - Uses a fixed diagram width and height to determine
    // x units per year and y units per channel
    // based upon the Channels year span and number of channels.
    function setFixedDiagramSizeGeometry() {}

    // Uses a fixed x units per year and y units per channel
    // to determine the final diagram width and height
    // based upon the Channels year span and number of channels.
    function setVariableDiagramSizeGeometry() {
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
        <g id="NOR"><NOR d={diam()} /></g>
        <g id="SCO"><SCO d={diam()} /></g>
        <g id="SWE"><SWE d={diam()} /></g>
        <g id="UNK"><UNK d={diam()} /></g>
        <g id="USA"><USA d={diam()} /></g>
        <g id="WAL"><WAL d={diam()} /></g>
        <g id="WAL2"><WAL2 d={diam()} /></g>
    </defs>

    <filter id = "flag-lighting">
        <feGaussianBlur in = "SourceAlpha" stdDeviation = "4" result = "blur1"/>
        <feSpecularLighting result = "specOut" in = "blur1" specularExponent = "100" lighting-color = "#aaaaaa">
            <fePointLight x = "15" y = "10" z = "20"/>
        </feSpecularLighting>
        <feComposite in = "SourceGraphic" in2 = "specOut" operator = "arithmetic" k1 = "0" k2 = "1" k3 = "1" k4 = "0"/>
    </filter>

    <Background {geom} />
    <Tracks {channels} {geom} />
    <TrackStations {channels} {geom} />
    <TrackNames {channels} {geom} />

    <!-- USA Flag tests -->
    {#if true}
        <use x={50} y={5} href="#WAL2" transform="scale(5)" filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
        {#each ['CAN','ENG','FRA','GER','IRE','NET','NOR','SCO','SWE','USA','WAL','UNK'] as country, i}
            <use x={50} y={25+i*50} href="#{country}"
                filter="url(#flag-lighting)" clip-path="url(#flag-clipper)" /> 
            <text x={100} y={50+i*50}>{country}</text>
        {/each}
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
