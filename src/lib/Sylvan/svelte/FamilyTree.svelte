<script>
    import { FamilyTree } from '$lib/Sylvan/class/FamilyTree.js'
    export let sylvan
    export let subjectNameKey

    // Determine FamilyTreeNodes for current subject
    $: subject = sylvan.people().find(subjectNameKey)
    $: tree = new FamilyTree(subject) 
    $: nodes = tree.nodesBySeq()    // Array of [Family, FamilyTreeNode] pairs by sequence number

    // Individual spousal pair tag geometry
    const tagWd = 400
    const tagHt = 20
    const tagLeft = 10
    const tagBottom = 5
    // Geometry of the node containing the parental pair
    const nodeTop = 20
    const nodeBottom = 20
    const nodeMiddle = 10
    const nodeLeft = 40
    const nodeRight = 40
    const nodeHt = nodeTop + nodeMiddle + nodeBottom + 2 * tagHt
    const nodeWd = nodeLeft + tagWd + nodeRight
    
    // Geometry of the FamilyTreeNodes grid
    $: gridCols = tree.gens().length + 1
    $: gridRows = tree.maxNodeCount()
    $: gridWd = gridCols * nodeWd
    $: gridHt = gridRows * nodeHt
    $: console.log('Gens/Cols', gridCols, 'Rows/Nodes', gridRows, nodeHt)

    function dump() {
        const person = sylvan.people().find('JohnBevins1783')
        console.log('family.parents().length=', person.familyParents().length)
        console.log('family.parent(0)=', person.familyParent(0))
    }
    dump()

    // Return the translation [x,y] for a node
    function nodeX(node) { return (1+node.gen()) * nodeWd }
    function nodeY(node) { return node.fill() * nodeHt }
    function textX(node) { return nodeX(node) + nodeLeft + tagLeft }
    function textY0(node) { return nodeY(node) + nodeTop + tagHt - tagBottom }
    function textY1(node) { return nodeY(node) + nodeTop + 2*tagHt + nodeMiddle - tagBottom }
</script>

<svg width={gridWd} height={gridHt} xmlns="http://www.w3.org/2000/svg">
    <!-- Grid background with labels -->
    {#each Array(gridCols) as unused, col}
        {#each Array(gridRows) as moreUnused, row}
            <rect class="grid" x={col*nodeWd} y={row*nodeHt} width={nodeWd} height={nodeHt} /> 
            <text x={col*nodeWd+nodeWd/2-10} y={row*nodeHt+nodeHt/2+6}>{col},{row}</text>
        {/each}
    {/each}

    <defs>
        <g id="spouse">
            <rect class="spouse" x={0} y={0} width={tagWd} height={tagHt} rx={10} ry={10}/>
        </g>
        <g id="node">
            <rect class="node" x={0} y={0} width={nodeWd} height={nodeHt} />
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

    <!-- Insert FamiltyTreeNodes into the grid according to some algorithm -->
    <!-- Remember that *nodes* is an array of [Family, FamilyTreeNode] pairs! -->
    {#each nodes as [family, node]}
        <use href="#node" transform="translate({nodeX(node)}, {nodeY(node)})"/>
        <text x={textX(node)}, y={textY0(node)}>{node.yName()}</text>
        <text x={textX(node)}, y={textY1(node)}>{node.xName()}</text>
        {#if node.yNode()}
            <use href="#linkY" transform="translate({nodeX(node)}, {nodeY(node)})" />
        {/if}
        {#if node.xNode()}
            <use href="#linkX" transform="translate({nodeX(node)}, {nodeY(node)})" />
        {/if}
    {/each}
</svg>

<style>
    .linkage {
        fill: none;
        stroke: black;
        stroke-width: 4;
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