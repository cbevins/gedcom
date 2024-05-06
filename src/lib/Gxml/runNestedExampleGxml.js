/**
 * Demonstrates composition of a simple, nested and scaled SVG diagram.
 */
import { nestedExampleGxml } from './nestedExampleGxml.js'
import { gxmlStr } from './gxmlStr.js'

const svg = nestedExampleGxml()
const xml = gxmlStr(svg)
console.log(xml)
