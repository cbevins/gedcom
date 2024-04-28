<script>
    import { onMount } from 'svelte'
    import { geometry1 } from './geometry1.js'
    import Background from './Background.svelte'
	import FlagLegend from './FlagLegend.svelte';
	import FlagSvgDefs from './FlagSvgDefs.svelte';
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
        window.scrollTo(geom.grid.yearX(1750), geom.grid.chanY(4))
    })
</script>

<Header channels={channels} {geom} />

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.vb.width} height={geom.vb.height}
    viewBox="0, 0, {geom.vb.width}, {geom.vb.height}" transform="scale(1)">

    <defs>
        <!-- Clips rectangular flags into round buttons -->
        <clipPath id="flag-clipper"><circle cx="50" cy="50" r="50" /></clipPath>
        <FlagSvgDefs />
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
    
    {#if true}
        <LargeFlag x="50" y="10" country='USA' scale="5" />
    {/if}

    {#if false}
        <NestedSvgExample x="250" y="250" />
    {/if}
</svg>
