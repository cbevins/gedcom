// Returns [years, months, days] between from and thru dates.
// Note that 'from' and 'thru' are each a JSON object
// that must contain {day:, month:, year:} properties.
// If 'thru' is NULL, the current date is used
// If 'from'  is null,
export function age(from, thru=null) {
    const days = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (! from.year) return 0
    if (! thru) {
        const now = new Date()
        thru = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()}
    }
    let y = thru.year - from.year
    let m = thru.month - from.month
    let d = thru.day - from.day
    if (d < 0) {
        m -= 1
        d += days[thru.month-1]
    }
    if (m < 0) {
        y -= 1
        m += 12
    }
    return [y, m, d]
}
