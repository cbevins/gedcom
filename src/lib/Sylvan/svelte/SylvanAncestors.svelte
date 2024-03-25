<script>
	import { Ancestors } from '$lib/Sylvan/class/Ancestors.js'
    export let subjectNameKey
	export let sylvan
	
	const Ancestor =[
		'Subject', 'Parent', 'GrandP', '1st GPP', '2nd GPP', '3rd GGP',
		'4th GGP', '5th GGP', '6th GGP', '7th GGP', '8th GGP', '9th GGP',
		'10th GGP', '11th GGP', '12th GGP', '13th GGP', '14th GGP', '15th GGP'
	]

	function ancestorHtml(subjectKey) {
        const subject = sylvan.people().find(subjectKey)
        const ancestors = new Ancestors(subject)
        if (ancestors.size() === 1) {
            return `<p>No documented ancestors for ${subject.fullName()}</p>`
        }
		let last = -1
		let html = `<ul>SYLVAN3: ${subject.fullName()} has ${ancestors.size()-1} documented ancestors:`
		for (const [person, ancestor] of ancestors.map().entries()) {
            const gen = ancestor.gen()
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
			const origin = person.isImmigrant() ? `[${person.birthPlace().country().toUpperCase()}]` : ''
			html += `<li>${Ancestor[gen]} : ${person.label()} <span style="color: blue;">${origin}</span></li>`
		}
		return html+'</ul>'
	}
</script>

{@html ancestorHtml(subjectNameKey)}
