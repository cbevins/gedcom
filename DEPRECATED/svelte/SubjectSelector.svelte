<script>
    import Svelecte from 'svelecte'
    import { ged, subjectNameKey } from '$lib/js/store.js'

    let selectedOption = null
    let selectedValue = $subjectNameKey
    $: selectedSlot = selectedValue
        ? (selectedValue === 'CollinDouglasBevins1952' ? '💀' : '👍')
        : '👉'
    function changed(ev) {
        if (selectedValue && $ged.person(selectedValue)) {
            // console.log(`subjectNameKey UPDATED to '${selectedValue}'`)
            subjectNameKey.update(() => selectedValue)
        } else {
            // console.log(`subjectNameKey NOT FOUND for '${selectedValue}'`, $ged.person(selectedValue))
        }
    }
</script>

<Svelecte options={$ged.personKeyLabels()}
    on:change={changed}
    inputId="person"
    valueField="key"
    labelField="label"
    clearable
    bind:readSelection={selectedOption}
    bind:value={selectedValue}
    placeholder="Select a person">
    <b slot="icon">{selectedSlot}</b>
    <svelte:fragment slot="clear-icon" let:selectedOptions let:inputValue>{selectedOptions.length ? '❌' : inputValue ? '👀' : '❓' }</svelte:fragment>
    <svelte:fragment slot="indicator-icon" let:hasDropdownOpened>{hasDropdownOpened?'😃':'😄'}</svelte:fragment>
</Svelecte>
<!-- <div>Current <code>option</code>: <b>{JSON.stringify(selectedOption) }</b></div>
<div>Current <code>value</code>: <b>{selectedValue}</b></div>
<div>Current <code>subject</code>: <b>{$subjectNameKey}</b></div> -->
