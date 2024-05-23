<script>
    import SylvanSubjectSelector from '$lib/Sylvan/svelte/SylvanSubjectSelector.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'

    export let title = 'Subject'
</script>

<div class="row">
    <h5>{title}</h5>
    <SylvanSubjectSelector sylvan={getSylvan()}/>
</div>
