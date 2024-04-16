<script>
	import Surname from '$lib/Sylvan/svelte/Surname.svelte'
	import Title1 from '$lib/Sylvan/svelte/Title1.svelte'
</script>
<div>
	<Title1 title='Methodology' />
	<div class="card">
		<h3 class="card-header">Ancestral Information Requirements</h3>
		<div class="card-body">
			<table class='table table-stripped table-bordered'>
				<tbody>
					<tr><th>Information</th><th>Importance</th></tr>
					<tr><td>Parentage</td><td>Highest</td></tr>
					<tr><td>Names</td><td>High</td></tr>
					<tr><td>Spouses</td><td>High</td></tr>
					<tr><td>Birth Year</td><td>High</td></tr>
					<tr><td>Birth Place</td><td>High</td></tr>
					<tr><td>Death Year</td><td>High</td></tr>
					<tr><td>Death Place</td><td>High</td></tr>
					<tr><td>Union Date</td><td>Moderate</td></tr>
					<tr><td>Union Place</td><td>Moderate</td></tr>
					<tr><td>Siblings</td><td>Moderate</td></tr>
					<tr><td>Birth Month, Day</td><td>Low</td></tr>
					<tr><td>Death Month, Day</td><td>Low</td></tr>
					<tr><td>Union Month, Day</td><td>Low</td></tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="card">
		<h3 class="card-header">Parental Lineage Confidence Levels</h3>
		<div class="card-body">
			<table class='table table-stripped table-bordered'>
				<tbody>
					<tr><th>Level of Certainty</th><th>Synonyms</th><th>Mathematical Certainty</th></tr>
					<tr><td>Certain</td><td>Documented, verified</td><td>95 - 100%</td></tr>
					<tr><td>Probable</td><td>Likely</td><td>80 - 95%</td></tr>
					<tr><td>Possible</td><td>Not disproven</td><td>40 - 80%</td></tr>
					<tr><td>Unlikely</td><td></td><td>20 - 40%</td></tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="card">
		<h3 class="card-header">Default Values for Missing Birth, Union and Death dates and Places</h3>
		<div class="card-body">
			<table class='table table-stripped table-bordered'>
				<tbody>
					<tr><th>Unknown/Missing</th><th>Defaults to:</th></tr>
					<tr><td>Birth Year</td><td>(1) 20 years before birth of first offspring or (2) 20 years before year of spousal union.</td></tr>
					<tr><td>Birth Place</td><td>(1) union place of parents, (2) birth place of closest aged siblings, (3) birth or death place of parents.</td></tr>
					<tr><td>Marriage Year</td><td>(1) 1 year before birth of first offspring.</td></tr>
					<tr><td>Death Year</td><td>(1) 1 year after any last known event, (2) 1 year after birth of last offspring.</td></tr>
					<tr><td>Death Place</td><td>(1) place of last known residence, (2) birth place of last offspring, (3) death place of spouse.</td></tr>
				</tbody>
			</table>
		</div>
	</div>


	<div class="card">
		<h3 class="card-header">Tags</h3>
		<div class="card-body">
			<p>Anything especially notable about a person can be documented in a tag.
				Tags are embedded in the main Notes section, enclosed by square brackets,
				contain a tag phrase and a description separated by a colon.</p>
			<ul class="list-group">
				<li class="list-group-item">[ARW: American Revolutionary War soldier]</li>	
				<li class="list-group-item">[Civil War: Union or Confederate soldier]</li>	
				<li class="list-group-item">[DAR: Daughters of the American Revolution]</li>	
				<li class="list-group-item">[French and Indian Wars: ]</li>	
				<li class="list-group-item">[Immigrant: ]</li>	
				<li class="list-group-item">[Indentured Servant: ]</li>	
				<li class="list-group-item">[Names: Mary Bott, Bolt]</li>	
				<li class="list-group-item">[Occupations: cooper, tanner, farmer]</li>	
				<li class="list-group-item">[Parentage: Certain, Probable, Possible, or Unlikely]</li>	
				<li class="list-group-item">[SAR: Sons of the American Revolution]</li>	
				<li class="list-group-item">[Slave Owner: ]</li>	
				<li class="list-group-item">[War of 1812: ]</li>	
			</ul>
		</div>
	</div>
</div>
