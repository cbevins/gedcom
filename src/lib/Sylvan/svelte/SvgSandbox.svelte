<script>
	import { Ancestors } from '$lib/Sylvan/class/Ancestors.js'
    export let subjectNameKey
    export let sylvan
    $: init(sylvan, subjectNameKey)
    
    const itemWid = 6
    const itemHt = 50
    const yPad = 50
    const xPad = 2
    const lineClr = "blue"
    const lineWid = 1
    
    let alist = []
    let svgWid = 1000
    let svgHt = 1000
    let midWid = svgWid / 2
    function init() {
        const subject = sylvan.people().find(subjectNameKey)
        const ancestors = new Ancestors(subject)
        ancestors.link()
        alist = Array.from(ancestors.map().values()).sort((a, b) => { return (a.id() - b.id()) })
        const last = alist[alist.length-1]
        svgWid = (itemWid + xPad) * 2**(last.gen() - 1)
        midWid = svgWid / 2
        svgHt = (itemHt + yPad) * (last.gen()+1)

        // Now determine x pos min and max
        let xmin = 9999999999
        let xmax = -9999999999
        for (let i=0; i<alist.length; i++) {
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
    function x(ancestor) { return midWid + ancestor.xpos() * (itemWid + xPad) }

    // function info(a) {
    //     return `gen:${a.gen()}, id:${a.id()}, off:${a.offset()}, xpos:${a.xpos()},`
    //     + ` x:${x(a)}, y1:${y1(a)} ${a.person().fullName()}`
    // }
</script>

<p>Sylvan has {sylvan.people().size()} Persons, Subject is {subjectNameKey}, Ancestor list is {alist.length}</p>

<svg width={svgWid} height={svgHt} xmlns="http://www.w3.org/2000/svg">
    <rect width={svgWid} height={svgHt} x="0" y="0" rx="0" ry="0" fill="gray"
        stroke="black" stroke-width="4" transform="scale(1)" />
    
    {#each alist as a}
        <!-- {console.log(info(a))} -->
        <!-- <line x1={x(a)} y1={y1(a)} x2={x(a)} y2={y2(a)} stroke={lineClr} stroke-width={lineWid} /> -->
        <rect x={x(a)} y={y1(a)} width={itemWid} height={itemHt} fill="green" />
        {#if a.mom()}
        <!-- {console.log(a.mom())} -->
            <line x1={x(a)} y1={y1(a)+itemHt} x2={x(a.mom())} y2={y1(a.mom())} stroke={lineClr} stroke-width={lineWid}/>
        {/if}
    {/each}
</svg>
