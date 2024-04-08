<script>
    import { Vines } from '$lib/Sylvan/class/Vines.js'
    import { VinesGeom } from '$lib/Sylvan/class/VinesGeom.js'
    export let sylvan
    export let subjectNameKey

    // Determine VineNodes for current subject
    $: subject = sylvan.people().find(subjectNameKey)
    $: vines = new Vines(subject)
    $: nodes = vines.nodesBySeq()    // Array of [Person, VineNode] pairs by sequence number
    
    // Geometry of the Vines grid
    $: geom = new VinesGeom(vines)
    $: console.log('Hello: Gens/Cols', geom.gridCols(), 'Rows/Nodes', geom.gridRows())
</script>

<svg xmlns="http://www.w3.org/2000/svg"
    width={geom.gridWidth()} height={geom.gridHeight()}
    viewBox="0, 0, {geom.gridWidth()}, {geom.gridHeight()}"
    transform="scale(1, 1)">
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
            <rect class="cell" x={0} y={0} width={geom.boxWidth()} height={geom.boxHeight()} />
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
            G{node.childGen()}, C{geom.nodeCol(node)}, R{geom.nodeRow(node)}, S{node.childSeq(node)}
        </text>
        <!-- Fathers label -->
        <text x={geom.textPosX(node)}, y={geom.textPosYFather(node)}>{node.yLabel()}</text>
        <!--  For now, display the connecting child's label -->
        <text x={geom.textPosX(node)},
            y={geom.boxPosY(node)+geom.boxPadTop() + geom.tagHeight() + geom.boxPadMiddle() - 5}>
            {node.childSeq()}: {node.childLabel()}</text>

        <text x={geom.textPosX(node)}, y={geom.textPosYMother(node)}>{node.xLabel()}</text>
        
        {#if node.yNode() && node.yNode().hasParent() }
            <use href="#linkY" transform="translate({geom.boxPosX(node)}, {geom.boxPosY(node)})" />
        {/if}
        {#if node.xNode() && node.xNode().hasParent() }
            <use href="#linkX" transform="translate({geom.boxPosX(node)}, {geom.boxPosY(node)})" />
        {/if}
        {#if node.childNode()}
            <line class="linkage" x1={geom.linkPosParentX(node)} y1={geom.linkPosParentY(node)}
                x2={geom.linkPosChildX(node)} y2={geom.linkPosChildY(node)} />
        {/if}
    {/each}
</svg>

<style>
    .linkage {
        fill: none;
        stroke: black;
        stroke-width: 1;
        stroke-linecap: round;
    }
    .grid {
        fill: gray;
        stroke: black;
        stroke-width: 1;
    }
    .cell {
        fill: grey;
        stroke: gray;
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