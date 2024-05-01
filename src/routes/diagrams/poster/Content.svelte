<script>
    import TrackNames from './TrackNames.svelte'
    import TrainStations from './TrainStations.svelte'
    import TrainTracks from './TrainTracks.svelte'
    export let content
</script>

<TrainTracks {content} />
<TrainStations {content} />
<TrackNames {content} />