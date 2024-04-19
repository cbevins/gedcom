<script>
    // Displays the *parents* of the Anode subject
    import Person from '$lib/Sylvan/svelte/GenChartV2/Person.svelte'
    import Line from '$lib/Sylvan/svelte/GenChartV2/Line.svelte'
    import { idGenAbbr } from '$lib/Sylvan/class/Generations.js'
    export let anode        // Anode of the child subject
    export let geom

    const drawBorder = true
    const drawMeta = true
    $: factor = geom.factor

    // Padding for connectors; 2 on the left and 1 on the right
    const padLeft = 0.08 * geom.node.width          // 0.08 x 500 = 40
    const padRight = 0.04 * geom.node.width         // 0.04 x 500 = 20

    // Each card has 16 lines
    const lines = 16                                // meta, father, subject, mother, extra
    const lineHt = geom.node.height / lines
    const line = {
        father: {name: 2, born: 3, died: 4, tags: 5},
        mother: {name: 10, born: 11, died: 12, tags: 13},
        union: {date: 7, children: 8},
    }

    // Person tag element sizes adjusted for padding, lines, and lineHt
    const tagWidth = geom.node.width - padLeft - padRight   // 500 - 40 - 20 = 440
    const tagHeight = 4 * lineHt        // 320 / 16 = 20

    // Union rectangle
    const unionPad = 50 * geom.factor
    const unionWidth = tagWidth - 2 * unionPad
    const unionHeight =  2 * lineHt

    const x1 = anode.x                  // left edge of node box
    const x2 = x1 + padLeft             // start of tag box
    const x3 = x2 + 50 * geom.factor    // start of tag text
    const x4 = x2 + tagWidth            // end of tag box
    const x5 = x4 + padRight            // right edge of node box
    const cx = (x1 + x2) / 2            // Curved Bezier control point x
    const xmid = anode.x + geom.node.width / 2
    const ymid = anode.y + geom.node.height / 2
    const tmid = x2 + tagWidth/2      // x-mid of tag box (for centering text)

    // The following return the y-coordinate of line index 'idx' [0-15]
    function lineBase(idx) { return lineBot(idx) - 3 * geom.factor }
    function lineBot(idx) { return anode.y + idx * lineHt + lineHt }
    function lineMid(idx) { return anode.y + idx * lineHt + lineHt / 2 }
    function lineTop(idx) { return anode.y + idx * lineHt }
    
    function round2(num) { return Math.round((num + Number.EPSILON) * 100) / 100 }

    function childPath() {
        const child = anode.childAnode
        const dy = anode.person.isFemale() ? line.mother.died : line.father.died
        const y = child.y + dy * lineHt
        const x = child.x + geom.node.width
        const cpx = (x1 + x)/2 
        return `M ${x1} ${ymid} C ${cpx} ${ymid} ${cpx} ${y} ${x} ${y} L ${x-20} ${y}`
    }
    function fatherPath() {
        const y = lineTop(line.father.died)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }
    function motherPath() {
        const y = lineTop(line.mother.died)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }

    function born(a) {
        if (a) {
            const p = a.person
            return `Born ${p.birthYear()} in ${p.birthState()}, ${p.birthCountry()}`
        }
        return ''
    }

    function died(a) {
        if (a) {
            const p = a.person
            if (p.isLiving()) return 'Not Dead Yet'
            return `Died ${p.deathYear()} in ${p.deathState()}, ${p.deathCountry()}`
        }
        return ''
    }
    
    function name(a) { return a ? `${a.prop.label}` : 'unknown' }
    
    function tags(a) { return a ? `${idGenAbbr(a.seq)}` : '' }
    
    function union() {
        if (anode) {
            const fam = anode.person.familyParent(0)
            return `m: ${fam.unionDate().year()} ${fam.unionPlace().text()}`
        }
        return ''
    }
</script>

<!-- Tag -->
{#if drawBorder}
    <rect x={anode.x} y={anode.y} width={geom.node.width} height={geom.node.height} fill="none" stroke="red" />
{/if}

<!-- Connectors -->
<path class="linkage" d={fatherPath()} />
<path class="linkage" d={motherPath()}/>
{#if anode.childAnode}
    <path class="linkage" d={childPath()} />
{/if}

<!-- Father -->
<rect class='father' x={x2} y={lineTop(line.father.name)} width={tagWidth} height={tagHeight} /> 
<Line x={tmid} y={lineBase(line.father.name)} {factor} content={name(anode.fatherAnode)} />
<Line x={tmid} y={lineBase(line.father.born)} {factor} content={born(anode.fatherAnode)} />
<Line x={tmid} y={lineBase(line.father.died)} {factor} content={died(anode.fatherAnode)} />
<Line x={tmid} y={lineBase(line.father.tags)} {factor} content={tags(anode.fatherAnode)} />

<!-- Mother -->
<rect class='mother' x={x2} y={lineTop(line.mother.name)} width={tagWidth} height={tagHeight} /> 
<Line x={tmid} y={lineBase(line.mother.name)} {factor} content={name(anode.motherAnode)} />
<Line x={tmid} y={lineBase(line.mother.born)} {factor} content={born(anode.motherAnode)} />
<Line x={tmid} y={lineBase(line.mother.died)} {factor} content={died(anode.motherAnode)} />
<Line x={tmid} y={lineBase(line.mother.tags)} {factor} content={tags(anode.motherAnode)} />

<!-- Union -->
<rect class='union' x={x2+unionPad} y={lineTop(line.union.date)} width={unionWidth} height={unionHeight} /> 
<Line x={tmid} y={lineBase(line.union.date)} {factor} content={union()} />

<style>
    .linkage {
        fill: none;
        stroke: grey;
        stroke-width: 10;
        stroke-linecap: flat;
    }
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
    .union {
        fill: white;
        stroke: white;
        stroke-width: 1;
    }
    .subject {
        fill: none;
        stroke: black;
        stroke-width: 0;
    }
</style>