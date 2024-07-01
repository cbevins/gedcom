<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { GenerationalDisc } from '$lib/Sylvan/class/GenerationalDisc.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE subjectNameKey VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    
    console.log('RUNNING src/routes/diagrams/originsdisc')
    
    // Diagram elements to enable/disable
    const drawAllPolygons = false
    const drawAncestorPolygons = true
    const drawAncesterDots = true
    const drawLinks = true

    const country = new Map([
        ['unknown',     ['UNK']],
        ['Canada',      ['CAN']],
        ['England',     ['ENG']],
        ['France',      ['FRA']],
        ['Germany',     ['GER']],
        ['Ireland',     ['IRE']],
        ['Netherlands', ['NET']],
        ['Norway',      ['NOR']],
        ['Scotland',    ['SCO']],
        ['USA',         ['USA']],
        ['Wales',       ['WAL']],
    ])
    
    // Set the diagram scale, disc ellipse axis, and birth year dot radius
    let disc = null
    const factor = .5       // scaling factor
    const aUnits = 100      // ellipse alpha axis step size
    const bUnits = 100      // ellipse beta axis step size
    const radius = 5        // dot radius and half spacer distance

    // BE SURE TO DE-REFERENCE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: anodes = init(subject)
    function init(subject) {
        const country = new Set()
        // Create the subject's ancestor nodes
        const a = new Anodes(subject)
        anodes = a.anodesBySeq()
        // Add Anode properties required by this diagram and determine max generation
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.prop.label = anode.person.fullName()
            anode.prop.country = anode.person.birthCountry()
            if (anode.prop.country === '') anode.prop.country = 'unknown'
            country.add(anode.prop.country)
        }
        // console.log('Countries', country)
        disc = new GenerationalDisc(anodes, factor, radius, aUnits, bUnits)
        console.log('Generational Disc: maxGen', disc.maxGen(), 'persons', 2**disc.maxGen())
        return disc.anodes()
    }
</script>

<h3>Ancestral Origins Disc for {subject.label()}</h3>

<svg width={disc.vbWidth()} height={disc.vbHeight()}
    viewBox="{disc.vbXmin()} {disc.vbYmin()} {disc.vbWidth()} {disc.vbHeight()}">

    <!-- Segments -->
    {#if drawAllPolygons}
        {#each Array(2**(disc.maxGen()+1)) as unused, i}
            <path class='grid' d={disc.polygonPath(i)} />
        {/each}
    {/if}

    <!-- If filling polygons, draw them first so they don't cover up previous polygons -->
    {#if drawAncestorPolygons }
        {#each anodes as anode}
            <!-- <path class='poly' d={disc.polygonPath(anode.seq)} /> -->
            <path class={anode.prop.country} d={disc.polygonPath(anode.seq)} />
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
        <rect class={name} x={disc.vbXmin()+100} y={disc.vbYmin()+i*30} width="20" height="20" stroke="black" stroke-width="1" />
        <text class='dot'  x={disc.vbXmin()+125} y={disc.vbYmin()+i*30+15}>{name}</text>
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