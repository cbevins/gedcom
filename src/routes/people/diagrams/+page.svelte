<script>
    import { FamilyTree } from '$lib/Sylvan/class/FamilyTree.js'
    import { FamilyNodeModel } from '$lib/Sylvan/svg/FamilyNodeModel.js'
	import SvgSandbox from '$lib/Sylvan/svelte/SvgSandbox.svelte'
	import FamilyNode from '$lib/Sylvan/svg/FamilyNode.svelte'
    
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DEREFERENCE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    // Determine FamilyTreeNodes for current subject
    $: subject = getSylvan().people().find($subjectNameKey)
    $: tree = new FamilyTree(subject) 
    $: nodes = tree.nodesBySeq()

    // Get the FamilyNodeModel
    $: model = new FamilyNodeModel()
    $: nodeWd = model.nodeWidth()
    $: nodeHt = model.nodeHeight()
    
    // Determine size of grid to contain the FamilyTreeNodes
    $: cols = tree.gens().length + 1
    $: rows = tree.maxNodeCount()
    $: width = cols * model.nodeWidth()
    $: height = rows * model.nodeHeight()
    $: console.log('Gens/Cols', cols, 'Rows/Nodes', rows)
</script>

<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <rect width={width} height={height} x="0" y="0" rx="0" ry="0" fill="gray" stroke="black" stroke-width="4" transform="scale(1)" />
    
    {#each Array(cols) as unused, col}
        <line x1={col*nodeWd} y1={0} x2={col*nodeWd} y2={height} stroke="black" stroke-width="1"/>
    {/each}

    {#each Array(rows) as unused, row}
        <line x1={0} y1={row*nodeHt} x2={width} y2={row*nodeHt} stroke="black" stroke-width="1"/>
    {/each}

    {#each Array(cols) as unused, col}
        {#each Array(rows) as moreUnused, row}
            <text x={col*nodeWd+nodeWd/2} y={row*nodeHt+nodeHt/2}>{col},{row}</text>
        {/each}
    {/each}

    <!-- Remember that *nodes* is an array of [Family, FamilyTreeNode] pairs! -->
    {#each nodes as [family, node]}
        <FamilyNode family={family} {model} x={(1+node.gen())*nodeWd} y={node.fill()*nodeHt} />
    {/each}
</svg>