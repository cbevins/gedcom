export const GenerationsData = [
    {gen: 0, count: 1, from: 1, thru: 1, name: 'Self'},
    {gen: 1, count: 2, from: 2, thru: 3, name: 'Parent'},
    {gen: 2, count: 4, from: 4, thru: 7, name: 'Grand'},
    {gen: 3, count: 8, from: 8, thru: 15, name: '1st Great Grand'},
    {gen: 4, count: 16, from: 16, thru: 31, name: '2nd Great Grand'},
    {gen: 5, count: 32, from: 32, thru: 63, name: '3rd Great Grand'},
    {gen: 6, count: 64, from: 64, thru: 127, name: '4th Great Grand'},
    {gen: 7, count: 128, from: 128, thru: 255, name: '5th Great Grand'},
    {gen: 8, count: 256, from: 256, thru: 511, name: '6th Great Grand'},
    {gen: 9, count: 512, from: 512, thru: 1023, name: '7th Great Grand'},
    {gen: 10, count: 1024, from: 1024, thru: 2047, name: '8th Great Grand'},
    {gen: 11, count: 2048, from: 2048, thru: 4095, name: '9th Great Grand'},
    {gen: 12, count: 4096, from: 4096, thru: 8191, name: '10th Great Grand'},
    {gen: 13, count: 8192, from: 8192, thru: 16383, name: '11th Great Grand'},
    {gen: 14, count: 16384, from: 16384, thru: 32767, name: '12th Great Grand'},
    {gen: 15, count: 32768, from: 32768, thru: 65535, name: '13th Great Grand'},
    {gen: 16, count: 65536, from: 65536, thru: 131071, name: '14th Great Grand'},
    {gen: 17, count: 131072, from: 131072, thru: 262143, name: '15th Great Grand'},
    {gen: 18, count: 262144, from: 262144, thru: 524287, name: '16th Great Grand'},
    {gen: 19, count: 524288, from: 524288, thru: 1048575, name: '17th Great Grand'},
    {gen: 20, count: 1048576, from: 1048576, thru: 2097151, name: '18th Great Grand'},
]

export function generation(gen) {
    return GenerationsData[gen]
}

// gender 'F' for female, 'M' for male
export function generationName(gen, gender=null) {
    if (gen===0) return 'Self'
    // Determine name suffix
    let suffix = 'Parent'
    if (gender === 'F') suffix = 'Mother'
    else if (gender === 'M') suffix = 'Father'
    // 'Mother', 'Father', or 'Parent'
    if (gen === 1) return suffix
    // All others
    return GenerationsData[gen].name + ' ' + suffix
}

// function generateGenerationsData() {
//     let count = 1
//     let from = 1
//     let thru = 1
//     for(let gen=0; gen<=20; gen++) {
//         console.log(`{gen: ${gen}, count: ${count}, from: ${from}, thru: ${thru}, name: '${gen-2}th Great Grand'},`)
//         from += count
//         count *= 2
//         thru += count
//     }
// }

// function test {
//     console.log(generationName(0))
//     console.log(generationName(1))
//     console.log(generationName(1, 'M'))
//     console.log(generationName(1, 'F'))
//     console.log(generationName(1, 'X'))
//     console.log(generationName(2, 'M'))
//     console.log(generationName(3, 'M'))
//     console.log(generationName(3, 'F'))
//     console.log(generationName(3, ''))
// }