<script>
	import { Ancestors } from '$lib/Sylvan/class/Ancestors.js'
    export let prefix
    export let subjectNameKey
	export let sylvan

function diagnosticsHtml(sylvan, subjectKey, prefix) {
    const subject = sylvan.people().find(subjectKey)
    const ancestors = new Ancestors(subject)
    const rows = []
    let nMessages = 0
    for (const [person, ancestor] of ancestors.map().entries()) {
        const msgs = person.review()
        const id = '(#' + prefix + ancestor.id() + ')'
        if (! person.nameSuffix() || person.nameSuffix() === '') msgs.push(['Ancestor Id Missing', `Add ${id}`])
        else if (! person.nameSuffix().includes(id)) msgs.push(['Ancestor Id Wrong', `Change from '${person.nameSuffix()}' to '${id}'`])
		if (msgs.length) rows.push([ancestor.id(), person, msgs])
        nMessages += msgs.length
    }
    rows.sort((a, b) => { return (a[0] - b[0]) })
    let html = '<table class="table table-striped"><tbody><tr><th>Id</th><th>Name</th><th>Message</th>'
    for(let i=0; i<rows.length; i++) {
        const [id, person, msgs] = rows[i]
		html += `<tr><td>${id}</td><td>${person.label()}</td><td>${msgs[0][0]}: ${msgs[0][1]}`
        for(let j=1; j<msgs.length; j++) {
            html += `<br>${msgs[j][0]}: ${msgs[j][1]}`
		}
		html += '</td></tr>'
    }
	html += '</tbody></table>'
	return `<h3>${nMessages} Diagnostic messages for ${rows.length} of ${ancestors.size()} Direct Ancestors of ${subject.label()}</h3>` + html
}
</script>

{@html diagnosticsHtml(sylvan, subjectNameKey, prefix)} 
