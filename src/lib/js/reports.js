export function logMemory(p1, p2) {
    function mb(n) { return ((n/(1024*1024)).toFixed(2)).padStart(8) }
    console.log('\nrss (Mb)    :', mb(p1.rss), mb(p2.rss))
    console.log('heapTotal   :', mb(p1.heapTotal), mb(p2.heapTotal))
    console.log('heapUsed    :', mb(p1.heapUsed), mb(p2.heapUsed))
    console.log('external    :', mb(p1.external), mb(p2.external))
    console.log('arrayBuffers:', mb(p1.arrayBuffers), mb(p2.arrayBuffers))
}

export function logDataSizes(gedcom) {
    console.log(`Records : ${gedcom._lineNo.toString().padStart(5)}`)
    console.log(`INDI    : ${gedcom._indi.size.toString().padStart(5)}`)
    console.log(`FAM     : ${gedcom._fam.size.toString().padStart(5)}`)
    console.log(`SOUR    : ${gedcom._sour.size.toString().padStart(5)}`)
}
