const input = require('fs')
  .readFileSync('./data/01')
  .toString();

function func1(input) {
  return input
    .split('\n')
    .filter(x => x.trim() !== '')
    .map(x => parseInt(x))
    .reduce((sum, x) => sum + x, 0);
}

function func2(input) {
  const frequencies = new Set([0]);
  let freq = 0;
  let i = 0;

  const arr = input
    .split('\n')
    .filter(x => x.trim() !== '')
    .map(x => parseInt(x));

  while (true) {
    freq += arr[i];
    if (frequencies.has(freq)) {
      break;
    }
    frequencies.add(freq);
    i = (i + 1) % arr.length;
  }

  return freq;
}

if (require.main === module) {
  console.log('Part 1 (resulting frequency):', func1(input));
  console.log('Part 2 (first recurring frequency):', func2(input));
}

module.exports = {
  func1,
  func2,
};
