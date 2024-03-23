<script>
	import { origins } from '$lib/Sylvan/js/origins.js'
    export let subjectNameKey
    export let sylvan

    $: subject = sylvan.people().find(subjectNameKey)
	$: rows = mission(subject)

    function mission(subject) {
        // const subject = sylvan.people().find(subjectNameKey)
        const map = origins(subject)
        return Array.from(map).sort((a,b) => { return b[1] - a[1]})
    }
</script>

<div>
    <h4>{subject.label()} Direct Ancestors' Representative Country of Origin</h4>
    <table class="table table-bordered table-responsive table-sm">
        <thead><tr><th>Country</th><th>Rep Fraction</th></thead>
        <tbody>
        {#each rows as row, i}
            <tr>
                <td>{row[0]}</td>
                <td>{row[1].toFixed(4)}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
