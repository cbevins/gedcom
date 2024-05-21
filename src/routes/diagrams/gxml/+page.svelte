<script>
    import LineageTrainPosterSvg from '$lib/LineageTrainPosterSvg/LineageTrainPosterSvg.svelte'
    import { US_History, US_Migrations, US_Wars, World_History } from '$lib/LineageTrainPosterSvg/timelineData.js'
    import { SheetDefs } from '$lib/LineageTrainPosterSvg/sheetDefs.js'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    import SylvanSubjectSelector from '$lib/Sylvan/svelte/SylvanSubjectSelector.svelte'
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'

    $: settings = {
        guides: false,
        lowerTimeline: World_History,
        scale: 1,
        sheetNumber: 0,
        upperTimeline: US_History
    }

    const scaleValues = [4.25, 1.8, 1]
    const scaleLabels = [8.5,20, 36]
    const guideValues = [false, true]
    const guideLabels = ['Hide', 'Show']
    const sheetValues = [0, 1, 2, 3, 4]
    const sheetLabels = []
    SheetDefs.forEach((sheet, idx) => {sheetLabels[idx] = sheet.name})
</script>
    
<div class="container-fluid mt-3" style="position: fixed;">
    <button class="btn btn-primary" type="button"
        data-bs-toggle="offcanvas" data-bs-target="#train-settings">
        Settings
    </button>
</div>

<div class="offcanvas offcanvas-start text-bg-dark" id="train-settings">
    <div class="offcanvas-header">
        <h3 class="offcanvas-title">Settings</h3>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
    </div>
    <hr/>
    <div class="offcanvas-body">
        <div class="row">
            <h5>Root Person</h5>
            <SylvanSubjectSelector sylvan={getSylvan()}/>
        </div>
        <hr/>
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
<!-- 
        <div class="row">
            <h5>Display Sheet</h5>
            {#each sheetValues as sheetValue, i}
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="sheetopt{i}"
                        name="sheet"
                        value={sheetValue}
                        bind:group={sheetNumber}>
                    {sheetLabels[i]}
                    <label class="form-check-label" for="sheetopt{i}"></label>
                </div>
            {/each}
        </div>
        <hr/>
         -->
    </div>
</div>

<LineageTrainPosterSvg subjectNameKey={$subjectNameKey} {settings} />
