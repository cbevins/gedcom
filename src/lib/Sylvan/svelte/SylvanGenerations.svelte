<script>
	import { Generations, GenerationsData } from '$lib/Sylvan/class/Generations.js'
    export let subjectNameKey
    export let sylvan

    function generationsTable(subjectKey) {
        const gen = new Generations(sylvan)
        const subject = sylvan.people().find(subjectKey)
        gen.calc(subject)
        // Header rows
        let html = `<h3>${subject.fullName()} Direct Ancestor Generational Summary</h3>`
		html += '<table class="table table-striped"><tbody>'
		html += '<tr><th class="text-center">Gen</th><th class="text-center">Size</th><th class="text-center">Num</th>'
        html += '<th class="text-center">Birth Years</th><th class="text-center">Death Years</th>'
        for(let i=0; i<gen.countries().length; i++) {
            if (gen.totals().get(gen.country(i))) { // if this country has at least 1 person from there...
                html += `<th class="text-center">${gen.country(i).substring(0, 3)}</th>`
            }
        }
        html += '</tr>'
        // Generational rows
        let total = 0
        for(let i=0; i<gen.gens().length; i++) {
            const g = gen.gen(i)
            if (g.count) {
                html += `<tr><td class="text-center">${i}</td><td class="text-center">${GenerationsData[i].count}</td><td class="text-center">${g.count}</td>`
                html += `<td class="text-center">${g.birthMin} - ${g.birthMax}</td><td class="text-center">${g.deathMin} - ${g.deathMax}</td>`
                for(let i=0; i<gen.countries().length; i++) {
                    if (gen.totals().get(gen.country(i))) { // if this country has at least 1 person from there...
                        let n = g.country.get(gen.country(i))
                        total += n
                        html += `<td class="text-center">${n}</td>`
                    }
                }
                html += '</tr>'
            }
        }
        // Totals row
        html += `<tr><td></td><td class="text-center">TOTALS</td><td class="text-center">${total}</td><td></td><td></td>`
        for (const [country, count] of gen.totals().entries()) {
            if (count) { // if this country has at least 1 person from there...
                html += `<td class="text-center">${count}</td>`
            }
        }
        html += '</tr>'
		html += '</tbody></table>'
		return html
    }
</script>

{@html generationsTable(subjectNameKey)} 
