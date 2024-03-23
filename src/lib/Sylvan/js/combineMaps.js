/**
 * Combines two Map objects with key => number
 * @param {Map} map1 Map object whose value is a number
 * @param {Map} map2 Map object whose value is a number
 * @returns A new Map with combined keys and values
 */
export function combineMaps(map1, map2) {
    const combined = new Map( 
        Array.from(map1)
            .concat(Array.from(map2))
            .reduce((ele, [key, value]) => {
                ele.set(key, (ele.get(key) || 0) + value)
                return ele
            }, new Map())
    )
    return combined
}
