<script>
    export let id='generationgrid'
    export let settings
    export let title = 'Generation Grid'

    const values = [false, true]
    const labels = ['Hide', 'Show']
</script>

<h5>{title}</h5>
{#each values as value, i}
    <div class="form-check form-check-inline m->">
        <input class="form-check-input" type="radio"
            name="{id}" id="{id}-{i}"
            value={values[i]}
            bind:group={settings.grid}
            autocomplete="off" />
        <label class="form-check-label" for="{id}-{i}">{labels[i]}</label>
    </div>
{/each}
