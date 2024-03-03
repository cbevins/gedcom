<script>
	import { Notables } from '$lib/data/Notables.js'
	export let ged
    export let tree

    function notablesHtml(ged, tree) {
	let html = ''
	for(let i=0; i<Notables.length; i++) {
		const entry = Notables[i]
		if (entry.tree === tree) {
			let title = ''
			if (entry.keys.length) {
				for(let i=0; i<entry.keys.length; i++) {
					const person = ged.person(entry.keys[i])
					let name = (person) ? person.keys.label : entry.keys[i]
					let br = (i > 0) ? '<br>' : ''
					title += br + name + ' - '
				}
			}
			title += entry.title
			html += `<h6>${title}</h6>`
			for(let i=0; i<entry.pars.length; i++) {
				html += '<p>' + entry.pars[i] + '</p>'
			}
		}
	}
	return html
}
</script>

{@html notablesHtml(ged, tree)} 
