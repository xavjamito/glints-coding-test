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
const jobs = [];
const candidates = [];
text.split('\n').forEach(line => {
  if(line.length < 1) {
    return;
  }
  const rankings = line.substring(4).split(' ').map(rank => Number.parseInt(rank.substring(1)-1));
  if(line.startsWith('j')){
    jobs.push(rankings)
  } else {
    candidates.push(rankings);
  }
})
const scores = candidates.map((jobRankings, candidate) => jobRankings.map((job, jobRank) => {
    const candidateRank = jobs[job].indexOf(candidate)
    const rank = candidateRank + jobRank;
    return rank;
  })
);
console.log(jobs.map(s=> s.join('\t')).join('\n'))
console.log('')
console.log(candidates.map(s=> s.join('\t')).join('\n'))
console.log('')
console.log(scores.map(s=> s.join('\t')).join('\n'));
const pairs = []
scores.forEach((ranking, cN) => {
  let lowest = null;
  let j = null;
  ranking.forEach((rank, i)=>{
    if (pairs.indexOf(candidates[cN][i]) === -1 && (lowest === null ||  rank < lowest) ) {
      lowest = rank;
      j = i;
    }
  })
  pairs.push(candidates[cN][j]);
});

pairs.forEach((j,c)=> {
  console.log(`c${c+1} j${j+1}`);
})