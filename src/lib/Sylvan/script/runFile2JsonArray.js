/**
 * Example of reading a newline-delimited text file into a plain-old JSON Object (PODO) array.
 */
import { file2JsonArray } from '../js/file2JsonArray.js'
const fileName = "../../data/RootsMagicAncestrySync.ged"

await mission()

async function mission() {
    const lines = await file2JsonArray(fileName)
    console.log(`File '${fileName}' has ${lines.length} lines`)
    console.log(lines[0])
}
