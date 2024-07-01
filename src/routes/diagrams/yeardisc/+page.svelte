<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { AnnularDisc } from '$lib/Sylvan/class/AnnularDisc.js'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    
    console.log('RUNNING src/routes/diagrams/yeardisc')

    // Diagram elements to enable/disable
    const drawCircles = true
    const radials = 0   // Number of disc radials to draw
    const yearsPerRing = 50
    let disc = null
    $: factor = 1               // scaling factor
    
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: anodes = init(subject, factor)

    function init(subject, factor) {
        // Create the subject's ancestor nodes
        const a = new Anodes(subject)
        anodes = a.anodesBySeq()
        // Add Anode properties required by this diagram and determine birth range
        const birth = {min: 9999, max: 0}
        for (let i=0; i<anodes.length; i++) {
            const anode = anodes[i]
            anode.prop.year = anode.person.birthYear()      // MUST BE STORED IN 'year' property
            anode.prop.label = anode.person.fullName()
            if (anode.prop.year) {
                birth.min = Math.min(birth.min, anode.prop.year)
                birth.max = Math.max(birth.max, anode.prop.year)
            }
        }
        // Create the annular disc using Anodes with birth year stored in prop.year 
        disc = new AnnularDisc(anodes, birth.min, birth.max, yearsPerRing, factor )
        console.log(`Birth Year Disc has ${anodes.length} persons born from ${birth.min} thru ${birth.max}`)
        return anodes
    }

    function ringLabel(i) { return disc.yearOuter() - i * disc.yearsPerRing() }
</script>

<h3>Ancestral Birth Year Disc for {subject.label()}</h3>


<svg width={disc.vbWidth()} height={disc.vbHeight()}
    viewBox="{disc.vbXmin()} {disc.vbYmin()} {disc.vbWidth()} {disc.vbHeight()}">

    <!-- Disc isolines -->
    {#if drawCircles}
        {#each Array(disc.ringCount()+1) as unused, i}
            <circle cx={0} cy={0} r={i*disc.unitsPerRing()} fill="none" stroke="black" stroke-width="1" />
            <text x={0-18} y={i * -disc.unitsPerRing() + 5}>{ringLabel(i)}</text>
            <text x={i * -disc.unitsPerRing() - 18} y={0 + 5}>{ringLabel(i)}</text>
            <text x={0-18} y={i * disc.unitsPerRing() + 5}>{ringLabel(i)}</text>
            <text x={i * disc.unitsPerRing() - 18} y={0 + 5}>{ringLabel(i)}</text>
        {/each}
    {/if}

    <!-- Disc radial lines -->
    {#each Array(radials) as unused, i}
        <line class='axis' x1={0} y1={0} x2={disc.pointX(1500, i*360/32)} y2={disc.pointY(1500, i*360/32)} />
        <text class='axis' x={disc.pointX(1500, i*360/32)} y={disc.pointY(1500, i*360/32)}>{i*360/32}</text>
    {/each}

    {#each anodes as anode}
        <circle class={anode.person.gender()==='F' ? 'female' : 'male'} cx={anode.x} cy={anode.y} r="10" />
        <text class="axis" x={anode.x} y={anode.y}>{anode.prop.label}</text>
        {#if anode.childAnode && anode.prop.year && anode.childAnode && anode.childAnode.prop.year}
            <line class="link" x1={anode.x} y1={anode.y} x2={anode.childAnode.x} y2={anode.childAnode.y} />
        {/if}
    {/each}
    
</svg>

<style>
    .axis {
        fill: none;
        font-family: Tahoma;
        font-size: 0.75em;
        font-weight: light;
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