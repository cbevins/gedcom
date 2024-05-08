<script>
    import PosterSvg from '$lib/PosterSvg/PosterSvg.svelte'
    $: width = 1000
    $: height = 2000
    $: scale = 4.25
    $: guides = true
</script>
<PosterSvg {width} {height} {scale} {guides}/>