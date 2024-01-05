<script>
    import { profile } from '$lib/js/profile.js'
    import Notes from './Notes.svelte'
    import Sources from './Sources.svelte'
    import UnionLine from './UnionLine.svelte'
    export let ged
    export let subjectNameKey    // this is a nameKey like 'CollinDouglasBevins1952'
    export let briefKey      // a nameKey
    export let label

    $: prof = profile(ged, briefKey)
    function changeSubject(newKey) {
        const newPerson = ged.person(newKey)
        if (newPerson) subjectNameKey = newKey
    }
</script>

<span class='detail'>{label}</span>
{#if label!==''}
    <a href="#/" on:click={changeSubject(prof.personKey)}>{prof.nameLine}</a>
{:else}
    {prof.nameLine}
{/if}

<div class='details'>
    <span class='detail'>Born:</span> {prof.birthLine}
    <Notes label='Birth' notes={prof.birthNotes} />
    <Sources label='Birth' sources={prof.birthSources} />
</div>

{#each prof.spouses as spouse, i}
    <div class='details'>
        <UnionLine {ged} bind:subjectNameKey={subjectNameKey} {spouse} />
        <Notes label='Union' notes={spouse.unionNotes} />
        <Sources label='Union' sources={spouse.unionSources} />
    </div>
{/each}

<div class='details'>
    <span class='detail'>Died:</span> {prof.deathLine}
    <Notes label='Death' notes={prof.deathNotes} />
    <Sources label='Death' sources={prof.deathSources} />
</div>
