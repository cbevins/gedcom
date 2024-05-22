<script>
    import SylvanSubjectSelector from '$lib/Sylvan/svelte/SylvanSubjectSelector.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import Gears from '$lib/images/svg/settings-54.svg' // -54 or -512
    
    export let id = 'settings'
    export let label = ''
    export let title = 'Your Title Here'

    $: fullId = id + '-settings'
    $: target = '#' + fullId

</script>

<div class="container-fluid mt-3"
        style="position: fixed; top: 0px; left: 0px;">
    <button class="btn btn-info" type="button"
            data-bs-toggle="offcanvas"
            data-bs-target={target}>
        <img class="m-image" src={Gears} alt="Settings"/>
        {label}
    </button>
</div>

<div class="offcanvas offcanvas-start text-bg-dark" id={fullId}>
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">{title}</h3>
        <button type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"></button>
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

<style>
    .m-image{
        width:50px;
        height:auto;
        max-height:50px;
        object-fit: scale-down;
    }
</style>
