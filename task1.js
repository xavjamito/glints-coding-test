const fs = require('fs');
const [,,inputFile] = process.argv;
if (!inputFile) {
  console.log('no input file specified')
  return;
}
//console.log('reading file:', inputFile)
if(!fs.existsSync(inputFile)){ 
  console.log('file not found');
  return;
}
const text = fs.readFileSync(inputFile, 'utf-8');
//console.log(text)
const data = [];
let row = [];
for(let i =0; i<text.length; i++) {
  const char = text.charAt(i);
  
  if(char !== '+' && char !== '0') {
    data.push(row);
    row = [];
    continue;
  }
  row.push(char);
}
data.push(row);

console.log(data);