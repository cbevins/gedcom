<script>
    import LineageTrainPosterSvg from '$lib/LineageTrainPosterSvg/LineageTrainPosterSvg.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    $: branchNameKey = branches[0]
    $: scale = 1
    $: guides = false

    // NOTE: branches only work with their own root!
    // Sooo.. cannot use BJR branch with CDB root
    const branches = [
        'CollinDouglasBevins1952',
        'WilliamCollinsBevins1931',
        'MeartiaMargaretHeddens1933',
        'RalphVernonHeddens1909',
        'MargaretEvaNattrass1914',
        'HarrietLucretiaSing1844',
        'RalphRoyHeddens1890',
        'MeartiaMaeLemler1889',
        'HarrySingNattrass1888',
        'GinaOliviaMyhre1890',
        'SamuelBevins1878',
        'HattieJaneCollins1889',
        'GeorgeWashingtonCollins1870',
        'FrancesMarieShofner1871',
        'WilliamAlfredBevins1843',
        'MaryBolt1822',
        'WilliamLongfordBevins1815',
        'JosephBevins1762'
    ]
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

    Branch:
    <div class="col-sm-4">
        <select class="form-select"
            bind:value={branchNameKey}
            on:change={() => (console.log('page.svelte branch changed to', branchNameKey))}
        >
        {#each branches as branch, i}
            <option>{branch}</option>
        {/each}
        </select>
    </div>

</div>

<LineageTrainPosterSvg subjectNameKey={$subjectNameKey} {branchNameKey} {scale} {guides} />
