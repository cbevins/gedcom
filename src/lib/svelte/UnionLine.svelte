<script>
    import { profile } from '$lib/js/profile.js'
    export let ged
    export let subjectNameKey // a nameKey like 'CollinDouglasBevins1952'
    export let spouse // {famKey:, spouseKey:, childKeys: [], unionLine:, unionNotes: unionSources:}

    $: prof = profile(ged, spouse.spouseKey)
    function changeSubject(newKey) {
        const newPerson = ged.person(newKey)
        if (newPerson) {
            subjectNameKey = newKey
        }
    }
    function children(n) { return (n===1) ? `${n} child` : `${n} children` }
</script>

<span class='detail'>Union:</span> with
<a href="#/" on:click={changeSubject(prof.personKey)}>{prof.nameLine}</a>
 {spouse.unionLine}
[issued {children(spouse.childKeys.length)}]
