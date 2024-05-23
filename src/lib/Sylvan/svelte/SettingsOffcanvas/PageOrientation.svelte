<script>
    export let id='pageorientation'
    export let settings
    export let title = 'Page Orientation'

    const values = [true, false]
    const labels = ['Portrait', 'Landscape']
</script>

<h5>{title}</h5>
{#each values as value, i}
    <div class="form-check form-check-inline m->">
        <input class="form-check-input" type="radio"
            name="{id}" id="{id}-{i}"
            value={values[i]}
            bind:group={settings.portrait}
            autocomplete="off" />
        <label class="form-check-label" for="{id}-{i}">{labels[i]}</label>
    </div>
{/each}
