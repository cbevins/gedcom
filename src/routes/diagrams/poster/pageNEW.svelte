<script>
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    import { Channels } from '$lib/Sylvan/class/Channels.js'
    import { sheetLayout } from './sheetLayout.js'
    import { trainGeom } from './trainGeom.js'
    import Sheet from './Sheet.svelte'
    import { PosterLayout36 } from './PosterLayout36.js'

    // All layout dimensions are INCHES
    const upi = 100         // 100 SVG units per inch
    // const letter85 = 4.25   // Scale down from 36" wide to 8.47"
    // const poster36 = 1      // Scale to 36" wide poster
    let scale = 1

    //--------------------------------------------------------------------
    // Step 1: Determine content and its dimensions
    //--------------------------------------------------------------------

    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: channels = getChannels(subject)
    $: geom = trainGeom(channels, 3500, upi, scale)
    $: console.log(`geom.totalHt=${geom.totalHt} geom.ht=${geom.ht}`)

    function getChannels(subj) {
        const c = new Channels(subj)
        // Move subject to a channel midway between father and mother
        const r = c.rootNode()
        const f = c.father ? c.father.channel : 1
        const m = c.mother ? c.mother.channel : c.channelMaxCount()
        r.channel = Math.trunc((f + m) / 2)
        return c
    }

    //--------------------------------------------------------------------
    // Step 2: Determine printable Sheet dimensions and layout
    //--------------------------------------------------------------------

    // First use the desired layout specification prototype
    $: layout = PosterLayout36()

    // Then calculate the fully hydrated Sheet layout dimensions
    $: sheet = sheetLayout(layout, upi, geom.totalHt, scale, true, true, true)
    $: console.log(`sheet.content.ht=${sheet.content.ht}`)
    // Add required client data to the Sheet
    $: sheet.content.channels = channels
    $: sheet.content.geom = geom
    // $: console.log(sheet)
</script>

<Sheet layout={sheet} />
