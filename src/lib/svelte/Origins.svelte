<script>
	import { calcNationality } from '$lib/js/nationality.js'
	export let ged
    export let subjectNameKey

	let origins = calcNationality(ged, subjectNameKey)
	$: origins = calcNationality(ged, subjectNameKey)
    function immigrants(i) {
        // Get total fraction from just the USA and unknwon
        let f = 0
        const skip = ['USA', 'Unknown']
        for (let i=0; i<origins.length; i++) {
            const [fraction, country, count] = origins[i]
            if (skip.includes(country)) f += fraction
        }
        if (f===0) f=1
        // Adjust for removing USA and unknwon
        const [fract, country, count] = origins[i]
        if (skip.includes(country)) return 0
        if (country === 'TOTAL') return 1
        return fract / f
    }
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
                <td>{immigrants(i).toFixed(4)}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
