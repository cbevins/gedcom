<script>
    import { onMount } from 'svelte'
    import { geometry1 } from './geometry1.js'
    import Background from './Background.svelte'
	import FlagLegend from './FlagLegend.svelte';
    import Header from './Header.svelte'
    import LargeFlag from './LargeFlag.svelte'
    import NestedSvgExample from './NestedSvgExample.svelte'
    import TrainTracks from './TrainTracks.svelte'
    import TrackNames from './TrackNames.svelte'
    import TrackStations from './TrackStations.svelte'

    export let channels
    export let factor

    // Apply the scaling factor just once, right here
    $: lineWidth = factor * 20      // channel/track/line width in ViewBox units
    $: radius = factor * 20         // station/circle radius in ViewBox units
    $: fontSize = factor * 24       // channel Person name font size
    $: xPerYear = factor * 24       // x units per year in the ViewBox
    $: yPerChan = xPerYear * 4      // y units per channel/track in the ViewBox
    $: diam = 2 * radius

    $: geom = geometry1(channels, factor, xPerYear, yPerChan,
        lineWidth, radius, fontSize)

    onMount(() => {
        window.scrollTo(geom.grid.yearX(1850), geom.grid.chanY(4))
    })
</script>

<Header channels={channels} {geom} />

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.vb.width} height={geom.vb.height}
    viewBox="0, 0, {geom.vb.width}, {geom.vb.height}" transform="scale(1)">

    <defs>
        <!-- Clips rectangular flags into round buttons -->
        <clipPath id="flag-clipper"><circle cx="50" cy="50" r="50" /></clipPath>
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
        </g>
        <g id="WAL">
            <rect x="0" y="0" width="100" height="100" fill="green" stroke="black" stroke-width="0"/>
            <rect x="0" y="0" width="100" height="50" fill="white" />
        </g>
    </defs>

    <filter id = "flag-lighting">
        <feGaussianBlur in = "SourceAlpha" stdDeviation = "4" result = "blur1"/>
        <feSpecularLighting result = "specOut" in = "blur1" specularExponent = "100" lighting-color = "#aaaaaa">
            <fePointLight x = "40" y = "40" z = "40"/>
        </feSpecularLighting>
        <feComposite in = "SourceGraphic" in2 = "specOut" operator = "arithmetic" k1 = "0" k2 = "1" k3 = "1" k4 = "0"/>
    </filter>

    <!-- Draw the background grid -->
    <Background {geom} />

    <TrainTracks {channels} {geom} />
    
    <TrackStations {channels} {geom} />
    
    <TrackNames {channels} {geom} />
    
    <FlagLegend x="50" y="50" diam={diam} scale="1" />
    
    {#if false}
        <LargeFlag x="50" y="10" country='USA' scale="5" />
    {/if}

    {#if false}
        <NestedSvgExample x="250" y="250" />
    {/if}
</svg>
