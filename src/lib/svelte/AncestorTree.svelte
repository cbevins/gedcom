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

	// let immigrants = []
	function ancestorHtml(subKey) {
		// immigrants = []
		const ancMap = anc.ancestors(subKey)
		let person = ged.person(anc.subjectKey())
        if (ancMap.size === 1) {
            return `<p>No documented ancestors for ${person.name.full}</p>`
        }
		let last = -1
		let html = '<ul>'+ person.name.full + ' has ' + (ancMap.size-1) + ' documented ancestors:'
		for (const [nameKey, data] of anc._ancMap.entries()) {
			const gen = data.gen
			if (gen > last) {
				html += '<ul>'
				last = gen
			} else if (gen === last) {
			} else if (gen < last) {
				while(gen < last) {
					last--
					html += '</ul>'
				}
			}
			let name = data.person.keys.label
			if (! name || name==='unknown') name = nameKey
			// immigrant?
			let origin = ''
			if (!data.person.life.isLiving
				&& data.person.birth.place.country
				&& data.person.death.place.country
				&& data.person.birth.place.country !== data.person.death.place.country) {
				origin = ` [${data.person.birth.place.country.toUpperCase()}]`
				// immigrants.push(data.person)
			}
			html += '<li>'+ Ancestor[gen] + ': ' + name + origin + '</li>'
		}
		return html+'</ul>'
	}
</script>

{@html ancestorHtml(subjectNameKey)} 
