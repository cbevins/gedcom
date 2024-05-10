import { flagGxml } from '../PosterSvg/index.js'
import { trainStationGxml } from './trainStationGxml.js'
import { trainTracksGxml } from '../PosterSvg/index.js'
import { gridGxml } from './gridGxml.js'

// NOTE - station x,y are for upper left corner; ADJUST FOR CENTER
function trackPath(geom, year1, chan1, year2, chan2) {
    const x1 = geom.yearX(year1)
    const y1 = geom.chanY(chan1)
    const x2 = geom.yearX(year2)
    const y2 = geom.chanY(chan2)
    const path = `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}`
    return path
}

export function contentGxml(geom) {
    const els = gridGxml(geom)

    // TrainTracks!
    const trackWidth = 20
    const path = trackPath(geom, 1600, 3, 1700, 9)
    els.push(trainTracksGxml(path, trackWidth, 'blue'))

    // TrainStation!
    let scale = 1
    els.push(trainStationGxml(geom, 1600, 3, '#NET', '13th GGP', 'magenta', scale))
    els.push(trainStationGxml(geom, 1700, 9, '#USA', '9th GGP', 'blue', 2))

    // const trackNamesEls = trackNamesGxml(geom)
    // const contentEls = [...trainTracksEls, ...trainStationsEls, ...trackNamesEls]
    return els
}