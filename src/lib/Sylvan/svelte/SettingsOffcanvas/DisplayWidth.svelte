<script>
    export let id='displaywidth'
    export let settings
    export let title = "Display Width"

    const values = [4.25, 1.8, 1, 0.75]
    const labels = [8.5,20, 36, 48]
</script>

<h5>{title}</h5>
{#each values as value, i}
    <div class="form-check form-check-inline m->">
        <input class="form-check-input" type="radio"
            name="{id}" id="{id}-{i}"
            value={values[i]}
            bind:group={settings.scale}
            autocomplete="off" />
        <label class="form-check-label" for="{id}-{i}">{labels[i]}"</label>
    </div>
{/each}
