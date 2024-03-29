<script>
    import { FamilyTree } from '$lib/Sylvan/class/FamilyTree.js'
    import { FamilyNodeModel } from '$lib/Sylvan/svg/FamilyNodeModel.js'
	import SvgSandbox from '$lib/Sylvan/svelte/SvgSandbox.svelte'
	import FamilyNode from '$lib/Sylvan/svg/FamilyNode.svelte'
    
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    // BE SURE TO DEREFERENCE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: model = new FamilyNodeModel()
    $: subject = getSylvan().people().find($subjectNameKey)
    $: famTree = new FamilyTree(subject) 

    const width = 500
    const height = 500
</script>

<!-- <SvgSandbox sylvan={data.sylvan} subjectNameKey={$subjectNameKey} /> -->
<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
    <rect width={width} height={height} x="0" y="0" rx="0" ry="0" fill="gray" stroke="black" stroke-width="4" transform="scale(1)" />
    <FamilyNode {model} x={10} y={20} />
    <FamilyNode {model} x={10} y={20+model.nodeHeight()} />

</svg>