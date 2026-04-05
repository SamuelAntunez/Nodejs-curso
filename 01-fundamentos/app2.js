const fs = require('fs');

const data = fs.readFileSync('../readme.md', 'utf-8');

const newData = data.replace(/Node/ig, 'Pepe')

fs.writeFileSync('readme-pepe.md', newData)

