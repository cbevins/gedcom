<script>
    import { demographics } from '$lib/js/demographics.js'
	export let ged
    export let subjectNameKey

    // 'dem' is an instance of Demographics class
    $: dem = demographics(ged, subjectNameKey)
    $: propIdx = 0

    const Prop = ['Age at Death', 'Number of Spouses', 'Number of Children']
    function tableRow(row, field, col1, col2, color='') {
        let html = `<tr class="${color}"><td>${col1}</td><td>${col2}</td>`
        let idx = row * dem._cols.length
        for(let col=0; col<dem._cols.length; col++) {
            const prop = dem._data[idx].props[propIdx]
            html += `<td align="right">${prop[field]}</td>`
            idx++
        }
        html += '</tr>'
        return html
    }

    // Demonstrates how to display the Demographic table
    // 0=age, 1=spouses, 2=children
    function demographicsHtml(nameKey, propId) {
        let html = '<table class="table table-bordered table-responsive table-sm">'
        html += '<thead><tr><th>Gender</th><th>Stat</th>'
        for(let col=0; col<dem._cols.length; col++) {
            html += `<th>${dem._cols[col]}</th>`
        }
        html += '</tr></thead><tbody>'
        for(let row=0; row<dem._rows.length; row++) {
            html += tableRow(row, 'mean', dem._rows[row], 'Mean', 'table-success')
            html += tableRow(row, 'max', '', 'Maximum')
            html += tableRow(row, 'n', '', 'Ancestors')
        }
        html += '</tbody></table>'
        return html
    }
    function age() {propIdx = 0}
    function spouses() {propIdx = 1}
    function children() {propIdx = 2}
</script>

<div class="row">
    <div class="col-sm-8">
        <h3>{Prop[propIdx]} of Direct Ancestors of {subjectNameKey} </h3>
    </div>
    <div class="col-sm-4">
        <div class="dropdown dropstart">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                Change Demographic
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" on:click={age}>Age at Death</a></li>
                <li><a class="dropdown-item" on:click={children}>Number of Children</a></li>
                <li><a class="dropdown-item" on:click={spouses}>Number of Spouses</a></li>
            </ul>
        </div>
    </div>
</div>
{@html demographicsHtml(subjectNameKey, propIdx)}
