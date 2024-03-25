<script>
    import Svelecte from 'svelecte'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    export let sylvan

    let selectedOption = null
    let selectedValue = $subjectNameKey
    $: selectedSlot = selectedValue
        ? (selectedValue === 'CollinDouglasBevins1952' ? '💀' : '👍')
        : '👉'

    const shortList = [
        {key: 'CollinDouglasBevins1952', label: 'Collin'},
        {key: 'BarbaraJeanneRiley1953', label: 'Barbie'},
        {key: 'DrewallynBevinsRiley1982', label: 'Drewallyn'},
        {key: 'WilliamLongfordBevins1815', label: 'William Longford Bevins'},
        {key: 'HannahHunter1753', label: 'Hannah Hunter'}
    ]
    // $: options = getPersonSelectors()
    $: options = shortList
    function changed(ev) {
        if (selectedValue && sylvan.people().find(selectedValue)) {
            // console.log(`subjectNameKey UPDATED to '${selectedValue}'`)
            subjectNameKey.update(() => selectedValue)
        } else {
            // console.log(`subjectNameKey NOT FOUND for '${selectedValue}'`, sylvan.people().find(selectedValue))
        }
    }
</script>

<Svelecte options={options}
    on:change={changed}
    inputId="sylvanPersonSelector"
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
