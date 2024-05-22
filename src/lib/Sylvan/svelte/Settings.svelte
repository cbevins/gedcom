<script>
    import SylvanSubjectSelector from '$lib/Sylvan/svelte/SylvanSubjectSelector.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'

    export let id = 'settings'
    export let title = 'Your Title Here'

    $: fullId = id + '-settings'
    $: target = '#' + fullId

</script>

<div class="container-fluid mt-3" style="position: fixed;">
    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target={target}>
        {title}
    </button>
</div>

<div class="offcanvas offcanvas-start text-bg-dark" id={fullId}>
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">{title}</h3>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>
    <hr/>
    <div class="offcanvas-body">
        <div class="row">
            <h5>Subject Person</h5>
            <SylvanSubjectSelector sylvan={getSylvan()}/>
        </div>
        <hr/>
        <slot />
    </div>
</div>

