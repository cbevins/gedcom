<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { GenerationalDisc } from '$lib/Sylvan/class/GenerationalDisc.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    
    // Diagram elements to enable/disable
    const drawAllPolygons = false
    const drawAncestorPolygons = true
    const drawAncesterDots = true
    const drawLinks = true
    
    // Set the diagram scale, disc ellipse axis, and birth year dot radius
    let disc = null
    const factor = .5       // scaling factor
    const aUnits = 100      // ellipse alpha axis step size
    const bUnits = 100      // ellipse beta axis step size
    const radius = 5        // dot radius and half spacer distance

    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: anodes = init(subject)

    function init(subject) {
        // Create the subject's ancestor nodes
        const a = new Anodes(subject)
        anodes = a.anodesBySeq()
        // Add Anode properties required by this diagram
        for (let i=0; i<anodes.length; i++) {
            anodes[i].prop.label = anodes[i].person.fullName()
        }
        disc = new GenerationalDisc(anodes, factor, radius, aUnits, bUnits)
        console.log('maxGen', disc.maxGen(), 'persons', 2**disc.maxGen())
        return disc.anodes()
    }
</script>

<h3>Ancestral Generational Disc for {subject.label()}</h3>

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
            <path class='poly' d={disc.polygonPath(anode.seq)} />
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
</style>