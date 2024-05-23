<script>
    export let id='posterorimage'
    export let settings
    export let title = 'Poster or Image'

    const values = [true, false]
    const labels = ['Image in Poster', 'Image Only']
</script>

<h5>{title}</h5>
{#each values as value, i}
    <div class="form-check form-check-inline m->">
        <input class="form-check-input" type="radio"
            name="{id}" id="{id}-{i}"
            value={values[i]}
            bind:group={settings.poster}
            autocomplete="off" />
        <label class="form-check-label" for="{id}-{i}">{labels[i]}</label>
    </div>
{/each}
