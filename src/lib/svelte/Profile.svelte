<script>
    import { profile } from '$lib/js/profile.js'
	import PersonBrief from './PersonBrief.svelte'
    export let ged
    export let subjectNameKey    // this is a nameKey like 'CollinDouglasBevins1952'

    $: prof = profile(ged, subjectNameKey)
</script>

<!-- <div class="card">
    <div class="card-body"> -->
        <h5 class="card-title mb-0">
            <PersonBrief {ged} bind:subjectNameKey={subjectNameKey}
                briefKey={subjectNameKey} label=''/>
        </h5>
        <hr>
        <div class="accordion" id="fileCard">
            <!-- PARENTAL FAMILIES HERE -->
            {#each prof.parents as parents, i}
            <div class="accordion-item">
                <h2 class="accordion-header" id={"parents-siblings-heading"+i}>
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#parents-siblings-collapse"+i} aria-expanded="true" aria-controls={"parents-siblings-collapse"+i}>
                        Parental Family {i+1} with {parents.childKeys.length} Children
                    </button>
                </h2>
                <div id={"parents-siblings-collapse"+i} class="accordion-collapse collapse show" aria-labelledby={"parents-siblings-heading"+i}>
                    <div class="accordion-body">
                        <div class='details'>
                            <PersonBrief {ged} bind:subjectNameKey={subjectNameKey}
                                briefKey={parents.fatherKey} label='Father:'  />
                        </div>
                        <div class='details'>
                            <PersonBrief {ged} bind:subjectNameKey={subjectNameKey}
                                briefKey={parents.motherKey} label='Mother:'  />
                        </div>
                        <hr>
                        {#each parents.childKeys as childKey, j}
                            <div class='details'>
                                <PersonBrief {ged} bind:subjectNameKey={subjectNameKey}
                                    briefKey={childKey} label={'Child '+(j+1)+'.'} />
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            {/each}

            <!-- SPOUSE FAMILIES HERE -->
            {#each prof.spouses as spouse, i}
                <div class="accordion-item">
                    <h2 class="accordion-header" id={"spouse-heading-"+i}>
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#spouse-collapse-"+i} aria-expanded="false" aria-controls={"spouse-collapse-"+i}>
                            Spousal Family {i+1} with
                            {spouse.childKeys.length} Children
                        </button>
                    </h2>
                    <div id={"spouse-collapse-"+i} class="accordion-collapse collapse" aria-labelledby={"spouse-heading-"+i}>
                        <div class="accordion-body">
                            <div class='details'>
                                <PersonBrief {ged} bind:subjectNameKey={subjectNameKey}
                                    briefKey={spouse.spouseKey} label='Spouse:'  />
                            </div>
                            <hr>
                            {#each spouse.childKeys as childKey, j}
                            <div class='details'>
                                <PersonBrief {ged} bind:subjectNameKey={subjectNameKey}
                                    briefKey={childKey} label={(j+1)+'.'} />
                            </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/each}

            <div class="accordion-item">
                <h2 class="accordion-header" id="notes-heading">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#notes-collapse" aria-expanded="false" aria-controls="notes-collapse">
                        Individual Notes
                    </button>
                </h2>
                <div id="notes-collapse" class="accordion-collapse collapse" aria-labelledby="notes-heading">
                    <div class="accordion-body">
                        <!-- {@html card._indiNotes.join('<br />')} -->
                    </div>
                </div>
            </div>
        </div>
    <!-- </div>
</div> -->
