<script>
    import TrainTrack from './TrainTrack.svelte'

    export let channels
    export let content
    $: channels = content.channels
    $: geom = content.geom

    function isRoot(node) { return node === channels.rootNode() }

    function x1(node) { return geom.yearX(node.birthYear) }
    
    function y1(node) { return geom.chanY(node.channel) }
    
    function x2(node) {
        return isRoot(node)
            ? geom.yearX(geom.yearMax)
            : geom.yearX(node.child.birthYear)
    }
    
    function y2(node) {
        return isRoot(node)
            ? geom.chanY(node.channel)
            : geom.chanY(node.child.channel)
    }
</script>

{#each channels.nodesBySeq() as node}
    <TrainTrack
        x1={x1(node)} y1={y1(node)}
        x2={x2(node)} y2={y2(node)}
        trackWidth={geom.trackWidth}
        color={geom.color(node)}
        scale={geom.scale} />
{/each}
