<script>
	import QuoteBox from '$lib/svelte/QuoteBox.svelte'
	import Surname from '$lib/svelte/Surname.svelte'
	import Title1 from '$lib/svelte/Title1.svelte'
	let dafn = 'Dictionary of American Family Names [2nd edition, 2022]'
</script>

<div>
	<Title1 title='Bevins-Heddens Surname Origin and Meaning' />
	<p>
		I initially started down the genealogical road
		because I wanted to discover the origin of the
		<Surname name='Bevins' /> surname.
		</p>
	<p>
		We had been told as children that our surname was English.
		But most of the sources I originally found said
		it is a Welsh patronymic surname from 
		<Surname name='ab-Evan' /> or
		<Surname name='ap-Evan' /> ("son of Evan"),
		and thence contracted to <Surname name='Bevan' />.
	</p>
	<p>
		Eventually, I found the <em>{dafn}</em>, which categorically states:
	</p>
	<QuoteBox text='
		Bevins Name Meaning:
		English (Leicestershire of Norman origin): variant of Bevins
		with post-medieval excresent -s.
		There has been some confusion with Welsh Bevan and Bevans.'
		source = {dafn} />
	<p>
		The same source says the following of the surname <Surname name='Bevin' />:
	</p>
	<QuoteBox text='
		Bevin Name Meaning:
		English (of Norman origin): nickname from Old French
		"bei vin" or "boi vin" for "drink wine".'
		source = {dafn} />
	<p>
		So don't be confused, as I was, about how we were Welsh.
		Indeed, if you explore the <a href="/bevins-heddens/pedigree">
		the <Surname name='Bevins' /> family predigree</a>,
		you will see that it goes back to Leicestershire, England for many generations,
		and <em>not</em> to Wales.
	</p>
</div>
