<script>
    import Settings from '$lib/Sylvan/svelte/SettingsOffcanvas/Settings.svelte'
    import DisplayWidth from '$lib/Sylvan/svelte/SettingsOffcanvas/DisplayWidth.svelte'
    import GenerationGrid from './GenerationGrid.svelte'
    import PageOrientation from '$lib/Sylvan/svelte/SettingsOffcanvas/PageOrientation.svelte'
    import PosterOrImage from '$lib/Sylvan/svelte/SettingsOffcanvas/PosterOrImage.svelte'
    import RuleGuides from '$lib/Sylvan/svelte/SettingsOffcanvas/RuleGuides.svelte'
    import SubjectSelector from '$lib/Sylvan/svelte/SettingsOffcanvas/SubjectSelector.svelte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    import LineageChartPosterSvg from '$lib/LineageChartPosterSvg/LineageChartPosterSvg.svelte'

    console.log('RUNNING src/routes/diagrams/lineagechart')

    $: settings = {
        grid: true,
        guides: false,
        portrait: true,
        poster: true,
        scale: 1,
    }
</script>

<Settings id="lineagechart" title="Settings">
    <SubjectSelector/>
    <hr/>
    <DisplayWidth bind:settings={settings} id='lineagechart-displaywidth' />
    <hr />
    <RuleGuides bind:settings={settings} id='lineagechart-ruleguides' />
    <hr />
    <PageOrientation bind:settings={settings} id='lineagechart-pageorientation' />
    <hr />
    <PosterOrImage bind:settings={settings} id='lineagechart-posterorimage' />
    <hr />
    <GenerationGrid bind:settings={settings} id='lineagechart-generationgrid' />
</Settings>
<LineageChartPosterSvg subjectNameKey={$subjectNameKey} {settings} />
