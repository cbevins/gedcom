<script>
	import { Notables } from '$lib/data/Notables.js'
	export let ged
    export let tree

    function notablesHtml(ged, tree) {
	let html = ''
	for(let i=0; i<Notables.length; i++) {
		const entry = Notables[i]
		if (entry.tree === tree) {
			let title = 'Untitled'
			if (entry.key) {
				const person = ged.person(entry.key)
				title = person.keys.label
			} else if (entry.title) {
				title = entry.title
			}
			html += `<h6>${title}</h6>`
			for(let i=0; i<entry.lines.length; i++) {
				html += '&nbsp' + entry.lines[i]
			}
			html += '</p>'
		}
	}
	return html
}
</script>

{@html notablesHtml(ged, tree)} 
