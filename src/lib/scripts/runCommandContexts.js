// A simple script that lists all the command contexts and their frequency.
import { Gedcom } from '../js/Gedcom.js'
import { commandContexts } from '../js/commandContexts.js'
const Ancestry = "../data/AncestryTest.ged"
const RootsMagic = "../data/RootsMagic.ged"
const gedcom = new Gedcom()
await gedcom.readFile(Ancestry)
commandContexts(gedcom).forEach(([c,n]) => {
    console.log(n.toString().padStart(5), c)
})
