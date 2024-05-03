<script>
    import FlagLegend from './FlagLegend.svelte'
    import TimeLine from './TimeLine.svelte'
    import TrackNames from './TrackNames.svelte'
    import TrainStations from './TrainStations.svelte'
    import TrainTracks from './TrainTracks.svelte'
    import { US_Migrations, US_Wars} from './timelines.js'

    export let content
    $: geom = content.geom
</script>
    
<TimeLine {content} top={US_Migrations} bot={US_Wars} />

<svg x="0" y={geom.timeline.ht} width={content.wd} height={geom.height}>
    <TrainTracks {content} />
    <TrainStations {content} />
    <TrackNames {content} />
    <FlagLegend x={50/geom.scale} y={50/geom.scale} diam={2*geom.radius} scale="1" />
</svg>
