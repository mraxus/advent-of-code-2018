const input = require('fs')
  .readFileSync('./data/05')
  .toString()
  .trim();

const INVERSE = [...Array(26)]
  .map((_, i) => String.fromCharCode(i + 65, i + 97))
  .reduce((dict, [C, c]) => ({ ...dict, [c]: C, [C]: c }), {});

// function LOG(polys, pos) {
//   const brightGreen = text => `\x1b[38;2;0;204;0m${text}\x1b[0m`;
//   let str = polys.join('');
//
//   return (
//     str.substring(0, pos) +
//     brightGreen(str.substring(pos, pos + 2)) +
//     str.substring(pos + 2)
//   );
// }

function reducePolymer(input) {
  const polymers = input.split('');
  let pos = 0;
  // let log = '';

  // Find all initial reactions
  while (pos + 1 < polymers.length) {
    if (polymers[pos] === INVERSE[polymers[pos + 1]]) {
      // log += LOG(polys, pos) + '\n';
      polymers.splice(pos, 2);
      pos = Math.max(0, pos - 1);
    } else {
      pos++;
    }
  }
  // console.log(`${log}${polys.length} => '${polys.join('')}'`);

  return polymers;
}

function func1(input) {
  return reducePolymer(input).length;
}

function func2(input) {
  const reducedPolymer = reducePolymer(input);
  const reducedInput = reducedPolymer.join('');
  const types = Object.keys(
    reducedPolymer.reduce((res, t) => ({ ...res, [t.toLowerCase()]: true }), {})
  );

  return types.reduce((min, t) => {
    const dblRed = reducePolymer(reducedInput.replace(new RegExp(t, 'ig'), ''));
    return Math.min(min, dblRed.length);
  }, reducedPolymer.length);
}

if (require.main === module) {
  console.log('Part 1 (polymer reduction):', func1(input));
  console.log('Part 2 (polymer reduction with the most significant elimination):', func2(input))
}

module.exports = {
  func1,
  func2,
};
