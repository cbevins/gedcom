<script>
    import PosterSvg from '$lib/PosterSvg/PosterSvg.svelte'
    
    console.log('RUNNING src/routes/diagrams/postersvg')

    $: width = 1000
    $: height = 2000
    $: scale = 4.25
    $: guides = false
</script>
<PosterSvg {width} {height} {scale} {guides}/>