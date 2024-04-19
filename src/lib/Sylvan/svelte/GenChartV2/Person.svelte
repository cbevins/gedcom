<script>
    import { idGenAbbr } from '$lib/Sylvan/class/Generations.js'
    export let anode
    export let geom
    export let subject
    export let x
    export let y
    export let width
    export let height

    const bottom = 5 * geom.factor  // padding between bottom of tag rect and the text baseline
    const left = 40 * geom.factor   // padding between tag left edge and start of text

    function content() {
        let text = anode ? `${idGenAbbr(anode.seq)}: ${anode.prop.label}` : 'unknown'
        if (subject==='subject')
            text = `${anode.gen}:${anode.seq} ${text}`
        return text
    }
</script>

<rect class={subject} x={x} y={y} width={width} height={height} /> 
<text x={x+left} y={y+height-bottom}
    font-family="sans-serif" font-weight="lighter" font-size={16 * geom.factor}>
    {content()}
</text>

<style>
    .father {
        fill: cyan;
        stroke: cyan;
        stroke-width: 1;
    }
    .mother {
        fill: pink;
        stroke: pink;
        stroke-width: 1;
    }
    .subject {
        fill: none;
        stroke: black;
        stroke-width: 0;
    }
</style>