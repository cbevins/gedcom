<script>
    // Displays the *parents* of the Anode subject
    export let anode        // Anode of the child subject
    export let geom

    const drawBorder = false
    $: factor = geom.factor

    // Padding for connectors; 2 on the left and 1 on the right
    const padLeft = 0.08 * geom.node.width          // 0.08 x 500 = 40
    const padRight = 0.04 * geom.node.width         // 0.04 x 500 = 20
    const round = 10

    // Each card has 16 lines
    const lines = 16                                // meta, father, subject, mother, extra
    const lineHt = geom.node.height / lines
    const line = {
        father: {name: 2, tags: 3, born: 4, died: 5},
        mother: {name: 10, tags: 11, born: 12, died: 13},
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
    // const x3 = x2 + 50 * geom.factor    // start of tag text
    const x4 = x2 + tagWidth            // end of tag box
    // const x5 = x4 + padRight            // right edge of node box
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
        const dy = anode.person.isFemale() ? line.mother.born : line.father.born
        const y = child.y + dy * lineHt
        const x = child.x + geom.node.width
        const cpx = (x1 + x)/2 
        return `M ${x1} ${ymid} C ${cpx} ${ymid} ${cpx} ${y} ${x} ${y} L ${x-20} ${y}`
    }
    function fatherPath() {
        const y = lineTop(line.father.born)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }
    function motherPath() {
        const y = lineTop(line.mother.born)
        return `M ${x1} ${ymid} C ${cx} ${ymid} ${cx} ${y} ${x2} ${y} L ${xmid} ${y}`
    }
</script>

<!-- Union card border -->
{#if drawBorder}
    <rect x={anode.x} y={anode.y} width={geom.node.width} height={geom.node.height} fill="none" stroke="red" />
{/if}

<!-- Connectors -->
<path class="linkage" d={fatherPath()} stroke-width={10 * factor} />
<path class="linkage" d={motherPath()} stroke-width={10 * factor}/>
{#if anode.childAnode}
    <path class="linkage" d={childPath()}  stroke-width={10 * factor}/>
{/if}

<!-- Father, Union, and Mother -->
<rect class='father' x={x2} y={lineTop(line.father.name)} rx={round} ry={round}
    width={tagWidth} height={tagHeight} />

<rect class='mother' x={x2} y={lineTop(line.mother.name)} rx={round} ry={round}
    width={tagWidth} height={tagHeight} />

<rect class='union' x={x2+unionPad} y={lineTop(line.union.date)} rx={round} ry={round}
    width={unionWidth} height={unionHeight} />

<!-- Union bonds -->
<line class='union' x1={tmid} y1={lineTop(6)} x2={tmid} y2={lineTop(7)} />
<line class='union' x1={tmid} y1={lineTop(9)} x2={tmid} y2={lineTop(10)} />

<!-- Union Content -->
{#each anode.prop.lines as content, i}
    <text x={tmid} y={lineBase(i)}
        text-anchor="middle" font-family="sans-serif" font-weight="lighter" font-size={16 * factor}>
        {content}
    </text>
{/each}

<style>
    .linkage {
        fill: none;
        stroke: grey;
        stroke-linecap: flat;
    }
    .father {
        fill: cyan;
        stroke: blue;
        stroke-width: 1;
    }
    .mother {
        fill: pink;
        stroke: red;
        stroke-width: 1;
    }
    .union {
        fill: white;
        stroke: silver;
        stroke-width: 4;
    }
</style>