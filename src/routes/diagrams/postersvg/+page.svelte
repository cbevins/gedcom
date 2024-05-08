<script>
    import PosterSvg from '$lib/PosterSvg/PosterSvg.svelte'
    $: width = 1000
    $: height = 2000
    $: scale = 4.25
    $: guides = false
</script>
<PosterSvg {width} {height} {scale} {guides}/>