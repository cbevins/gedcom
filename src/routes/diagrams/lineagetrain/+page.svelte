<script>
    import Settings from '$lib/Sylvan/svelte/Settings.svelte'
    import LineageTrainPosterSvg from '$lib/LineageTrainPosterSvg/LineageTrainPosterSvg.svelte'
    import { US_History, US_Migrations, US_Wars, World_History } from '$lib/LineageTrainPosterSvg/timelineData.js'
    import { SheetDefs } from '$lib/LineageTrainPosterSvg/sheetDefs.js'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: settings = {
        guides: false,
        lowerTimeline: US_History,
        portrait: true,
        poster: true,
        scale: 1,
        sheetNumber: 0,
        upperTimeline: US_Migrations,
    }

    const scaleValues = [4.25, 1.8, 1, 0.75]
    const scaleLabels = [8.5,20, 36, 48]
    const guideValues = [false, true]
    const guideLabels = ['Hide', 'Show']
    const orientValues = [true, false]
    const orientLabels = ['Portrait', 'Landscape']
    const posterValues = [true, false]
    const posterLabels = ['Poster', 'No Poster']
    const sheetValues = [0, 1, 2, 3, 4]
    const sheetLabels = []
    SheetDefs.forEach((sheet, idx) => {sheetLabels[idx] = sheet.name})
</script>

<Settings id="train" title="Settings">

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
        <h5>Upper TimeLine</h5>
        <select class="form-select"
            bind:value={settings.upperTimeline}>
            <option value={US_Migrations}>US_Migrations</option>
            <option value={US_History}>US_History</option>
            <option value={US_Wars}>US_Wars</option>
            <option value={World_History}>World_History</option>
        </select>
    </div>

    <hr />
    <div class="row">
        <h5>Lower TimeLine</h5>
        <select class="form-select"
            bind:value={settings.lowerTimeline}>
            <option value={US_Migrations}>US_Migrations</option>
            <option value={US_History}>US_History</option>
            <option value={US_Wars}>US_Wars</option>
            <option value={World_History}>World_History</option>
        </select>
    </div>

</Settings>
<LineageTrainPosterSvg subjectNameKey={$subjectNameKey} {settings} />
