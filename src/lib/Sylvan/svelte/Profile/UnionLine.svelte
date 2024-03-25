<script>
    export let subjectNameKey
    export let family
    export let sylvan

    $: subject = sylvan.people().find(subjectNameKey)
    $: spouse = family.spouse(subject)

    function changeSubject(family) {
        const newKey = spouse.nameKey()
        console.log(`Changing subject to spouse ${newKey}`)
        const newPerson = sylvan.people().find(newKey)
        if (newPerson) {
            subjectNameKey = newKey
        }
    }

    function children(n) { return (n===1) ? `${n} child` : `${n} children` }
</script>

<span class='detail'>Union:</span> with
    <a href="#/" on:click={changeSubject(spouse.nameKey())}>{spouse.fullName()}</a>
    {family.unionLine()}
    [issued {children(family.children().length)}]
