<script>
	import { Ancestors } from '$lib/js/Ancestors.js'
	export let ged
    export let subjectNameKey
	const anc = new Ancestors(ged)
	
	const Ancestor =[
		'Subject', 'Parent', 'GrandP', '1st GPP', '2nd GPP', '3rd GGP',
		'4th GGP', '5th GGP', '6th GGP', '7th GGP', '8th GGP', '9th GGP',
		'10th GGP', '11th GGP', '12th GGP', '13th GGP', '14th GGP', '15th GGP'
	]

	let immigrants = ancestors(subjectNameKey)
	// Returns an array of Ancestor objects {level: <int>, id: <int>, person: {person}, mother: {person}, father: {person}}
	// whose known birth and death countries are different
    $: immigrants = ancestors(subjectNameKey)
	function ancestors(subKey) {
		const immigrants = []
		const ancMap = anc.ancestors(subKey)
        if (ancMap.size === 1) {
            return immigrants
        }
		let last = -1
		for (const [nameKey, data] of anc._ancMap.entries()) {
			const gen = data.level
			if (gen > last) {
				last = gen
			} else if (gen === last) {
			} else if (gen < last) {
				while(gen < last) {
					last--
				}
			}
			if (!data.person.life.isLiving
				&& data.person.birth.place.country !== 'unknown country'
				&& data.person.death.place.country !== 'unknown country'
				&& data.person.birth.place.country !== data.person.death.place.country) {
				immigrants.push(data)
			}
		}
		return immigrants
	}

	function immigrantsHtml(subKey) {
		immigrants.sort(function(a, b) {return a.person.birth.date.year - b.person.birth.date.year})
		let person = ged.person(subKey)
		let html = '<ul>'+ person.name.full + ' has ' + (immigrants.length) + ' documented immigrant ancestors:'
		for(let i=0; i<immigrants.length; i++) {
			person = immigrants[i].person
			html += `<li>${person.keys.label} ${person.birth.place.country} ${person.death.place.country}</li>`
		}
		return html+'</ul>'
	}

	function immigrantsTable(subKey) {
		immigrants.sort(function(a, b) {return a.person.birth.date.year - b.person.birth.date.year})
		let person = ged.person(subKey)
		let html = `<h3>${person.name.full} has ${immigrants.length} documented immigrant ancestors:</h3>`
		html += '<table class="stripped"><tbody>'
		html += '<tr><th>Name</th><th>Gen</th><th>Lived</th><th>Born</th><th>Died</th></tr>'
		for(let i=0; i<immigrants.length; i++) {
			let anc = immigrants[i]
			person = anc.person
			html += `<tr><td>${person.name.full}</td><td>${anc.level}`
			html += `<td>${person.birth.date.year} - ${person.death.date.year}</td>`
			html += `<td>${person.birth.place.country}</td>`
			html += `<td>${person.death.place.country}</td></tr>`
		}
		html += '</tbody></table>'
		return html
	}
</script>

{@html immigrantsTable(subjectNameKey)} 
