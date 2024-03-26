<script>
	import SvgSandbox from '$lib/Sylvan/svelte/SvgSandbox.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    export let data // contain data.sylvan loaded and passed here by ./+page.js:load()
</script>

<SvgSandbox sylvan={data.sylvan} subjectNameKey={$subjectNameKey} />