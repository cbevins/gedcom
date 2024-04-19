<script>
    import { Anodes } from '$lib/Sylvan/class/Anodes.js'
    import { Vines } from '$lib/Sylvan/class/Vines.js'
    import { VinesGeom } from '$lib/Sylvan/class/VinesGeom.js'
    import SylvanSvgNuclear from '$lib/Sylvan/svelte/SylvanSvgNuclear.svelte'
    export let sylvan
    export let subjectNameKey

    // Determine VineNodes for current subject
    $: subject = sylvan.people().find(subjectNameKey)
    $: vines = new Vines(subject)
    $: nodes = vines.nodesBySeq()    // Array of [Person, VineNode] pairs by sequence number

    $: anodes = new Anodes(subject).anodesBySeq()

    // Geometry of the Vines grid
    $: geom = new VinesGeom(vines)
    $: scale = 1
    $: console.log('Gens/Cols', geom.gridCols(), 'Rows/Nodes', geom.gridRows(),
        'Grid Wd', geom.gridWidth(), 'Grid Ht', geom.gridHeight())

    function round2(num) { return Math.round((num + Number.EPSILON) * 100) / 100 }
    function quadraticX(node) { return (geom.linkPosParentX(node) + geom.linkPosChildX(node)) / 2 }
    // function quadraticY(node) { return (100 + geom.linkPosParentY(node) + geom.linkPosChildY(node)) / 2 }
</script>

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.gridWidth()/scale} height={geom.gridHeight()/scale}
    viewBox="0, 0, {geom.gridWidth()}, {geom.gridHeight()}"
    transform="scale(1)">
    <!-- Reference grid background with labels -->
    <rect class="grid" x="0" y="0" width={geom.gridWidth()} height={geom.gridHeight()} />
    <!-- {#each Array(geom.gridCols()) as unused, col}
        {#each Array(geom.gridRows()) as moreUnused, row}
            <rect class="grid" x={col*geom.boxWidth()} y={row*geom.boxHeight()}
                width={geom.boxWidth()} height={geom.boxHeight()} /> 
            <text x={col*geom.boxWidth() + geom.boxWidth()/2-10}
                y={row*geom.boxHeight() + geom.boxHeight()/2+6}>{col},{row}</text>
        {/each}
    {/each} -->

    <defs>
        <g id="father">
            <rect class="father" x={0} y={0}
                width={geom.tagWidth()} height={geom.tagHeight()} rx={10} ry={10}/>
        </g>
        <g id="mother">
            <rect class="mother" x={0} y={0}
                width={geom.tagWidth()} height={geom.tagHeight()} rx={10} ry={10}/>
        </g>
        <g id="cell">
            <!-- <rect class="cell" x={0} y={0} width={geom.boxWidth()} height={geom.boxHeight()} /> -->
            <use href="#father" transform={geom.tagFatherTranslate()}/>
            <use href="#mother" transform={geom.tagMotherTranslate()}/>
            <path class="linkage" d={geom.linkChildData()}/>
        </g>
        <g id="linkX">
            <path class="linkage" d={geom.linkMotherData()}/>
        </g>
        <g id="linkY">
            <path class="linkage" d={geom.linkFatherData()}/>
        </g>
    </defs>

    <!-- Insert VineNodes into the grid according to some algorithm -->
    <!-- Remember that *nodes* is an array of [Person, VineNode] pairs! -->
    {#each nodes as [person, node]}
        <use href="#cell" transform="translate({geom.boxPosX(node)}, {geom.boxPosY(node)})"/>

        <!-- Badges for generation, col, row, and seq -->
        <text x={geom.boxPosX(node)+geom.boxPadLeft()+geom.tagPadLeft()} y={geom.boxPosY(node) + 15}>
            G{node.childGen()}, C{geom.nodeCol(node)}, R{round2(geom.nodeRow(node))}, S{node.childSeq(node)}
        </text>

        <!-- Connector from father's tag to his parents' node -->
        {#if node.yNode() && node.yNode().hasParent() }
            <use href="#linkY" transform="translate({geom.boxPosX(node)}, {geom.boxPosY(node)})" />
        {:else}
            <circle cx={geom.boxPosX(node) + geom.boxPadLeft() + geom.tagWidth() - 10}
                cy={geom.boxPosY(node) + geom.boxPadTop() + geom.tagHeight()/2}
                r={10} fill="red"/>
        {/if}

        <!-- Connector from mother's tag to her parents' node -->
        {#if node.xNode() && node.xNode().hasParent() }
            <use href="#linkX" transform="translate({geom.boxPosX(node)}, {geom.boxPosY(node)})" />
        {:else}
            <circle cx={geom.boxPosX(node) + geom.boxPadLeft() + geom.tagWidth() - 10}
                cy={geom.boxPosY(node) + geom.boxPadTop() + geom.tagHeight() + geom.boxPadMiddle() + geom.tagHeight()/2}
                r={10} fill="red"/>
        {/if}

        <!-- Connector from parents' node back to the child tag -->
        {#if node.childNode()}
            <path class="linkage" d="M {geom.linkPosParentX(node)} {geom.linkPosParentY(node)}
                C {quadraticX(node)} {geom.linkPosParentY(node)} {quadraticX(node)} {geom.linkPosChildY(node)}
                {geom.linkPosChildX(node)} {geom.linkPosChildY(node)}" />
            {/if}

        <!-- Fathers label -->
        <text x={geom.textPosX(node)}, y={geom.textPosYFather(node)}>{node.yLabel()}</text>

        <!--  For now, also display the connecting child's label -->
        <text x={geom.textPosX(node)},
            y={geom.boxPosY(node)+geom.boxPadTop() + geom.tagHeight() + geom.boxPadMiddle() - 5}>
            {node.childSeq()}: {node.childLabel()}</text>

        <!-- Mother's label -->
        <text x={geom.textPosX(node)}, y={geom.textPosYMother(node)}>{node.xLabel()}</text>
    {/each}

    <SylvanSvgNuclear anode={anodes[0]} x={100} y={100} />
</svg>

<style>
    .linkage {
        fill: none;
        stroke: grey;
        stroke-width: 20;
        stroke-linecap: flat;
    }
    .grid {
        fill: lightgreen;
        stroke: black;
        stroke-width: 1;
    }
    .cell {
        fill: lightgreen;
        stroke: lightgreen;
        stroke-width: 1;
    }
    .father {
        fill: cyan;
        stroke: cyan;
        stroke-width: 1;
    }
    .mother {
        fill: pink;
        stroke: pink;
        stroke-width: 1;
    }
</style>