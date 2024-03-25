<script>
	import NotesBadge from '$lib/Sylvan/svelte/Profile/NotesBadge.svelte'
	import SourcesBadge from '$lib/Sylvan/svelte/Profile/SourcesBadge.svelte'
	import UnionLine from '$lib/Sylvan/svelte/Profile/UnionLine.svelte'
    
    export let label = ''
    export let person
    export let subjectNameKey
    export let sylvan

    function changeSubject(newKey) {
        const newPerson = sylvan.people().find(newKey)
        if (newPerson) subjectNameKey = newKey
    }
</script>

<span class='detail'>{label}</span>
{#if label!==''}
    <a href="#/" on:click={changeSubject(person.nameKey())}>{person.label()}</a>
{:else}
    {person.label()}
{/if}

<div class='details'>
    <span class='detail'>Born:</span> {person.birthLine()}
    <NotesBadge label='Birth' notes={person.birthNotes()} />
    <SourcesBadge label='Birth' sources={person.birthSourceKeys()} />
</div>

{#each person.familySpouses() as family, i}
    <div class='details'>
        <UnionLine {sylvan} bind:subjectNameKey={subjectNameKey} {family} />
        <NotesBadge label='Union' notes={family.unionNotes()} />
        <SourcesBadge label='Union' sources={family.unionSourceKeys()} />
    </div>
{/each}

<div class='details'>
    <span class='detail'>{person.isLiving() ? 'Living' : 'Died'}:</span> {person.deathLine()}
    <NotesBadge label='Death' notes={person.deathNotes()} />
    <SourcesBadge label='Death' sources={person.deathSourceKeys()} />
</div>
