<script>
    import { Ancestors } from '$lib/Sylvan/class/Ancestors.js'
    import { Demographics } from '$lib/Sylvan/class/Demographics.js'
    export let subjectNameKey
	export let sylvan

    // 'dem' is an instance of Demographics class
    $: dem = new Demographics(sylvan)
    $: propIdx = 0
    $: subject = sylvan.people().find(subjectNameKey)

    function mission(subjectKey, propId) {
        const ancestors = new Ancestors(subject)
        dem.collectData(ancestors.persons())
        return htmlTable(dem, propId)
    }

    const Prop = ['Age at Death', 'Number of Spouses', 'Number of Children']

    function tableRow(row, field, propId, col1, col2, color='') {
        let html = `<tr class="${color}"><td>${col1}</td><td>${col2}</td>`
        let idx = row * dem.cols().length
        for(let col=0; col<dem.cols().length; col++) {
            const prop = dem.stat(idx).props[propId]
            html += `<td align="right">${prop[field].toFixed(2)}</td>`
            idx++
        }
        html += '</tr>'
        return html
    }

    // Demonstrates how to display the Demographic table
    // 0=age, 1=spouses, 2=children
    function htmlTable(dem, propId) {
        let html = '<table class="table table-bordered table-responsive table-sm">'
        html += '<thead><tr><th>Gender</th><th>Stat</th>'
        for(let col=0; col<dem.cols().length; col++) {
            html += `<th>${dem.col(col)}</th>`
        }
        html += '</tr></thead><tbody>'
        for(let row=0; row<dem.rows().length; row++) {
            html += tableRow(row, 'mean', propId, dem.row(row), 'Mean', 'table-success')
            html += tableRow(row, 'max', propId, '', 'Maximum')
            html += tableRow(row, 'n', propId, '', 'Ancestors')
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
        <h3>SYLVAN {Prop[propIdx]} of Direct Ancestors of {subject.fullName()} </h3>
    </div>
    <div class="col-sm-4">
        <div class="dropdown dropstart">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                Change Demographic
            </button>
            <ul class="dropdown-menu">
                <li><button class="dropdown-item" on:click={age}>Age at Death</button>
                <li><button class="dropdown-item" on:click={children}>Number of Children</button>
                <li><button class="dropdown-item" on:click={spouses}>Number of Spouses</button>
            </ul>
        </div>
    </div>
</div>
{@html mission(subjectNameKey, propIdx)}
