import fs from 'fs-extra'
import { yarg } from './config/plugin/args.plugin';

console.log(yarg)
//! destructuring const {b:base, l:limit, s:show} = yarg;
const base = yarg.b;
const message: string = `
============================================
                Tabla del ${base}
============================================\n
`
let outputhMessage = '';

for (let i = 0; i <= yarg.l; i++) {
    outputhMessage += ` ${base} x ${i} = ${base * i}\n`

}

if (yarg.s) {
    outputhMessage = message + outputhMessage
    console.log(outputhMessage)


    const outputhPath = `outputs`

    fs.mkdirSync(outputhPath, { recursive: true })
    fs.writeFile(`${outputhPath}/tabla-${base}.txt`, outputhMessage)
}
