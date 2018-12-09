const input = require('fs')
  .readFileSync('./data/02')
  .toString()
  .split('\n');

function func1(input) {
  const [twoCount, threeCount] = input
    .map(id => {
      const values = Object.values(
        id
          .split('')
          .reduce((res, c) => ({ ...res, [c]: (res[c] || 0) + 1 }), {})
      );

      return [
        values.some(x => x === 2) ? 1 : 0,
        values.some(x => x === 3) ? 1 : 0,
      ];
    })
    .reduce(([sum2, sum3], [i2, i3]) => [sum2 + i2, sum3 + i3], [0, 0]);

  return twoCount * threeCount;
}

function func2(input) {
  let i, j, x;
  let idI, idJ;
  let diffs;

  for (i = 0; i < input.length; i++) {
    for (j = i + 1; j < input.length; j++) {
      idI = input[i];
      idJ = input[j];
      diffs = 0;

      for (x = 0; x < idI.length; x++) {
        diffs += idI[x] === idJ[x] ? 0 : 1;
      }
      if (diffs === 1) {
        return idI
          .split('')
          .filter((c, idx) => c === idJ[idx])
          .join('');
      }
    }
  }
  return null;
}

if (require.main === module) {
  console.log('Part 1 (checksum):', func1(input));
  console.log('Part 2 (common letters from the id boxes):', func2(input))
}

module.exports = {
  func1,
  func2,
};
