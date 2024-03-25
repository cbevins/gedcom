<script>
	import Notes from '$lib/Sylvan/svelte/Profile/Notes.svelte'
	import SylvanPersonBrief from '$lib/Sylvan/svelte/SylvanPersonBrief.svelte'

    export let subjectNameKey    // this is a nameKey like 'CollinDouglasBevins1952'
    export let sylvan

    $: subject = sylvan.people().find(subjectNameKey)
</script>

<h5 class="card-title mb-0">
    <SylvanPersonBrief {sylvan} person={subject} bind:subjectNameKey={subjectNameKey} label='' />
</h5>
<hr>
<div class="accordion" id="fileCard">
    <!-- PARENTAL FAMILIES HERE -->
    {#each subject.familyParents() as family, i}
    <div class="accordion-item">
        <h2 class="accordion-header" id={"parents-siblings-heading"+i}>
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#parents-siblings-collapse"+i} aria-expanded="true" aria-controls={"parents-siblings-collapse"+i}>
                Parental Family {i+1} with {family.children().length} Children
            </button>
        </h2>
        <div id={"parents-siblings-collapse"+i} class="accordion-collapse collapse show" aria-labelledby={"parents-siblings-heading"+i}>
            <div class="accordion-body">
                <div class='details'>
                    <SylvanPersonBrief {sylvan} person={family.yParent()} bind:subjectNameKey={subjectNameKey} label='Father:'  />
                </div>
                <div class='details'>
                    <SylvanPersonBrief {sylvan} person={family.xParent()} bind:subjectNameKey={subjectNameKey} label='Mother:'  />
                </div>
                <hr>
                {#each family.children() as child, j}
                    <div class='details'>
                        <SylvanPersonBrief {sylvan} person={child} bind:subjectNameKey={subjectNameKey} label={'Child '+(j+1)+'.'} />
                    </div>
                {/each}
            </div>
        </div>
    </div>
    {/each}
    
    <!-- SPOUSE FAMILIES HERE -->
    {#each subject.familySpouses() as family, i}
        <div class="accordion-item">
            <h2 class="accordion-header" id={"spouse-heading-"+i}>
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#spouse-collapse-"+i} aria-expanded="false" aria-controls={"spouse-collapse-"+i}>
                    Spousal Family {i+1} with {family.children().length} Children
                </button>
            </h2>
            <div id={"spouse-collapse-"+i} class="accordion-collapse collapse" aria-labelledby={"spouse-heading-"+i}>
                <div class="accordion-body">
                    <div class='details'>
                        <SylvanPersonBrief {sylvan} person={family.spouse(subject)} bind:subjectNameKey={subjectNameKey} label='Spouse:'  />
                    </div>
                    <hr>
                    {#each family.children() as child, j}
                    <div class='details'>
                        <SylvanPersonBrief {sylvan} person={child} bind:subjectNameKey={subjectNameKey} label={(j+1)+'.'} />
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}

    <div class="accordion-item">
        <h2 class="accordion-header" id="notes-heading">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notes-collapse" aria-expanded="false" aria-controls="notes-collapse">
                Individual Notes ({subject.notes().length})
            </button>
        </h2>
        <div id="notes-collapse" class="accordion-collapse collapse" aria-labelledby="notes-heading">
            <div class="accordion-body">
                <Notes person={subject} />
                <!-- {@html notesHtml(subject.notes())} -->
            </div>
        </div>
    </div>
</div>