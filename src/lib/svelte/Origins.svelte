<script>
	import { calcNationality } from '$lib/js/nationality.js'
	export let ged
    export let subjectNameKey

	let origins = calcNationality(ged, subjectNameKey)
	$: origins = calcNationality(ged, subjectNameKey)
</script>

<div>
    <table class="table table-bordered table-responsive table-sm">
        <thead><tr><th>Country</th><th>Ancestors</th><th>Rep Fraction</th>
            <th>Omit USA & Uknown</th></tr></thead>
        <tbody>
        {#each origins as origin, i}
            <tr>
                <td>{origin[1]}</td>
                <td>{origin[2]}</td>
                <td>{origin[0].toFixed(4)}</td>
                <td>{origin[3].toFixed(4)}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
