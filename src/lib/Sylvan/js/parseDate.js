// Attempts to create a valid, standardized date JSON object from a Date text string
const MonthAbr = ['???', 'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const MonthFull = ['Unknown', 'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Months = new Map([
    ['jan', 1], ['feb', 2], ['mar', 3], ['apr', 4], ['may', 5], ['jun', 6],
    ['jul', 7], ['aug', 8], ['sep', 9], ['oct', 10], ['nov', 11], ['dec', 12]
])

const Ignore = ['', 'and', 'est', 'or', 'to', 'unk', 'civ', 'war' ]

const Quals = new Map([
    ['ab', 'about'],
    ['abo', 'about'],
    ['abt', 'about'],
    ['af', 'after'],
    ['aft', 'after'],
    ['bef', 'before'],
    ['bet', 'between'],
    ['btw', 'between'],
    ['c', 'circa'],
    ['cir', 'circa'],
    ['civ', ''], // catches the 'Civil War' date
    ['ear', 'early'],
    // ['est', 'estimated'],
    ['pre', 'pre'],
])

// Parses the text to attempt to create a valid, standardized date JSON object
// Returns {text: 'abt 04 Sep 1952, year: 1952, month: 9, day: 4, qual: 'about', time: null, year2: 0, str: 'about 4 Sep 1952', msg: null}
export function parseDate(text) {
    const date = {text: text,
        year: 0, month: 0, day: 0, qual: '', time: 0, year2: 0, str: '', msg: null}
    // Remove all punctuation (except / and :) and extra spaces and convert to lower case
    let parts = text
        .trim()
        .replace(/[-]/g," ")
        .replace(/[.,#!$%\^&\*;{}=\-_`~()]/g,"")
        .replace(/\s{2,}/g," ")
        .toLowerCase()
        .split(' ')
    if (parts.length === 0) {
        date.msg = 'Date text is empty'
        return date
    }
    for(let i=0; i<parts.length; i++) {
        let part = parts[i]
        let key = part.substr(0, 3)
        let n = parseInt(part, 10)
        // console.log(`Part ${i} is '${part}'`)
        if (part.indexOf('/') >= 0) {
            const [m,d,y] = part.split('/')
            date.day = parseInt(d, 10)
            date.month = parseInt(m, 10)
            date.year = parseInt(y, 10)
        } else if (part.indexOf(':') >= 0) {
            date.time = part
        } else if (key === 'am' || key === 'pm') {
            date.time += ' ' + key
        } else if (Months.has(key)) {
            if (!date.month)  // never replace an existing month with a second on
                date.month = Months.get(key)
        } else if (Quals.has(key)) {
            date.qual = Quals.get(key)
        } else if (Ignore.includes(key)) { // ignore
        } else if (n > 1000) { // years must be >= 1000
            if (date.year) {
                date.year2 = n // between, to, etc
            } else {
                date.year = n
            }
        } else if (n <= 31) {
            if (!date.day) // never replace an existing day with a second one
                date.day = n
        } else {
            date.msg = `Date text ${text} has '${n}' for part ${i}: '${parts[i]}'`
        }
        if (date.day === null) date.day = 0
        date.str = formatDate(date)
    }
    return date
}

// 'date' is object with: {year: 1952, month: 9, day: 4, qual: 'about', year2: 0, msg: null, time: null}
export function formatDate(date, unknown='?') {
    let d = (date.qual === '') ? '' : date.qual + ' '
    if (date.day) {
        d += date.day + ' ' + MonthAbr[date.month] + ' '+ date.year
    } else if (date.month) {
        d += MonthAbr[date.month] + ' ' + date.year
    } else if (date.year) {
        d += date.year
        if (date.year2) d += '-' + date.year2
    } else {
        d = unknown
    }
    return d
}
