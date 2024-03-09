import {Countries, Regions, States, Recodes} from '../data/Places.js'

// Attempts to resolve each segment into a standard place string.
// Returns an array of place name segments and error message
function recodePlace(text) {
    if (! text || text === '') return [[], ['missing place text']]
    let message = null
    // Split place name on commas, trim, and convert to lowercase
    const fields = text.split(',')
    const parts = [] 
    for (let i=0; i<fields.length; i++) {
        fields[i] = fields[i].trim()
        if (fields[i] !== '') parts.push(fields[i].toLowerCase())
    }

    let country = null
    let state = null
    // Last field must be a known country
    if (parts.length) {
        let last = parts[parts.length-1]
        if (Countries.has(last)) {
            country = Countries.get(last)
            parts.pop()
        }
        else if (States.has(last)) { // If the last field is a known state or region, add the country
            country = 'USA'
            state = States.get(last)
            parts.pop()
        } else if (Regions.has(last)) {
            [state, country] = Regions.get(last)
            parts.pop()
        } else {
            message = `unknown country [${text}]`
        }
    }

    // Second to last field, if present, must be a known state, province, or region
    if (country && ! state && parts.length) {
        let last = parts[parts.length-1]
        if (States.has(last)) {
            state = States.get(last)
            parts.pop()
        } else if (Regions.has(last)) {
            state = Regions.get(last)[0]
            parts.pop()
        } else {
            message = `unknown state [${text}]`
        }
    }

    // Check all other fields for a possible recode
    const segments = []
    for (let i=0; i<parts.length; i++) {
        segments.push(fields[i])
    }
    segments.push(state ? state : 'unknown state')
    segments.push(country ? country : 'unknown country')
    return [segments, message]
}

// text is, hopefully, a comma-delimited place name
export function parsePlace(text) {
    const [parts, message] = recodePlace(text)
    const place = {
        text: text,
        key: parts.join(','),
        count: 0,   // stores count of the 'text' if stored as a map entry
        message: message,
        country: parts.length > 0 ? parts.pop() : '',
        state: parts.length > 0 ? parts.pop() : '',
        locale: parts.length > 0 ? parts.join(', ') : '',
    }
    return place
}