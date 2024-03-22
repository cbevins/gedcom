<script>
	export let sylvan

    function duplicatePersons() {
        const dups = sylvan.duplicatePersons()
        let html = `<p>There are ${dups.length} Persons with duplicate name keys:<ol>`
        for (let i=0; i<dups.length; i++) {
            const [type, text] = dups[i]
            html += `<li>${text}</li>`
        }
        html += '</ol></p>'
        return html
    }

    function oneParent(isMother) {
        const persons = isMother ? sylvan.multipleMothers() : sylvan.multipleFathers()
        const word = isMother ? 'mothers' : 'fathers'
        let html = `<p>There are ${persons.length} Persons with multiple ${word}:<ol>`
        for (let i=0; i<persons.length; i++) {
            const person = persons[i]
            html += `<li>${person.label()} has ${person.fathers().length} ${word}:<ol>`
            const parents = isMother ? person.mothers() : person.fathers()
            for (let j=0; j<parents.length; j++) {
                const parent = isMother ? person.mothers(j) : person.father(j)
                html += `<li>${parent.label()} [${parent.gedKey()}]</li>`
            }
            html += '</ol>'
        }
        html += '</ol></p>'
        return html
    }
</script>

<div class="card">
    <div class="card-body">
        {@html duplicatePersons()} 
    </div>
</div>

<div class="card">
    <div class="card-body">
        {@html oneParent(true)} 
    </div>
</div>

<div class="card">
    <div class="card-body">
        {@html oneParent(false)} 
    </div>
</div>
