<script>
    import Settings from '$lib/Sylvan/svelte/Settings.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    import LineageChartPosterSvg from '$lib/LineageChartPosterSvg/LineageChartPosterSvg.svelte'

    $: settings = {
        grid: true,
        guides: false,
        portrait: true,
        poster: true,
        scale: 1,
    }

    const gridValues = [true, false]
    const gridLabels = ['Grid', 'No Grid']
    const guideValues = [false, true]
    const guideLabels = ['Hide', 'Show']
    const orientValues = [true, false]
    const orientLabels = ['Portrait', 'Landscape']
    const posterValues = [true, false]
    const posterLabels = ['Poster', 'No Poster']
    const scaleLabels = [8.5, 20, 36, 48]
    const scaleValues = [4.25, 1.8, 1, 0.75]
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

    <hr/>
    <div class="row">
        <h5>Poster</h5>
        {#each posterValues as posterValue, i}
            <div class="form-check">
                <input type="radio" class="form-check-input" id="posteropt{i}"
                    name="poster"
                    value={posterValue}
                    bind:group={settings.poster}>
                {posterLabels[i]}
                <label class="form-check-label" for="posteropt{i}"></label>
            </div>
        {/each}
    </div>

    <hr/>
    <div class="row">
        <h5>Generation Grid</h5>
        {#each gridValues as gridValue, i}
            <div class="form-check">
                <input type="radio" class="form-check-input" id="gridopt{i}"
                    name="grid"
                    value={gridValue}
                    bind:group={settings.grid}>
                {gridLabels[i]}
                <label class="form-check-label" for="gridopt{i}"></label>
            </div>
        {/each}
    </div>

</Settings>
<LineageChartPosterSvg subjectNameKey={$subjectNameKey} {settings} />
