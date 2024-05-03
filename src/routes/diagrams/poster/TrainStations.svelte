<script>
    import TrainStation1 from './TrainStation1.svelte'
    import TrainStation from './TrainStation.svelte'
    export let content

    $: channels = content.channels
    $: geom = content.geom

    // Return the center of the flag SVG rect
    function x(node) { return geom.yearX(node.birthYear) }
    function y(node) { return geom.chanY(node.channel) }
</script>

{#each channels.nodesBySeq() as node}
    <!-- <TrainStation1 {geom} {node} /> -->

    <TrainStation cx={x(node)} cy={y(node)} {geom} {node} />
{/each}
