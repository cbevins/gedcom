// A simple script that lists all the command contexts and their frequency.
import { Gedcom } from '../../src/lib/js/Gedcom.js'
import { commandContexts } from '../../src/lib/js/commandContexts.js'
const Ancestry = "../data/Bevins-Riley Family Tree.ged"
const RootsMagic = "../data/Root Magic Bevins-Riley Ancestry Ged.ged"
const gedcom = new Gedcom()
// await gedcom.readFile(Ancestry)
await gedcom.readFile(RootsMagic)
commandContexts(gedcom).forEach(([c,n]) => {
    console.log(n.toString().padStart(5), c)
})
