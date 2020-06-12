const fs = require('fs');
const [,,inputFile] = process.argv;
if (!inputFile) {
  console.log('no input file specified')
  return;
}
if(!fs.existsSync(inputFile)){ 
  console.log('file not found');
  return;
}
const text = fs.readFileSync(inputFile, 'utf-8');
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

const replaceAdjacentTiles = (data, row, col,replacement) => {
  let adjacentCount = 0;
  const nextCol = col+1;
  const nextRow = row+1;
  const prevCol = col-1;
  const prevRow = row-1;
  if(prevRow >= 0 && prevCol >=0 && data[prevRow][prevCol] === '+') {
    data[prevRow][prevCol] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,prevRow, prevCol, replacement);
  }
  if(prevRow >= 0 && data[prevRow][col] === '+') {
    data[prevRow][col] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,prevRow, col, replacement);
  }
  if(prevRow >= 0 && nextCol < data[prevRow].length && data[prevRow][nextCol] === '+'){
    data[prevRow][nextCol] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,prevRow, nextCol, replacement);
  }
  if (prevCol >= 0 && data[row][prevCol] === '+') {
    data[row][prevCol] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,row, prevCol, replacement);
  }
  if (nextCol >= 0 && data[row][nextCol] === '+') {
    data[row][nextCol] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,row, nextCol, replacement);
  }
  if(nextRow < data.length && prevCol >= 0 && data[nextRow][prevCol] === '+'){
    data[nextRow][prevCol] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,nextRow, prevCol, replacement);
  }
  if(nextRow < data.length && data[nextRow][col] === '+'){
    data[nextRow][col] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,nextRow, col, replacement);
  }
  if(nextRow < data.length && nextCol < data[nextRow].length && data[nextRow][nextCol] === '+'){
    data[nextRow][nextCol] = replacement;
    adjacentCount += 1 + replaceAdjacentTiles(data,nextRow, nextCol, replacement);
  }
  return adjacentCount;
}

const getClusterCount = (data) => {
  let count = 0;
  for(let i =0; i<data.length; i++) {
    for(let j=0; j<data[i].length; j++){
      if(data[i][j] === '+') {
        data[i][j] = count+1;
        const adjacentCount = replaceAdjacentTiles(data,i,j,count+1);
        if(adjacentCount >= 0) {
          count++;
        }
      }
    }
  }
  return count;
}
const printData = (data) => {
  for(let i =0; i<data.length; i++) {
    console.log(data[i].join(''));
  }
}

const count = getClusterCount(data);

printData(data);
console.log(count);