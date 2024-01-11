// Attempts to parse a GEDCOM PLAC field into standard key and parts
const Recode = new Map([
    ['united states', 'USA'],
    ['united states of america', 'USA'],
    ['ia', 'Iowa'],
    ['in', 'Indiana'],
    ['ky', 'Kentucky'],
    ['ma', 'Massachusetts'],
    ['md', 'Maryland'],
    ['mn', 'Minnesota'],
    ['ne', 'Nebraska'],
    ['nj', 'New Jersey'],
    ['md', 'Maryland'],
    ['pa', 'Pensylvannia'],
    ['wi', 'Wisconsin'],
    ['va', 'Virginia'],
    ['united states buried on 12 sep 1792', 'USA' ]
])

export const Country = new Map([
    ['allemagne', 'Allemagne'],
    ['bavaria', 'Bavaria, Germany'],
    ['colonial america', 'USA'],
    ['england', 'England'],
    ['canada', 'Canada'],
    ['france', 'France'],
    ['germany', 'Germany'],
    ['holland', 'Holland'],
    ['ireland', 'Ireland'],
    ['netherlands', 'Netherlands'],
    ['norvège', 'Norway'],
    ['norway', 'Norway'],
    ['scotland', 'Scotland'],
    ['sweden', 'Sweden'],
    ['united kingdom', 'United Kingdom'],
    ['unknown', 'Unknown'],
    ['?', 'Unknown'],
    ['usa', 'USA'],
    ['usa,', 'USA'],
])

export const StateCountry = new Map([
    ['az usa', 'Arizona, USA'],
    ['ch', 'USA'],
    ['conn', 'Connecticut, USA'],
    ['cork', 'Cork, Ireland'],
    ['coss county ind', 'Coss County, Indiana, USA'],
    ['ct.', 'Connecticut, USA'],
    ['floyd', 'Floyd, Kentucky, USA'],
    ['floyd co ky', 'Floyd, Kentucky, USA'],
    ['grand rapids mn', 'Grand Rapids, Itasca, Minnesota, USA'],
    ['illinois', 'Illinois, USA'],
    ['indiana', 'Indiana, USA'],
    ['iowa', 'Iowa, USA'],
    ['jasper county (us/ia)', 'Jasper County, Iowa, USA'],
    ['kansas', 'Kansas, USA'],
    ['kentucky', 'Kentucky, USA'],
    ['leicester, ', 'Leicester, Leicestershire, England'],
    ['leichester england', 'Leicester, Leicestershire, England'],
    ['leicestershire', 'Leicestershire, England'],
    ['marion county (us/ia)', 'Marion County, Iowa, USA'],
    ['massachusetts', 'Massachusetts, USA'],
    ['mass.', 'Massachusetts, USA'],
    ['maryland', 'Maryland, USA'],
    ['minnesota', 'Minnesota, USA'],
    ['minnesota usa', 'Minnesota, USA'],
    ['moline', 'Moline, Rock Island County, Illinois, USA'],
    ['nebraska', 'Nebraska, USA'],
    ['newcastle', 'Newcastle, England'],
    ['new york', 'New York, USA'],
    ['new jersey', 'New Jersey, USA'],
    ['newton jasper county iowa', 'Newton, Jasper County, Iowa, USA'],
    ['nj', 'New Jersey, USA'],
    ['north carolina', 'North Carolina, USA'],
    ['north dakota', 'North Dakota, USA'],
    ['northumberland', 'Northumberland, England'],
    ['n.d.', 'North Dakota, USA'],
    ['of md', 'Maryland, USA'],
    ['ohio', 'Ohio, USA'],
    ['ohio city', 'Ohio City, Ohio, USA'],
    ['pays-bas', 'Pays-Bas, Netherlands'],
    ['pennsylvania', 'Pennsylvania, USA'],
    ['pensylvannia', 'Pennsylvania, USA'],
    ['plymouth', 'Plymouth, Devon, England'],
    ['rhode island', 'Rhode Island, USA'],
    ['rock island', 'Rock Island, Rock Island County, Illinois, USA'],
    ['springfield', 'Springfield, Illinois, USA'],
    ['stanhope. co.durham', 'Stanhope, Durham, England'],
    ['va', 'Virginia, USA'],
    ['virginia', 'Virginia, USA'],
    ['wayne,west virginia', 'Wayne, West Virginia, USA'],
    ['wayne co. w.v.', 'Wayne, West Virginia, USA'],
    ['weardale england', 'Weardale, Durham, England'],
    ['west virginia', 'West Virginia, USA'],
    ['westmaas', 'Westmaas, Binnenmaas Municipality, Zuid-Holland, Netherlands'],
    ['wisconsin', 'Wisconsin, USA'],
])

// Attempts to resolve each segment into a standard place string.
function recodePlace(text) {
    if (! text || text === '') text = 'unknown'
    const parts = text.split(',')
    // remove empty last field that occurs when PLAC has a trailing comma
    if (parts[parts.length-1] === '') parts.pop()

    // Presume the country is the last field
    let country = parts[parts.length-1].trim().toLowerCase()
    // Try to find or add the country
    if (Recode.has(country)) country = Recode.get(country)
    let part = country.toLowerCase()
    if (Country.has(part)) {
        country = Country.get(part)
    } else if (StateCountry.has(part)) {
        country = StateCountry.get(part)
    } else {
        console.log(`Place [${text}] has no country '${part}'`)
    }
    const segments = []
    for (let i=0; i<parts.length-1; i++) {
        part = parts[i].trim()
        if (Recode.has(part.toLowerCase())) part = Recode.get(part.toLowerCase())
        segments.push(part)
    }
    const last = segments[segments.length-1]
    if (country === 'United Kingdom') {
        if (last !== 'England' && last !== 'Scotland' && last !== 'Wales') {
            segments.push('England')
        }
    } else {
        segments.push(country)
    }
    return segments.join(', ')
}

export function parsePlace(text) {
    const parts = recodePlace(text).split(',')
    const place = {
        text: text,
        key: parts.join(','),
        count: 0,
        country: parts.length > 0 ? parts.pop().trim() : '',
        state: parts.length > 0 ? parts.pop().trim() : '',
        county: parts.length > 0 ? parts.pop().trim() : '',
        locale: parts.length > 0 ? parts.join(',') : '',
    }
    return place
}