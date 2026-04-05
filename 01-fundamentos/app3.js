const fs = require('fs');

const content = fs.readFileSync('../readme.md', 'utf-8');

wordCount = content.split(' ');
console.log('Palabras:', wordCount.length);

const reactWordCount = content.match(/node/gi ?? []).length
 
console.log(reactWordCount)

// const reactWordCounts = wordCount.filter( words => words.toLowerCase().includes('node'))
// console.log('Palabras React:', reactWordCounts)
