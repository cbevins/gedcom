<script>
    import Svelecte from 'svelecte'
    const options = [
        {key: 'key1', label: 'Label 1'},
        {key: 'key2', label: 'Label 2'},
        {key: 'key1', label: 'Label 3'},
    ]
    let selectedOption = null
    let selectedValue = null
    $: selectedSlot = selectedValue
        ? (selectedValue === 'key2' ? '💀' : '👍')
        : '👉'
</script>
<h3>People Explorer</h3>

<Svelecte {options}
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
<div>Current <code>option</code>: <b>{JSON.stringify(selectedOption) }</b></div>
<div>Current <code>value</code>: <b>{selectedValue}</b></div>
