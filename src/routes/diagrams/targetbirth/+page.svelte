<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { idGenCount, idGenSlot } from '$lib/Sylvan/class/Generations.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    $: subject = getSylvan().people().find($subjectNameKey)

    const scale = 1
    $: anodes = []
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
        // Create the subject's ancestor nodes
        const a = new Anodes(subject)
        anodes = a.anodesBySeq()
        // Add Anode properties required by this diagram and determine birth range
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.prop.birth = anode.person.birthYear()
            anode.prop.label = anode.person.fullName()
            if (anode.prop.birth) {
                birth.min = Math.min(birth.min, anode.prop.birth)
                birth.max = Math.max(birth.max, anode.prop.birth)
            }
        }
        console.log(`There are ${anodes.length} persons with birth year range ${birth.min} to ${birth.max}`)
        // Now we can determine the view geometry
        geometry()
        // Finally, determine ancestor node positions
        arrange()
    }

    const drawCircles = true
    const drawRadials = false

    function geometry() {
        // Set viewBox user units
        vb.width = vb.xmax - vb.xmin
        vb.height = vb.ymax - vb.ymin
        // Determine min and max birth years for the ancestors
        // Then adjust target years range
        year.min = year.tic.years * Math.trunc(birth.min / year.tic.years)
        year.max = year.tic.years * Math.trunc(birth.max / year.tic.years) + year.tic.years
        year.span = year.max - year.min
        year.tic.count = year.span / year.tic.years
        year.units.perYear = vb.width / (2*year.span)
        year.units.perTic = year.tic.years * year.units.perYear
    }

    function arrange() {
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.prop.deg = seqDegrees(anode.seq)
            anode.x = seqX(anode.seq, anode.prop.birth)
            anode.y = seqY(anode.seq, anode.prop.birth)
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

    {#each anodes as anode}
        <circle class="dot" cx={anode.x} cy={anode.y} r="10" />
        <text class="axis" x={anode.x} y={anode.y}>{anode.prop.label}</text>
        {#if anode.childAnode && anode.prop.birth && anode.childAnode && anode.childAnode.prop.birth}
            <line class="link" x1={anode.x} y1={anode.y} x2={anode.childAnode.x} y2={anode.childAnode.y} />
        {/if}
    {/each}
</svg>

<style>
    .axis {
        fill: none;
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