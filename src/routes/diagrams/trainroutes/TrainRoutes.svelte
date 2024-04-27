<script>
    import { onMount } from 'svelte'
    import { geometry1 } from './geometry1.js'
    import Background from './Background.svelte'
	import FlagSvgDef from './FlagSvgDef.svelte';
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
    $: yPerChan = factor * 72       // y units per channel/track in the ViewBox

    $: geom = geometry1(channels, factor, xPerYear, yPerChan,
        lineWidth, radius, fontSize)
    
    onMount(() => {
        window.scrollTo(geom.grid.yearX(1700), geom.grid.chanY(50))
    })
</script>

<Header channels={channels} {geom} />

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.vb.width} height={geom.vb.height}
    viewBox="0, 0, {geom.vb.width}, {geom.vb.height}" transform="scale(1)">

    <!-- Insert the flag <def></def> block and filter -->
    <FlagSvgDef radius={geom.grid.radius} />

    <!-- Draw the background grid -->
    <Background {geom} />
    
    <TrainTracks {channels} {geom} />
    
    <TrackStations {channels} {geom} />
    
    <TrackNames {channels} {geom} />
    
    <FlagLegend x="50" y="50" />
    
    {#if true}
        <LargeFlag x="50", y="10" country='USA' scale="5" />
    {/if}
    {#if false}
        <NestedSvgExample x="250", y="250"/>
    {/if}
</svg>
