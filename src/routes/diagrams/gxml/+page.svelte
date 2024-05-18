<script>
    import LineageTrainPosterSvg from '$lib/LineageTrainPosterSvg/LineageTrainPosterSvg.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: scale = 1
    $: guides = false

    const scaleValues = [4.25, 1.8, 1]
    const scaleLabels = [8.5,20, 36]
    const guideValues = [false, true]
    const guideLabels = ['Hide', 'Show']
</script>

<div class="row">
    <div class="col-sm-1">
        Width: 
        {#each scaleValues as scaleValue, i}
            <div class="form-check">
                <input type="radio" class="form-check-input" id="size{i}"
                    name="pageSizes"
                    value={scaleValue}
                    bind:group={scale} checked>
                {scaleLabels[i]} inches
                <label class="form-check-label" for="size{i}"></label>
            </div>
        {/each}
    </div>

    <div class="col-sm-1">
        Guides:
        {#each guideValues as guideValue, i}
            <div class="form-check">
                <input type="radio" class="form-check-input" id="guideopt{i}"
                    name="guides"
                    value={guideValue}
                    bind:group={guides}>
                {guideLabels[i]}
                <label class="form-check-label" for="guideopt{i}"></label>
            </div>
        {/each}
    </div>

</div>

<LineageTrainPosterSvg subjectNameKey={$subjectNameKey} {scale} {guides} />
