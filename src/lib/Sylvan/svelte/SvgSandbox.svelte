<script>
	import { Ancestors } from '$lib/Sylvan/class/Ancestors.js'
    export let subjectNameKey
    export let sylvan
    $: init(sylvan, subjectNameKey)
    
    const itemWid = 10
    const itemHt = 50
    const yPad = 50
    const xPad = 4  // padding between husband-wife pair
    const pPad = 10  // padding between adjacent husband-wife pairs
    const lineClr = "blue"
    const lineWid = 1
    
    let svgWid = 1000
    let svgHt = 1000
    let midWid = svgWid / 2
    
    let alist = []      // List of all Ancestor records
    let genCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]    // Ancestors by generation
    let maxGenCount = 0 // Number of Ancestors in the generation with the most Ancestors
    let maxGenIdx = 0   // Generation with the most Ancestors
    let lastGen = 0     // Maximum generation number
    function init() {
        // First get all the Ancestor records for the subject
        const subject = sylvan.people().find(subjectNameKey)
        const ancestors = new Ancestors(subject)
        ancestors.link()
        alist = Array.from(ancestors.map().values()).sort((a, b) => { return (a.id() - b.id()) })
        // Determine Ancestor generation sizes
        lastGen = alist[alist.length-1].gen()
        genCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        maxGenCount = 0
        // Get maximum number of persons per row
        alist.forEach((a) => genCount[a.gen()]++)
        genCount.forEach((n) => { maxGenCount = (n > maxGenCount) ? n : maxGenCount })
        genCount.forEach((n, i) => { if (n === maxGenCount) maxGenIdx = i })

        svgWid = (itemWid + xPad) * 2**(lastGen - 1)
        midWid = svgWid / 2
        svgHt = (itemHt + yPad) * (lastGen + 1)
        // Now determine x pos min and max
        let xmin = 9999999999
        let xmax = -9999999999
        let prevGen = -1
        let seq = 0
        for (let i=0; i<alist.length; i++) {
            const a = alist[i]
            if (a.gen() > prevGen) {
                seq = 0
                prevGen = a.gen()
            }
            const v = x(alist[i])
            xmax = v > xmax ? v : xmax
            xmin = v < xmin ? v : xmin
        }
        console.log('BEG Wid', svgWid, 'Ht', svgHt, 'MidWid', midWid)
        console.log('x min, max =', xmin, xmax)
        svgWid = xmax - xmin             
        midWid -= xmin
        console.log('END Wid', svgWid, 'Ht', svgHt, 'MidWid', midWid)
        return subject
    }

    // The *ancestor* arg is an Ancestor reference
    function y1(ancestor) { return ancestor.gen() * (itemHt + yPad) }
    function y2(ancestor) { return (ancestor.gen() + 1) * (itemHt + yPad) }
    function x(ancestor) {
        const pad = ancestor.person().isFemale() ? itemWid + xPad : itemWid + xPad
        return midWid + ancestor.midlineOffset() * pad
    }

    // function info(a) {
    //     return `gen:${a.gen()}, id:${a.id()}, off:${a.sequence()}, xpos:${a.xpos()},`
    //     + ` x:${x(a)}, y1:${y1(a)} ${a.person().fullName()}`
    // }
</script>

<div class="container">
<p>Sylvan has {sylvan.people().size()} Persons, Subject is {subjectNameKey}, Ancestor list is {alist.length}</p>
<p>Generation ${maxGenIdx} has ${maxGenCount} Ancestors</p>
{console.log('START OVER: Generation', maxGenIdx, 'has', maxGenCount, 'Ancestors')}
<svg width={svgWid} height={svgHt} xmlns="http://www.w3.org/2000/svg">
    <rect width={svgWid} height={svgHt} x="0" y="0" rx="0" ry="0" fill="gray"
        stroke="black" stroke-width="4" transform="scale(1)" />
    
    {#each alist as a}
        <!-- {console.log(info(a))} -->
        <!-- <line x1={x(a)} y1={y1(a)} x2={x(a)} y2={y2(a)} stroke={lineClr} stroke-width={lineWid} /> -->
        <rect x={x(a)} y={y1(a)} width={itemWid} height={itemHt} fill="green" />
        <text x={x(a)} y={y1(a)+itemHt/2} fill="red" font-size="10">{a.person().gender()}</text>
        {#if a.mom()}
            <line x1={x(a)+itemWid/2} y1={y1(a)+itemHt} x2={x(a.mom())+itemWid/2} y2={y1(a.mom())} stroke="red" stroke-width={lineWid}/>
        {/if}
        {#if a.dad()}
            <line x1={x(a)+itemWid/2} y1={y1(a)+itemHt} x2={x(a.dad())+itemWid/2} y2={y1(a.dad())} stroke="blue" stroke-width={lineWid}/>
        {/if}
    {/each}
</svg>
</div>