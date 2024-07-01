<script>
    import Settings from '$lib/Sylvan/svelte/SettingsOffcanvas/Settings.svelte'

    import BEsm from '$lib/data/maps/simpleMaps/be.svg'
    import DEsm from '$lib/data/maps/simpleMaps/de.svg'
    import EUsm from '$lib/data/maps/simpleMaps/europe.svg'
    import FRsm from '$lib/data/maps/simpleMaps/fr.svg'
    import GBsm from '$lib/data/maps/simpleMaps/gb.svg'
    import IRsm from '$lib/data/maps/simpleMaps/ir.svg'
    import NLsm from '$lib/data/maps/simpleMaps/nl.svg'
    import NOsm from '$lib/data/maps/simpleMaps/no.svg'
    import SEsm from '$lib/data/maps/simpleMaps/se.svg'
    import USsm from '$lib/data/maps/simpleMaps/us.svg'
    import IR from '$lib/data/maps/edited/ireland.svg'
    import GB from '$lib/data/maps/edited/gb.svg'
    import KY from '$lib/data/maps/edited/KY.svg'
    import MD from '$lib/data/maps/edited/MD.svg'
    import MN from '$lib/data/maps/edited/MN.svg'
    import US from '$lib/data/maps/edited/Usa_counties_large.svg'
    import NoEuroImg from '$lib/images/country/NorthEurope_NatGeo.png'
    import { gxmlStr } from '$lib/Gxml/index.js'
    
    console.log('RUNNING src/routes/diagrams/uscounties')

    const maps = [
        {value: BEsm, title: 'BE - SimpleMaps'},
        {value: DEsm, title: 'DE - SimpleMaps'},
        {value: EUsm, title: 'EU - SimpleMaps'},
        {value: FRsm, title: 'FR - SimpleMaps'},
        {value: IRsm, title: 'IR - SimpleMaps'},
        {value: NLsm, title: 'NL - SimpleMaps'},
        {value: NOsm, title: 'NO - SimpleMaps'},
        {value: SEsm, title: 'SE - SimpleMaps'},
        {value: USsm, title: 'US - SimpleMaps'},
        {value: IR, title: 'Ireland Counties - MapSvg'},
        {value: GB, title: 'Great Britain - SimpleMaps Edited'},
        {value: KY, title: 'Kentucky - CreativeCommons Edited'},
        {value: MD, title: 'Maryland - CreativeCommons Edited'},
        {value: MN, title: 'Minnesota - CreativeCommons Edited'},
        {value: US, title: 'US Counties - CreativeCommons'},
        {value: NoEuroImg, title: 'Northern Europe - NatGeo'},
    ]

    export let mapDisplay = maps[0]
    export let mapScale = 1

    const id = 'map-scale'

    function html(mapDisplay, mapScale) {
        const map = {el: 'image', x: 0, y: 0, href: mapDisplay.value,
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
        bind:value={mapDisplay}>
        {#each maps as map}
            <option value={map}>{map.title}</option>
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

<h5>{mapDisplay.title}</h5>
    {@html html(mapDisplay, mapScale)}
<h5>Done</h5>

<style>
    h5 { text-align: center;}
</style>