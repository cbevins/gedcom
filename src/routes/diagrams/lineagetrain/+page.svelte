<script>
    import Settings from '$lib/Sylvan/svelte/SettingsOffcanvas/Settings.svelte'
    import DisplayWidth from '$lib/Sylvan/svelte/SettingsOffcanvas/DisplayWidth.svelte'
    import PageOrientation from '$lib/Sylvan/svelte/SettingsOffcanvas/PageOrientation.svelte'
    import PosterOrImage from '$lib/Sylvan/svelte/SettingsOffcanvas/PosterOrImage.svelte'
    import RuleGuides from '$lib/Sylvan/svelte/SettingsOffcanvas/RuleGuides.svelte'
    import TimelineUpper from '$lib/Sylvan/svelte/SettingsOffcanvas/TimelineUpper.svelte'
    import TimelineLower from '$lib/Sylvan/svelte/SettingsOffcanvas/TimelineLower.svelte'
    import SubjectSelector from '$lib/Sylvan/svelte/SettingsOffcanvas/SubjectSelector.svelte'

    import LineageTrainPosterSvg from '$lib/LineageTrainPosterSvg/LineageTrainPosterSvg.svelte'
    import { US_History, US_Migrations, US_Wars, World_History } from '$lib/LineageTrainPosterSvg/timelineData.js'
    // import { SheetDefs } from '$lib/LineageTrainPosterSvg/sheetDefs.js'
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

    // const sheetValues = [0, 1, 2, 3, 4]
    // const sheetLabels = []
    // SheetDefs.forEach((sheet, idx) => {sheetLabels[idx] = sheet.name})
</script>

<Settings id="lineagetrain" title="Settings">
    <SubjectSelector/>
    <hr/>
    <DisplayWidth bind:settings={settings} id='lineagetrain-displaywidth' />
    <hr />
    <RuleGuides bind:settings={settings} id='lineagetrain-ruleguides' />
    <hr />
    <PageOrientation bind:settings={settings} id='lineagetrain-pageorientation' />
    <hr />
    <PosterOrImage bind:settings={settings} id='lineagetrain-posterorimage' />
    <hr />
    <TimelineUpper bind:settings={settings} id='lineagetrain-timelineupper' />
    <hr />
    <TimelineLower bind:settings={settings} id='lineagetrain-timelinelower' />
</Settings>
<LineageTrainPosterSvg subjectNameKey={$subjectNameKey} {settings} />
