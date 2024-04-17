<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { idGenCount, idGenSlot } from '$lib/Sylvan/class/Generations.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    const drawCircles = true
    const radials = 0   // Number of disc radials to draw

    $: factor = 0.5               // scaling factor
    $: anodes = []
    // The following is reset by createAnodes()
    $: birth = {min: 9999, max: 0}
    $: vb = {xmin: factor * -1000, xmax: factor * 1000, ymin: factor * -1000, ymax: factor * 1000}
    $: year = {
        max: 2050,
        min: 1450,
        span: 600,
        tic: {count: 0, years: 50},
        units: {perTic: 1, perYear: 1}
    }
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: init(subject)

    function init(subject) {
        // First create the Anodes and determine birth year range
        createAnodes(subject)
        // Now we can determine the view geometry
        setGeometry()
        // Finally, determine ancestor node positions
        setAnodePositions()
    }

    function createAnodes(subject) {
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
        console.log(`Birth Year Disc has ${anodes.length} persons born from ${birth.min} thru ${birth.max}`)
    }

    function setGeometry() {
        // Set viewBox user units
        vb.width = vb.xmax - vb.xmin
        vb.height = vb.ymax - vb.ymin
        // Adjust the disc for the range of birth years
        year.min = year.tic.years * Math.trunc(birth.min / year.tic.years)
        year.max = year.tic.years * Math.trunc(birth.max / year.tic.years) + year.tic.years
        year.span = year.max - year.min
        year.tic.count = year.span / year.tic.years
        year.units.perYear = vb.width / (2*year.span)
        year.units.perTic = year.tic.years * year.units.perYear
    }

    function setAnodePositions() {
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.prop.deg = seqDegrees(anode.seq)
            anode.x = seqX(anode.seq, anode.prop.birth)
            anode.y = seqY(anode.seq, anode.prop.birth)
        }
    }

    // Returns the disc angle in degrees given the Ancestor's Anode.seq
    function seqDegrees(seq) {
        const slot = idGenSlot(seq)
        const slots = idGenCount(seq)
        const deg = 360 * slot/ slots + 96
        return deg
    }
    // Returns the marker x-coordinate given the Ancestor's Anode.seq and birth year
    function seqX(seq, yr) { return pointX(yr, seqDegrees(seq)) }
    // Returns the marker y-coordinate given the Ancestor's Anode.seq and birth year
    function seqY(seq, yr) { return pointY(yr, seqDegrees(seq)) }
    
    // function point(yr, deg, xCenter=0, yCenter=0) {
    //     return [pointX(yr, deg, xCenter), pointY(yr, deg, yCenter)]
    // }

    // Returns the disc x-coordinate given a year and angle.
    function pointX(yr, deg, xCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const a = (year.max - yr) * year.units.perYear
        return (xCenter - (a * Math.cos(rad))).toFixed(2)
    }

    // Returns the disc y-coordinate given a year and angle.
    function pointY(yr, deg, yCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const b = (year.max - yr) * year.units.perYear
        return (yCenter + (b * Math.sin(rad))).toFixed(2)
    }
</script>

<h3>Ancestral Birth Year Disc for {subject.label()}</h3>

<svg width={vb.width} height={vb.height} viewBox="{vb.xmin} {vb.ymin} {vb.width} {vb.height}">
    <!-- Disc isolines -->
    {#if drawCircles}
        {#each Array(year.tic.count+1) as unused, i}
            <circle cx={0} cy={0} r={i*year.units.perTic} fill="none" stroke="black" stroke-width="1" />
            <text x={0-18} y={i * -year.units.perTic + 5}>{year.max - i * year.tic.years}</text>
            <text x={i * -year.units.perTic - 18} y={0 + 5}>{year.max - i * year.tic.years}</text>
            <text x={0-18} y={i * year.units.perTic + 5}>{year.max - i * year.tic.years}</text>
            <text x={i * year.units.perTic-18} y={0 + 5}>{year.max - i * year.tic.years}</text>
        {/each}
    {/if}

    <!-- Disc radial lines -->
    {#each Array(radials) as unused, i}
        <line class='axis' x1={0} y1={0} x2={pointX(1500, i*360/32)} y2={pointY(1500, i*360/32)} />
        <text class='axis' x={pointX(1500, i*360/32)} y={pointY(1500, i*360/32)}>{i*360/32}</text>
    {/each}

    {#each anodes as anode}
        <circle class={anode.person.gender()==='F' ? 'female' : 'male'} cx={anode.x} cy={anode.y} r="10" />
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
    .male {
        fill: cyan;
        stroke: black;
        stroke-width: 1
    }
    .female {
        fill: pink;
        stroke: black;
        stroke-width: 1
    }
    .link {
        fill: red;
        stroke: red;
        stroke-width: 1
    }
</style>