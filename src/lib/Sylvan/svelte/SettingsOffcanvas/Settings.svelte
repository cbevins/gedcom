<script>
    import Gears from '$lib/images/svg/settings-54.svg' // -54 or -512
    
    export let id = 'settings'
    export let label = ''
    export let title = 'Your Title Here'

    $: fullId = id + '-settings'
    $: target = '#' + fullId
</script>

<div class="container-fluid mt-3"
        style="position: fixed; top: 30px; left: -10px;">
    <button class="btn btn-info" type="button"
            data-bs-toggle="offcanvas"
            data-bs-target={target}>
        <img class="gears" src={Gears} alt="Settings"/>
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
        <slot />
    </div>
</div>

<style>
    .gears{
        width:50px;
        height:auto;
        max-height:50px;
        object-fit: scale-down;
    }
</style>
