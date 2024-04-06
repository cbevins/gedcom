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
    $: console.log('Gens/Cols', geom.gridCols(), 'Rows/Nodes', geom.gridRows())

    // Return the translation [x,y] for a node
    function nodeX(node) { return (1+node.childGen()) * nodeWd }
    function nodeY(node) { return node.childPos() * nodeHt }
    function textX(node) { return nodeX(node) + nodeLeft + tagLeft }
    function textY0(node) { return nodeY(node) + nodeTop + tagHt - tagBottom }
    function textY1(node) { return nodeY(node) + nodeTop + 2*tagHt + nodeMiddle - tagBottom }

    // parent-to-child linkage line coordinates
    function pcx1(pnode) { return nodeX(pnode) }
    function pcy1(pnode) { return nodeY(pnode) + nodeHt/2 }
    function pcx2(pnode) { return nodeX(pnode) - nodeRight/2 }
    function pcy2(pnode) {
        const y = pnode.child().isFemale() ? 60 : 30
        return Math.trunc(pnode.childPos()/2) * nodeHt + y
    }
</script>

<svg width={geom.gridWidth()} height={geom.gridHeight()} xmlns="http://www.w3.org/2000/svg">
    <!-- Reference grid background with labels -->
    {#each Array(geom.gridCols()) as unused, col}
        {#each Array(geom.gridRows()) as moreUnused, row}
            <rect class="grid" x={col*geom.boxWidth()} y={row*geom.boxHeight()}
                width={geom.boxWidth()} height={geom.boxHeight()} /> 
            <text x={col*geom.boxWidth() + geom.boxWidth()/2-10}
                y={row*geom.boxHeight() + geom.boxHeight()/2+6}>{col},{row}</text>
        {/each}
    {/each}

    <defs>
        <g id="spouse">
            <rect class="spouse" x={0} y={0}
                width={geom.tagWidth()} height={geom.tagHeight()} rx={10} ry={10}/>
        </g>
        <g id="node">
            <rect class="node" x={0} y={0} width={geom.boxWidth()} height={geom.boxHeight()} />
            <use href="#spouse" transform="translate(40, 20)"/>
            <use href="#spouse" transform="translate(40, 50)"/>
            <path class="linkage" d="M 40, 30 L 20 30 L 20 60 L 40 60 M 20 45 L 0 45"/>
        </g>
        <g id="linkX">
            <path class="linkage" d="M 440 60 L 460 60"/>
        </g>
        <g id="linkY">
            <path class="linkage" d="M 440, 30 L 460 30"/>
        </g>
    </defs>

    <!-- Insert VineNodes into the grid according to some algorithm -->
    <!-- Remember that *nodes* is an array of [Person, VineNode] pairs! -->
    {#each nodes as [person, node]}
        <use href="#node" transform="translate({geom.boxPosX(node)}, {geom.boxPosY(node)})"/>

        <text x={geom.textPosX(node)}, y={geom.boxPosY(node)+35}>{node.yLabel()}</text>

        <text x={geom.textPosX(node)}, y={geom.boxPosY(node)+50}>
            {geom.nodeRow(node)}: {node.childLabel()}</text>

        <text x={geom.textPosX(node)}, y={geom.boxPosY(node)+70}>{node.xLabel()}</text>
        
        <!-- {#if node.yNode() && node.yNode().hasParent() }
            <use href="#linkY" transform="translate({nodeX(node)}, {nodeY(node)})" />
        {/if}
        {#if node.xNode() && node.xNode().hasParent() }
            <use href="#linkX" transform="translate({nodeX(node)}, {nodeY(node)})" />
        {/if}
        {#if node.childNode()}
            <line class="linkage" x1={pcx1(node)} y1={pcy1(node)} x2={pcx2(node)} y2={pcy2(node)} />
        {/if} -->
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
    .node {
        fill: #cd803d;
        stroke: black;
        stroke-width: 1;
    }
    .spouse {
        fill: white;
        stroke: black;
        stroke-width: 1;
    }
</style>