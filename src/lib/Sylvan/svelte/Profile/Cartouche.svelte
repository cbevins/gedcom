<script>
	import NotesBadge from '$lib/Sylvan/svelte/Profile/NotesBadge.svelte'
	import SourcesBadge from '$lib/Sylvan/svelte/Profile/SourcesBadge.svelte'
	import UnionLine from '$lib/Sylvan/svelte/Profile/UnionLine.svelte'

	export let sylvan
    export let subjectNameKey

    $: subject = sylvan.people().find(subjectNameKey)
</script>

<div class="card">
    {subject.label()}

    <div class='details'>
        <span class='detail'>Born:</span> {subject.birthLine()}
        <NotesBadge label='Birth' notes={subject.birthNotes()} />
        <SourcesBadge label='Birth' sources={subject.birthSourceKeys()} />
    </div>
<!-- 
    {#each subject.familySpouses() as family, i}
    <div class='details'>
        <UnionLine sylvan={sylvan} {family} bind:subjectNameKey={subjectNameKey} />
        <NotesBadge label='Union' notes={family.unionNotes()} />
        <SourcesBadge label='Union' sources={family.unionSourceKeys()} />
    </div>
    {/each} -->

    <div class='details'>
        <span class='detail'>{subject.isLiving() ? 'Living' : 'Died'}:</span> {subject.deathLine()}
        <NotesBadge label='Death' notes={subject.deathNotes()} />
        <SourcesBadge label='Death' sources={subject.deathSourceKeys()} />
    </div>
</div>
