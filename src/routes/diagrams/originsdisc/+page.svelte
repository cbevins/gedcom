<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { idGenCount, idGenIdx, idGenSlot } from '$lib/Sylvan/class/Generations.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    
    const drawAllPolygons = false
    const drawAncestorPolygons = true
    const drawAncesterDots = true
    const drawLinks = true

    const country = new Map([
        ['unknown',     ['brown', 'UNK']],
        ['Canada',      ['pink', 'CAN']],
        ['England',     ['magenta', 'ENG']],
        ['France',      ['cyan', 'FRA']],
        ['Germany',     ['gold', 'GER']],
        ['Ireland',     ['lightgreen', 'IRE']],
        ['Netherlands', ['orange', 'NET']],
        ['Norway',      ['red', 'NOR']],
        ['Scotland',    ['lightblue', 'SCO']],
        ['USA',         ['white', 'USA']],
        ['Wales',       ['darkgreen', 'WAL']],
    ])

    // Set the diagram scale, disc ellipse axis, and birth year dot radius
    $: factor = 1              // scaling factor
    $: adelta = factor * 100    // ellipse alpha axis step size
    $: bdelta = factor * 100    // ellipse beta axis step size
    $: radius = 5               // dot radius and half spacer distance
    // The following are reset by createAnodes()
    $: anodes = []
    $: maxGen = 16
    // The following are reset by setViewBox()
    $: xmin = -adelta * maxGen
    $: xmax = adelta * maxGen
    $: ymin = -bdelta * maxGen
    $: ymax = bdelta * maxGen
    $: width = xmax - xmin
    $: height = ymax - ymin

    // BE SURE TO DE-REFERENCE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: init(subject)

    function init(subject) {
        createAnodes(subject)
        setViewBox()
        setAnodePositions()
    }

    function createAnodes(subject) {
        const country = new Set()
        // Create the subject's ancestor nodes
        const a = new Anodes(subject)
        anodes = a.anodesBySeq()
        maxGen = 0
        // Add Anode properties required by this diagram and determine max generation
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            maxGen = Math.max(maxGen, anode.gen)
            anode.prop.label = anode.person.fullName()
            anode.prop.country = anode.person.birthCountry()
            if (anode.prop.country === '') anode.prop.country = 'unknown'
            country.add(anode.prop.country)
        }
        // console.log('Countries', country)
        console.log('maxGen', maxGen, 'persons', 2**maxGen)
    }

    function setAnodePositions() {
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            const pt = polygonCenter(anode.seq)
            anode.x = pt[0]
            anode.y = pt[1]
            // anode.prop.poly = polygonPath(anode.seq)
            if (i) {
                const dx = anode.x - anodes[i-1].x
                const dy = anode.y - anodes[i-1].y
                const d = Math.sqrt(dx*dx+dy*dy)
                if (d < 2*radius) {
                    console.log(`Anodes ${i-1} (${anodes[i-1].seq}) and ${i} (${anode.seq}) of Gen ${anode.gen} are less than ${2*radius} px apart.`)
                }
            }
        }
        anodes[0].x = 0
        anodes[0].y = 0
    }

    function setViewBox() {
        xmin = -adelta * maxGen
        xmax = adelta * maxGen
        ymin = -bdelta * maxGen
        ymax = bdelta * maxGen
        width = xmax - xmin
        height = ymax - ymin
    }

    // Returns a string defining the SVG path for the seq polygon
    function polygonPath(seq) {
        const gen = idGenIdx(seq)        // subject gen === 0
        const segs =idGenCount(seq)
        const slot = idGenSlot(seq)
        const segDeg = 360 / segs
        const fromDeg = slot * segDeg
        const thruDeg = fromDeg + segDeg
        // outer
        let go = gen
        const p0 = point(go*adelta, go*bdelta, fromDeg)
        const p1 = point(go*adelta, go*bdelta, thruDeg)
        // inner
        let gi = gen-1
        const p2 = point(gi*adelta, gi*bdelta, fromDeg)
        const p3 = point(gi*adelta, gi*bdelta, thruDeg)
        let d = `M ${p0[0]} ${p0[1]} A ${go*adelta} ${go*bdelta} 0 0 1 ${p1[0]} ${p1[1]}`
        if (segs > 1) {
            d += ` L ${p3[0]} ${p3[1]}`
            d += ` A ${gi*adelta} ${gi*bdelta} 0 0 0 ${p2[0]} ${p2[1]}`
            d += ` L ${p0[0]} ${p0[1]}`
        }
        return d
    }

    // Returns coordinates of the center of the disc generational polygon given ancestral seq
    function polygonCenter(seq) {
        const gen = idGenIdx(seq)        // subject gen === 0
        const segs = idGenCount(seq)
        const slot = idGenSlot(seq)
        const segDeg = 360 / segs       // generational arc degrees per disc segment
        const fromDeg = slot * segDeg   // 
        const centerDeg = fromDeg + segDeg / 2
        return point((gen-0.5)*adelta, (gen-0.5)*bdelta, centerDeg)
    }

    function shiftCenter(seq) {
        const gen = idGenIdx(seq)        // subject gen === 0
        const segs = idGenCount(seq)
        const slot = idGenSlot(seq)
        const segDeg = 2 * 360 / segs       // generational arc degrees per disc segment
        const fromDeg = slot * segDeg   // 
        const centerDeg = fromDeg + segDeg / 2
        return point((gen+0.5)*adelta, (gen+0.5)*bdelta, centerDeg)
    }

    function point(a, b, deg, xCenter=0, yCenter=0) {
        const rad = (360-deg) * Math.PI / 180
        const x = (xCenter - (a * Math.cos(rad))).toFixed(2)
        const y = (yCenter + (b * Math.sin(rad))).toFixed(2)
        return [x, y]
    }
</script>

<h3>Ancestral Origins Disc for {subject.label()}</h3>

<svg width={width} height={height} viewBox="{xmin} {ymin} {width} {height}">
    <!-- Segments -->
    {#if drawAllPolygons}
        {#each Array(2**(maxGen+1)) as unused, i}
            <path class='grid' d={polygonPath(i)} />
        {/each}
    {/if}

    <!-- If filling polygons, draw them first so they don't cover up previous polygons -->
    {#if drawAncestorPolygons }
        {#each anodes as anode}
            <!-- <path class='poly' d={polygonPath(anode.seq)} /> -->
            <path class={anode.prop.country} d={polygonPath(anode.seq)} />
        {/each}
    {/if}
    
    {#each anodes as anode}
        {#if drawAncesterDots}
            <circle class={anode.person.gender()==='F' ? 'female' : 'male'} cx={anode.x} cy={anode.y} r={radius}/>
            <text class='dot' x={anode.x} y={anode.y}>
                {anode.prop.label}
            </text>
        {/if}
        {#if drawLinks && anode.childAnode}
            <line class='link' x1={anode.x} y1={anode.y} x2={anode.childAnode.x} y2={anode.childAnode.y} />
        {/if}
    {/each}

    <!-- Country of Origin Legend -->
    {#each Array.from(country) as [name, info], i}
        <rect class={name} x={xmin+100} y={ymin+i*30} width="20" height="20" stroke="black" stroke-width="1" />
        <text class='dot'  x={xmin+125} y={ymin+i*30+15}>{name}</text>
    {/each}
</svg>

<style>
    .dot {
        fill: red;
        font-family: Tahoma;
        font-size: 0.75em;
        font-weight: light;
        stroke: black;
        stroke-width: 1
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
    .grid {
        fill: none;
        stroke: black;
        stroke-width: 2;
    }
    .link {
        fill: red;
        stroke: red;
        stroke-width: 1;
    }
    .poly {
        fill: green;
        stroke: grey;
        stroke-width: 1;
    }
    .unknown    { fill: brown; }
    .Canada     { fill: pink; }
    .England    { fill: magenta; }
    .France     { fill: cyan; }
    .Germany    { fill: gold; }
    .Ireland    { fill: lightgreen; }
    .Netherlands{ fill: orange; }
    .Norway     { fill: red; }
    .Scotland   { fill: lightblue; }
    .USA        { fill: silver; }
    .Wales      { fill: darkgreen;}

</style>