<script>
    import { FamilyTree } from '$lib/Sylvan/class/FamilyTree.js'
    import { FamilyNodeModel } from '$lib/Sylvan/svg/FamilyNodeModel.js'
	import SvgSandbox from '$lib/Sylvan/svelte/SvgSandbox.svelte'
	import FamilyNode from '$lib/Sylvan/svg/FamilyNode.svelte'
    
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DEREFERENCE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    
    $: subject = getSylvan().people().find($subjectNameKey)
    $: tree = new FamilyTree(subject) 
    $: nodes = tree.nodesBySeq()
    $: rootNode = tree.root()
    $: family = rootNode.family()

    $: model = new FamilyNodeModel()
    $: nodeWd = model.nodeWidth()
    $: nodeHt = model.nodeHeight()
    
    $: cols = tree.lastGen() + 1
    $: rows = tree.maxNodes()
    $: width = cols * model.nodeWidth()
    $: height = rows * model.nodeHeight()

    $: lastGen = -1
    $: seq = 0
    function genSeq(node) {
        if (node.gen() !== lastGen) {
            lastGen = node.gen()
            seq = 0
        } else {
            seq++
        }
        return seq
    }
</script>

<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <rect width={width} height={height} x="0" y="0" rx="0" ry="0" fill="gray" stroke="black" stroke-width="4" transform="scale(1)" />
    
    {#each Array(cols) as nodes, i}
        <line x1={i*nodeWd} y1={0} x2={i*nodeWd} y2={height} stroke="black" stroke-width="1"/>
    {/each}

    {#each Array(rows) as nodes, i}
        <line x1={0} y1={i*nodeHt} x2={width} y2={i*nodeHt} stroke="black" stroke-width="1"/>
    {/each}

    {#each Array(cols) as nodes, col}
        {#each Array(rows) as nodes, row}
            <text x={col*nodeWd+nodeWd/2} y={row*nodeHt+nodeHt/2}>{col},{row}</text>
        {/each}
    {/each}

    {#each nodes as node, i}
    {console.log(node)}
        <FamilyNode family={node[0]} {model} x={node[1].gen()*nodeWd} y={genSeq(node[1])*nodeHt} />
    {/each}


</svg>