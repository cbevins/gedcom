<script>
	import { Notables } from '$lib/data/Notables.js'
	export let sylvan
	export let tree

    function notablesHtml(sylvan, tree) {
	let html = ''
	for(let i=0; i<Notables.length; i++) {
		const entry = Notables[i]
		if (entry.tree === tree) {
			let title = ''
			if (entry.keys.length) {
				for(let i=0; i<entry.keys.length; i++) {
					const person = sylvan.people().find(entry.keys[i])
					let name = (person) ? person.label() : entry.keys[i]
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

{@html notablesHtml(sylvan, tree)} 
