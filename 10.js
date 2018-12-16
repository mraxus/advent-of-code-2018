const input = require('fs')
  .readFileSync('./data/10')
  .toString()
  .split('\n')
  .filter(x => x);

const REGEX = /position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/g;

function print(X, Y) {
  const minX = Math.min(...X);
  const maxX = Math.max(...X);
  const minY = Math.min(...Y);
  const maxY = Math.max(...Y);
  let str = '';

  let dots = X.reduce(
    (d, _, i) => ({
      ...d,
      [[X[i], Y[i]]]: true,
    }),
    {}
  );

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      str += dots[[x, y]] ? '#' : ' ';
    }
    str += '\n';
  }

  return str.trim();
}

function func(input) {
  const X = [...Array(input.length)].map(_ => 0);
  const Y = Array(input.length);
  const dX = Array(input.length);
  const dY = Array(input.length);
  let sec = 1;
  let m, M;

  input.forEach((line, i) => {
    [, X[i], Y[i], dX[i], dY[i]] = REGEX.exec(input).map(x => +x);
  });

  while (true) {
    X.forEach((_, i) => {
      X[i] += dX[i];
      Y[i] += dY[i];
    });

    m = Math.min(...Y);
    M = Math.max(...Y);

    if (
      M - m < 11 &&
      Y.filter(x => x === m).length > 2 &&
      Y.filter(x => x === M).length > 2
    ) {
      break;
    }
    sec += 1;
  }

  return [print(X, Y), sec];
}

function func2(input) {
  return 0;
}

if (require.main === module) {
  const [grid, sec] = func(input);
  console.log(`Part 1 (message in the sky): \n${grid.split('\n').map(l => `  :${l}`).join('\n')}`);
  console.log(`Part 2 (number of seconds taken): ${sec}`)
}

module.exports = {
  func,
};
