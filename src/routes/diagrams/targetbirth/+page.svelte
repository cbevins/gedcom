<script>
    import { idGenCount, idGenIdx, idGenSlot } from '$lib/Sylvan/class/Generations.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: subject = getSylvan().people().find($subjectNameKey)

    const scale = 1
    $: nodes = []
    $: birth = {min: 9999, max: 0}
    $: vb = {xmin: scale * -1000, xmax: scale * 1000, ymin: scale * -1000, ymax: scale * 1000}
    $: year = {
        max: 2050,
        min: 1450,
        span: 600,
        tic: {count: 0, years: 50},
        units: {perTic: 1, perYear: 1}
    }
    $: init(subject)

    function init(subject) {
        // First determine subject's ancestors
        ancestors(subject, 0, 1, null)
        // Then we can determine birth year range and the view geometry
        geometry()
        // Finally, determine ancestor's positions
        positions()
        console.log(nodes.length, 'Ancestors')
    }

    const drawCircles = true
    const drawRadials = false

    function ancestors(person, gen, seq, child) {
        const node = {
            person: person,         // person's Person instance
            gen: gen,               // person's generation index (0 for the root person)
            seq: seq,               // person's ancestral sequence (1 for the root person)
            mother: null,           // mother's node instance
            father: null,           // father's node instance
            child: child,           // descendant's node instance
            birth: person.birthYear(),
            label: person.fullName(),
            deg: 0, x: 0, y: 0      // set by positions()
        }
        nodes.push(node)
        if (person.mother() || person.father()) {
            if (person.father()) node.father = ancestors(person.father(), gen+1, seq*2, node)
            if (person.mother()) node.mother = ancestors(person.mother(), gen+1, seq*2+1, node)
        }
        return node
    }

    function geometry() {
        // Set viewBox user units
        vb.width = vb.xmax - vb.xmin
        vb.height = vb.ymax - vb.ymin
        // Determine min and max birth years for the ancestors
        for (let i=0; i<nodes.length; i++) {
            const yr = nodes[i].birth
            if (yr) {
                birth.min = Math.min(birth.min, yr)
                birth.max = Math.max(birth.max, yr)
            }
        }
        console.log('Birth year range:', birth.min, birth.max)
        // Then adjust target years range
        year.min = year.tic.years * Math.trunc(birth.min / year.tic.years)
        year.max = year.tic.years * Math.trunc(birth.max / year.tic.years) + year.tic.years
        year.span = year.max - year.min
        year.tic.count = year.span / year.tic.years
        year.units.perYear = vb.width / (2*year.span)
        year.units.perTic = year.tic.years * year.units.perYear
    }

    function positions() {
        for (let i=0; i<nodes.length; i++) {
            const node = nodes[i]
            node.deg = seqDegrees(node.seq)
            node.x = seqX(node.seq, node.birth)
            node.y = seqY(node.seq, node.birth)
        }
    }

    // Returns target angle in degrees for Ancestor seq
    function seqDegrees(seq) {
        const slot = idGenSlot(seq)
        const slots = idGenCount(seq)
        const deg = 360 * slot/ slots + 96
        return deg
    }
    function seqX(seq, yr) { return pointX(yr, seqDegrees(seq)) }
    function seqY(seq, yr) { return pointY(yr, seqDegrees(seq)) }
    
    // function point(yr, deg, xCenter=0, yCenter=0) {
    //     return [pointX(yr, deg, xCenter), pointY(yr, deg, yCenter)]
    // }

    function pointX(yr, deg, xCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const a = (year.max - yr) * year.units.perYear
        return (xCenter - (a * Math.cos(rad))).toFixed(2)
    }

    function pointY(yr, deg, yCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const b = (year.max - yr) * year.units.perYear
        return (yCenter + (b * Math.sin(rad))).toFixed(2)
    }
</script>

<h3>Ancestral Birth Disc for {subject.label()}</h3>
<svg width={vb.width} height={vb.height} viewBox="{vb.xmin} {vb.ymin} {vb.width} {vb.height}">
    <!-- Target disc and axis -->
    {#if drawCircles}
        {#each Array(year.tic.count+1) as unused, i}
            <circle cx={0} cy={0} r={i*year.units.perTic} fill="none" stroke="black" stroke-width="1" />
            <text x={0-18} y={i * -year.units.perTic + 5}>{year.max - i * year.tic.years}</text>
            <text x={i * -year.units.perTic - 18} y={0 + 5}>{year.max - i * year.tic.years}</text>
            <text x={0-18} y={i * year.units.perTic + 5}>{year.max - i * year.tic.years}</text>
            <text x={i * year.units.perTic-18} y={0 + 5}>{year.max - i * year.tic.years}</text>
        {/each}
    {/if}

    {#if drawRadials}
        {#each Array(32) as unused, i}
            <line class='axis' x1={0} y1={0} x2={pointX(1500, i*360/32)} y2={pointY(1500, i*360/32)} />
            <text class='axis' x={pointX(1500, i*360/32)} y={pointY(1500, i*360/32)}>{i*360/32}</text>
        {/each}
    {/if}

    {#each nodes as node}
        <circle class="dot" cx={node.x} cy={node.y} r="10" />
        <text class="axis" x={node.x} y={node.y}>{node.label}</text>
        {#if node.child && node.birth && node.child.birth}
            <line class="link" x1={node.x} y1={node.y} x2={node.child.x} y2={node.child.y} />
        {/if}
    {/each}
</svg>

<style>
    .axis {
        fill: none;
        font-size: 72;
        stroke: black;
        stroke-width: 1;
        stroke-linecap: flat;
    }
    .dot {
        fill: red;
        stroke: black;
        stroke-width: 1
    }
    .link {
        fill: red;
        stroke: red;
        stroke-width: 1
    }
</style>