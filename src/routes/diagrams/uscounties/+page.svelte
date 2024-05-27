<script>
    import Settings from '$lib/Sylvan/svelte/SettingsOffcanvas/Settings.svelte'

    import IR from '$lib/data/maps/edited/ireland.svg'
    import GB from '$lib/data/maps/edited/gb.svg'
    import KY from '$lib/data/maps/edited/KY.svg'
    import MD from '$lib/data/maps/edited/MD.svg'
    import MN from '$lib/data/maps/edited/MN.svg'
    import US from '$lib/data/maps/edited/Usa_counties_large.svg'
    import { gxmlStr } from '$lib/Gxml/index.js'

    export let mapRef = IR
    export let mapScale = 1
    const maps = [
        {value: IR, title: 'Ireland Counties'},
        {value: GB, title: 'Great Britain Counties'},
        {value: KY, title: 'Kentucky Counties'},
        {value: MD, title: 'Maryland Counties'},
        {value: MN, title: 'Minnesota Counties'},
        {value: US, title: 'US Counties'}
    ]

    const id = 'map-scale'

    function html(mapRef, mapScale) {
        const map = {el: 'image', x: 0, y: 0, href: mapRef,
            transform: `scale(${mapScale})`,
            // opacity: 0.3,
            preserveAspectRation: 'xMidYMid',   // 'xMidYMid', 'meet' or 'slice'
        }
        const els = [{el: 'svg', x: 0, y: 0, width: 1000, height: 1000,
            els: [map]}]
        const svg = gxmlStr(els)
        return svg
    }
</script>

<Settings id="maps" title="Settings">

<div class="row">
    <h5>Maps</h5>
    <select class="form-select"
        id="maps"
        bind:value={mapRef}>
        {#each maps as map}
            <option value={map.value}>{map.title}</option>
        {/each}
    </select>
</div>
<hr />
<h5>Scale</h5>
{#each [1, 2, 3, 4, 5,6] as value, i}
    <div class="form-check form-check-inline m->">
        <input class="form-check-input" type="radio"
            name="{id}" id="{id}-{i}"
            value={value}
            bind:group={mapScale}
            autocomplete="off" />
        <label class="form-check-label" for="{id}-{i}">{value}"</label>
    </div>
{/each}
</Settings>

<h5>US Counties</h5>
    {@html html(mapRef, mapScale)}
<h5>Done</h5>
