export const Countries = new Map([
    ['Belgium', {abbr: 'Bel', flag: 'BEL', label: 'Belgium'}],
    ['Canada', {abbr: 'Can', flag: 'CAN', label: 'Canada'}],
    ['England', {abbr: 'Eng', flag: 'ENG', label: 'England'}],
    ['France', {abbr: 'FRA', flag: 'FRA', label: 'France'}],
    ['Germany',  {abbr: 'GER', flag: 'GER', label: 'Germany'}],
    ['Ireland',  {abbr: 'IRE', flag: 'IRE', label: 'Ireland'}],
    ['Netherlands',  {abbr: 'NET', flag: 'NET', label: 'Netherlands'}],
    ['Norway',  {abbr: 'NOR', flag: 'NOR', label: 'Norway'}],
    ['Scotland',  {abbr: 'SCO', flag: 'SCO', label: 'Scotland'}],
    ['Sweden',  {abbr: 'SWE', flag: 'SWE', label: 'Sweden'}],
    ['USA',  {abbr: 'USA', flag: 'USA', label: 'United States'}],
    ['Wales',  {abbr: 'WAL', flag: 'WAL', label: 'Wales'}],
    ['',  {abbr: 'Unk', flag: 'UNK', label: 'Unknown'}],
    ['Unknown',  {abbr: 'Unk', flag: 'UNK', label: 'Unknown'}],
    ['unknown country',  {abbr: 'Unk', flag: 'UNK', label: 'Unknown'}],
])

export function countryAbbr(country) {
    const obj = Countries.get(country)
    return obj ? obj.abbr : '???' + country
}

export function countryFlag(country) {
    const obj = Countries.get(country)
    return obj ? obj.flag : 'UNK'
}

export function countryFlagHref(country) {
    return '#' + countryFlag(country)
}

export function countryLabel(country) {
    const obj = Countries.get(country)
    return obj ? obj.label : 'No Label for ' + country
}
