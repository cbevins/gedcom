<script>
    import Settings from '$lib/Sylvan/svelte/Settings.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    import LineageChartPosterSvg from '$lib/LineageChartPosterSvg/LineageChartPosterSvg.svelte'

    $: settings = {
        grid: true,
        guides: false,
        portrait: true,
        scale: 1,
    }

    const scaleValues = [4.25, 1.8, 1]
    const scaleLabels = [8.5,20, 36]
    const orientValues = [true, false]
    const orientLabels = ['Portrait', 'Landscape']
    const guideValues = [false, true]
    const guideLabels = ['Hide', 'Show']
</script>

<Settings id="lineagechart" title="Settings">

    <div class="row">
        <h5>Display Width</h5>
        {#each scaleValues as scaleValue, i}
            <div class="form-check">
                <input type="radio" class="form-check-input" id="size{i}"
                    name="pageSizes"
                    value={scaleValue}
                    bind:group={settings.scale} checked>
                {scaleLabels[i]} inches
                <label class="form-check-label" for="size{i}"></label>
            </div>
        {/each}
    </div>

    <hr/>
    <div class="row">
        <h5>Rule Guides</h5>
        {#each guideValues as guideValue, i}
            <div class="form-check">
                <input type="radio" class="form-check-input" id="guideopt{i}"
                    name="guides"
                    value={guideValue}
                    bind:group={settings.guides}>
                {guideLabels[i]}
                <label class="form-check-label" for="guideopt{i}"></label>
            </div>
        {/each}
    </div>

    <hr/>
    <div class="row">
        <h5>Orientation</h5>
        {#each orientValues as orientValue, i}
            <div class="form-check">
                <input type="radio" class="form-check-input" id="orienteopt{i}"
                    name="orient"
                    value={orientValue}
                    bind:group={settings.portrait}>
                {orientLabels[i]}
                <label class="form-check-label" for="orientopt{i}"></label>
            </div>
        {/each}
    </div>

</Settings>
<LineageChartPosterSvg subjectNameKey={$subjectNameKey} {settings} />
