<script>
    import { Vines } from '$lib/Sylvan/class/Vines.js'
    import { VinesGeom } from '$lib/Sylvan/class/VinesGeom.js'
    export let sylvan
    export let subjectNameKey

    // Determine VineNodes for current subject
    $: subject = sylvan.people().find(subjectNameKey)
    $: vines = new Vines(subject)
    $: nodes = vines.nodesBySeq()    // Array of [Person, VineNode] pairs by sequence number
    $: geom = new VinesGeom(vines)
    $: posMap = arrange2(geom)

    const gridHt = 3000
    const gridWd = 5000
    const yearMin = 1500
    const yearMax = 2000
    const years = yearMax - yearMin
    const yearTic = 50
    const yearWd = gridWd / years

    function yearx(year) { return yearWd * (yearMax - year) }

    function arrange(geom) {
        const map = new Map()
        const bigGen = geom.bigGen()
        const maxRows = 2**bigGen
        const rowHt = gridHt / maxRows
        for (let g=0; g<geom.gens().length; g++ ) {
            const nodes = geom.gen(g)
            const col = g+1
            const genNodes = 2**g
            const block = rowHt * maxRows / genNodes
            for (let i=0; i<nodes.length; i++) {
                const node = nodes[i]
                const seq = node.childSeq() - genNodes
                const y = (seq * block) + block / 2
                const x = yearx(node.child().birthYear())
                map.set(node, [x, y])
                // console.log(node.child().label(), x, y)
            }
        }
        return map
    }
        
    function arrange2() {
        const map = new Map()
        const bigGen = geom.bigGen()
        const maxRows = 2**bigGen
        const rowHt = gridHt / maxRows
        let n = 2
        for (let g=0; g<geom.gens().length; g++ ) {
            const nodes = geom.gen(g)
            const yspace = maxRows / nodes.length
            for (let i=0; i<nodes.length; i++) {
                const node = nodes[i]
                const x = yearx(node.child().birthYear())
                const row = i * yspace + yspace / 2
                // const y = row * rowHt
                const y = n * 20
                n++
                map.set(node, [x, y])
                console.log(node.child().label(), x, y)
            }
        }
        return map
    }

    function cx(node) { return posMap.get(node)[0] }
    function cy(node) { return posMap.get(node)[1] }
    function cubicData(node1, node2) {
        const [x1, y1] = posMap.get(node1)
        const [x2, y2] = posMap.get(node2)
        const xm = (x1 + x2) / 2
        const d = `M ${x1} ${y1} C ${xm} ${y1} ${xm} ${y2} ${x2} ${y2}`
        return d
    }
</script>

<svg xmlns="http://www.w3.org/2000/svg" width={gridWd} height={gridHt} transform="scale(1, 1)">

    <!-- Background grid -->
    <rect class="grid" x={0} y={0} width={gridWd} height={gridHt} />
    {#each Array(years/yearTic) as unused, col}
        <line class="grid" x1={col*yearTic*yearWd} y1={0} x2={col*yearTic*yearWd} y2={gridHt} /> 
        <text class="grid" x={col*yearTic*yearWd} y=20>{yearMax - col * yearTic}</text>
    {/each}

    <!-- Persons -->
    {#each nodes as [person, node], row}
        {#if node.yNode() && node.yNode().hasParent() }
            <path class="link" d={cubicData(node, node.yNode())} />
        {/if}
        {#if node.xNode() && node.xNode().hasParent() }
            <path class="link" d={cubicData(node, node.xNode())} />
        {/if}
        <circle class="birth" cx={cx(node)} cy={cy(node)} r={yearWd} />
        <text class="birth" x={cx(node)} y={cy(node)}>{person.birthYear()} {person.fullName()}</text>
    {/each}
</svg>

<style>
    .birth {
        fill: red;
        font-size: 16px;
        stroke: black;
        stroke-width: 1;
    }
    .grid {
        fill: lightgreen;
        font-size: 16px;
        font-weight:lighter;
        stroke: black;
        stroke-width: 1;
    }
    .link {
        fill: none;
        stroke: grey;
        stroke-width: 2;
        stroke-linecap: flat;
    }
</style>