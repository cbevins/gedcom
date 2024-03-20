<script>
	export let sylvan

function html() {
	let html = '<table class="table table-striped"><tbody><tr><th>Record Type</th><th>Count</th>'
	html += `<tr><td>Persons</td><td>${sylvan.people().size()}</td></tr>`
	html += `<tr><td>Families</td><td>${sylvan.families().size()}</td></tr>`
	html += `<tr><td>Places</td><td>${sylvan.places().size()}</td></tr>`
	html += `<tr><td>Locations</td><td>${sylvan.locations().size()}</td></tr>`
	html += '</tbody></table>'
	return html
}
</script>

{@html html()} 
