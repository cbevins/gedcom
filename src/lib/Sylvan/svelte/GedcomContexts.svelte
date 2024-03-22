<script>
	export let sylvan

    function html() {
        const contexts = sylvan.contexts()
        let html = 'SYLVAN<table class="table table-striped"><tbody><tr><th>Record Type</th><th>Count</th>'
        let total = 0
        for(let i=0; i<contexts.length; i++) {
            const [context, count] = contexts[i]
            html += `<tr><td>${context}</td><td>${count}</td></tr>`
            total += count
        }
        html += `<tr><td>TOTAL RECORDS</td><td>${total}</td></tr>`
        html += '</tbody></table>'
        return html
    }
</script>

{@html html()} 
