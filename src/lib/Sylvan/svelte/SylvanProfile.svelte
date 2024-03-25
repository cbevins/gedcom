<script>
	import SylvanPersonBrief from '$lib/Sylvan/svelte/SylvanPersonBrief.svelte'
    export let subjectNameKey    // this is a nameKey like 'CollinDouglasBevins1952'
    export let sylvan
</script>

<h5 class="card-title mb-0">
    <SylvanPersonBrief {sylvan} bind:subjectNameKey={subjectNameKey} label='' />
</h5>
<hr>
