<script>
	import { Ancestors } from '$lib/Gedcom/Ancestors.js'
	export let sylvan
    export let subjectNameKey

	const Generations =[
    'Subject', 'Parent', 'GrandP', '1st GPP', '2nd GPP', '3rd GGP',
    '4th GGP', '5th GGP', '6th GGP', '7th GGP', '8th GGP', '9th GGP',
    '10th GGP', '11th GGP', '12th GGP', '13th GGP', '14th GGP', '15th GGP'
	]

	let immigrants = findImmigrants(subjectNameKey)
    $: immigrants = findImmigrants(subjectNameKey)

	// Returns an array of Ancestor instances whose known birth and death countries are different

	function findImmigrants(subjectKey) {
        const subject = sylvan.people().find(subjectKey)
        const ancestors = new Ancestors(subject)
		const immigrants = []
        if (ancestors.size() > 1) {
            for (const [person, ancestor] of ancestors.map().entries()) {
                if (person.isImmigrant()) immigrants.push(ancestor)
			}
		}
		return immigrants
	}

	function immigrantsTable(subjectKey) {
		immigrants.sort(function(a, b) {return a.person().birthYear() - b.person().birthYear()})
        const subject = sylvan.people().find(subjectKey)
		let html = `<h3>SYLVAN ${subject.fullName()} has ${immigrants.length} apparent immigrant ancestors:</h3>`
		html += '<table class="table table-striped"><tbody>'
		html += '<tr><th class="text-center">Gen</th><th>Name</th><th class="text-center">Lived</th><th>Born</th><th>Died</th></tr>'
		for(let i=0; i<immigrants.length; i++) {
            const ancestor = immigrants[i]
			const person = ancestor.person()
			html += `<tr><td>${Generations[ancestor.gen()]}</td>`
			html += `<td>${person.nameFull()}</td>`
			html += `<td>${person.birthYear()} - ${person.deathYear()}</td>`
			html += `<td>${person.birthState()}, ${person.birthCountry().toUpperCase()}</td>`
			html += `<td>${person.deathState()}, ${person.deathCountry().toUpperCase()}</td></tr>`
		}
		html += '</tbody></table>'
		return html
	}
</script>

{@html immigrantsTable(subjectNameKey)} 
