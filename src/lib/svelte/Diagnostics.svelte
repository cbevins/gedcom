<script>
	import { checkAncestors } from '$lib/js/checkPerson.js'
	export let ged
    export let subjectNameKey
    export let prefix

function diagnosticsHtml(ged, key, prefix) {
	let person = ged.person(key)
    const ar = checkAncestors(ged, key, prefix)
    let nP = 0
    let nM = 0
	let html = '<table class="table table-striped"><tbody><tr><th>Id</th><th>Name</th><th>Error</th>'
    for (let i=0; i<ar.length; i++) {
		if (ar[i].msg.length) {
            nP++
            nM++
			html += `<tr><td>${ar[i].id}</td><td>${ar[i].person.keys.label}</td><td>${ar[i].msg[0]}`
            for(let j=1; j<ar[i].msg.length; j++) {
                html += `<br>${ar[i].msg[j]}`
                nM++
			}
			html += '</td></tr>'
		}
    }
	html += '</tbody></table>'
	return `<h3>${nM} Diagnostic messages for ${nP} Direct Ancestors of ${person.name.full}</h3>` + html
}
</script>

{@html diagnosticsHtml(ged, subjectNameKey, prefix)} 
