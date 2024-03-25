<script>
	import NotesBadge from '$lib/Sylvan/svelte/Profile/NotesBadge.svelte'
	import SourcesBadge from '$lib/Sylvan/svelte/Profile/SourcesBadge.svelte'
	import UnionLine from '$lib/Sylvan/svelte/Profile/UnionLine.svelte'
    export let label = ''
    export let subjectNameKey
    export let sylvan

    $: subject = sylvan.people().find(subjectNameKey)

    function changeSubject(newKey) {
        const newPerson = sylvan.people().find(newKey)
        if (newPerson) subjectNameKey = newKey
    }
</script>

<span class='detail'>{label}</span>
{#if label!==''}
    <a href="#/" on:click={changeSubject(subject.nameKey())}>{subject.label()}</a>
{:else}
    {subject.label()}
{/if}

<div class='details'>
    <span class='detail'>Born:</span> {subject.birthLine()}
    <NotesBadge label='Birth' notes={subject.birthNotes()} />
    <SourcesBadge label='Birth' sources={subject.birthSourceKeys()} />
</div>

{#each subject.familySpouses() as family, i}
    <div class='details'>
        <UnionLine {sylvan} bind:subjectNameKey={subjectNameKey} {family} />
        <NotesBadge label='Union' notes={family.unionNotes()} />
        <SourcesBadge label='Union' sources={family.unionSourceKeys()} />
    </div>
{/each}

<div class='details'>
    <span class='detail'>{subject.isLiving() ? 'Living' : 'Died'}:</span> {subject.deathLine()}
    <NotesBadge label='Death' notes={subject.deathNotes()} />
    <SourcesBadge label='Death' sources={subject.deathSourceKeys()} />
</div>
