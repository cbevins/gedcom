<script>
    import Svelecte from 'svelecte'
    // BE SURE TO DEREFERENCE VALUE USING '$subjectNameKey'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'

    export let sylvan

    let selectedOption = null
    let selectedValue = $subjectNameKey
    $: selectedSlot = selectedValue
        ? (selectedValue === 'CollinDouglasBevins1952' ? '💀' : '👍')
        : '👉'

    const shortList = [
        {key: 'CollinDouglasBevins1952', label: 'Bevins, Collin Douglas'},
        {key: 'WilliamCollinsBevins1931', label: 'Bevins, William Collins'},
        {key: 'WilliamLongfordBevins1815', label: 'Bevins, William Longford'},
        {key: 'SamuelBevins1878', label: 'Bevins, Samuel'},
        {key: 'HattieJaneCollins1889', label: 'Collins, Hattie Jane'},
        {key: 'GeorgeWashingtonCollins1870', label: 'Collins, George Washignton'},
        {key: 'MeartiaMargaretHeddens1933', label: 'Heddens, Meartia Margaret'},
        {key: 'RalphVernonHeddens1909', label: 'Heddens, Ralph Vernon'},
        {key: 'HannahHunter1753', label: 'Hunter, Hannah'},
        {key: 'MargaretEvaNattrass1914', label: 'Nattrass, Margaret Eva'},
        {key: 'BarbaraJeanneRiley1953', label: 'Riley, Barbara Jeanne'},
        {key: 'DrewallynBevinsRiley1982', label: 'Riley, Drewallyn Bevins'},
        {key: 'SheldonJuniorRiley1926', label: 'Riley, Sheldon Junior'},
        {key: 'FrancesMarieShofner1871', label: 'Schofner, Frances Marie'},
        {key: 'DorothyMayTrombley1927', label: 'Trombley, Dorothy May'},
    ]

    // PICK A FULL OR SHORT LIST OF PEOPLE
    // $: options = sylvan.people().selectors()
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
