<script>
	export let sylvan

    function html() {
        const topLevels = sylvan.topLevelRecords()
        let html = 'SYLVAN <table class="table table-striped"><tbody><tr><th>Record Type</th><th>Count</th>'
        let total = 0
        for(let i=0; i<topLevels.length; i++) {
            const [type, count] = topLevels[i]
            html += `<tr><td>${type}</td><td>${count}</td></tr>`
            total += count
        }
        html += `<tr><td>ALL TOP LEVEL</td><td>${total}</td></tr>`
        html += '</tbody></table>'
        return html
    }
</script>

{@html html()} 
