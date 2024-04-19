<script>
    import Person from '$lib/Sylvan/svelte/GenChartV1/Person.svelte'
    export let anode        // Anode of the Anode subject
    export let geom

    const drawBorder = true
    const drawMeta = true

    // length of 1 linkage stub; there are 2 on the left and 1 on the right
    const padLeft = 0.08 * geom.node.width          // 0.08 x 500 = 40
    const padRight = 0.04 * geom.node.width          // 0.04 x 500 = 20
    const tagWidth = geom.node.width - padLeft - padRight   // 500 - 40 - 20 = 440
    const lines = 5                                 // meta, father, subject, mother, extra
    const tagHeight = geom.node.height / lines      // 100 / 5 = 20

    const x1 = anode.x          // left edge of node box
    const x2 = x1 + padLeft     // start of tage box
    const x3 = x2 + 10 * geom.factor         // start of tag text
    const x4 = x2 + tagWidth    // end of tag box
    const x5 = x4 + padRight    // right edge of node box
    const cx = (x1 + x2) / 2    // Curved Bezier control point x
    const xmid = anode.x + geom.node.width / 2
    const ymid = anode.y + geom.node.height / 2

    function lineBase(i) { return lineBot(i) - 3 * geom.factor }
    function lineBot(i) { return anode.y + i * tagHeight + tagHeight }
    function lineMid(i) { return anode.y + i * tagHeight + tagHeight / 2 }
    function lineTop(i) { return anode.y + i * tagHeight }
    
    function round2(num) { return Math.round((num + Number.EPSILON) * 100) / 100 }

    function childPath() {
        const child = anode.childAnode
        const dy = anode.person.isFemale() ? 3.5 : 1.5
        const y = child.y + dy * tagHeight
        const x = child.x + geom.node.width
        const cpx = (x1 + x)/2 
        return `M ${x1} ${ymid} C ${cpx} ${ymid} ${cpx} ${y} ${x} ${y} L ${x-20} ${y}`
    }
    function fatherPath() {
        const y = lineMid(1)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }
    function motherPath() {
        const y = lineMid(3)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }
    function metaText() {
        const p = anode.person
        let str = ` Born ${p.birthYear()} in ${p.birthState()}, ${p.birthCountry()}`
        return str
    }
</script>

<!-- Tag -->
{#if drawBorder}
    <rect x={anode.x} y={anode.y} width={geom.node.width} height={geom.node.height} fill="none" stroke="red" />
{/if}

<!-- Badges for generation, col, row, and seq -->
{#if drawMeta}
    <text x={x3} y={lineBase(0)}>{metaText()}</text>
{/if}

<!-- Connectors -->
<path class="linkage" d={fatherPath()} />
<path class="linkage" d={motherPath()}/>
{#if anode.childAnode}
    <path class="linkage" d={childPath()} />
{/if}

<!-- Persons -->
<Person anode={anode.fatherAnode} geom={geom} subject='father' 
    x={x2} y={lineTop(1)} width={tagWidth} height={tagHeight} />

<Person anode={anode} geom={geom} subject='subject' 
    x={x2} y={lineTop(2)} width={tagWidth} height={tagHeight} />

<Person anode={anode.motherAnode} geom={geom} subject='mother' 
    x={x2} y={lineTop(3)} width={tagWidth} height={tagHeight} />

<style>
    .linkage {
        fill: none;
        stroke: grey;
        stroke-width: 10;
        stroke-linecap: flat;
    }
</style>