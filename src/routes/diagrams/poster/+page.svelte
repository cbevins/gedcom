<script>
    import { getSylvan } from '$lib/Sylvan/js/singletons.js'
    import { subjectNameKey } from '$lib/Sylvan/js/store.js'
    import { Channels } from '$lib/Sylvan/class/Channels.js'
    import { posterLayout } from './posterLayout.js'
    import { trainGeom } from './trainGeom.js'
    import Sheet from './Sheet.svelte'
    
    // BE SURE TO DE-REFERENCE THE subjectNameKey STORE VALUE USING '$subjectNameKey'
    $: subject = getSylvan().people().find($subjectNameKey)
    $: channels = new Channels(subject)

    // All layout dimensions are INCHES
    let scale = 4.25 // Scale down from 36" wide to 8.47"
    scale = 1
    
    const upi = 100
    $: geom = trainGeom(channels, 3500, upi, scale)
    // $: console.log(geom)   
    
    // Poster is 36" wide with variable height
    $: layout = {    
        upi: upi,
        scale: scale,
        fontSize: 12 / scale,       // 'standard' font size
        sheet: {
            wd: 36 / scale,         // large format paper width is 36"
            pad: {
                t: 0.25/scale,
                b: 0.25/scale,
                l: 0.25/scale,
                r: 0.25/scale
            }
        },
        border: {
            thickness: 0.25 / scale,
            dashArray: "50 50",
        },
        header: {
            ht: 1 / scale,
        },
        footer: {
            ht: 0.5 / scale,
        },
        left: {
            wd: 0 / scale,
        },
        right: {
            wd: 0 / scale,
        },
        content: {
            geom: geom,
            ht: geom.height / upi / scale,
        },
        guides: {
            borders: true,
            labels: true,
            lines: true,
        }
    }
    $: sheet = posterLayout(layout)
    $: sheet.content.channels = channels
    $: sheet.content.geom = geom
    // $: console.log(sheet)
</script>

<Sheet layout={sheet} />
