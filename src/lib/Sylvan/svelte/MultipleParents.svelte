<script>
	export let sylvan

    function html() {
        let html = oneParent(true)
        html += oneParent(false)
        return html
    }

    function oneParent(isMother) {
        const persons = isMother ? sylvan.multipleMothers() : sylvan.multipleFathers()
        const word = isMother ? 'mothers' : 'fathers'
        let html = `SYLVAN: There are ${persons.length} Persons with multiple ${word}:<ol>`
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
        html += '</ol>'
        return html
    }
</script>

{@html html()} 
