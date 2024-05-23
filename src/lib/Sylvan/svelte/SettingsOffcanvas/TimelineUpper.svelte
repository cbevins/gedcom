<script>
    import { US_History, US_Migrations, US_Wars, World_History } from '$lib/LineageTrainPosterSvg/timelineData.js'

    export let id='timelineupper'
    export let settings
    export let title = 'Upper Timeline'
</script>

<div class="row">
    <h5>{title}</h5>
    <select class="form-select"
        id="{id}"
        bind:value={settings.upperTimeline}>
        <option value={US_Migrations}>US_Migrations</option>
        <option value={US_History}>US_History</option>
        <option value={US_Wars}>US_Wars</option>
        <option value={World_History}>World_History</option>
    </select>
</div>
