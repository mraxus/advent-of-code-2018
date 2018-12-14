const input = require('fs')
  .readFileSync('./data/06')
  .toString()
  .split('\n')
  .filter(x => x);

const DIFF = 3;
const abs = Math.abs;
const m = Math.min;
const M = Math.max;

// Manhattan distance
const dist = ([x1, y1], [x2, y2]) => abs(x1 - x2) + abs(y1 - y2);

function func1(input) {
  const matrix = {};
  const points = input.map(x => x.split(', ').map(x => +x));
  const [minX, minY, maxX, maxY] = points
    .reduce(([x, y, X, Y], [a, b]) => [m(x, a), m(y, b), M(X, a), M(Y, b)], [
      ...points[0],
      ...points[0],
    ])
    .map((x, i) => x + (i > 1 ? DIFF : -DIFF));

  const pointsOfInterest = points.reduce((poi, _, p) => ({ ...poi, [p]: 0 }), {
    '-1': 0,
  });

  function upPOI(p, diff) {
    if (typeof pointsOfInterest[p] === 'number') {
      pointsOfInterest[p] += diff;
    }
  }

  let co, d;
  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      co = `${x},${y}`;
      matrix[co] = { d: 99999, p: -1 };
      points.forEach((coords, p) => {
        d = dist([x, y], coords);
        if (d <= matrix[co].d) {
          upPOI(matrix[co].p, -1);
          if (d < matrix[co].d) {
            matrix[co] = { d, p };
            upPOI(p, 1);
          } else {
            matrix[co] = { d: d, p: -1 };
          }
        }
      });
      if (x === minX || x === maxX || y === minY || y === maxY) {
        delete pointsOfInterest[matrix[co].p];
      }
    }
  }

  // Remove placeholder PoI
  delete pointsOfInterest['-1'];

  return M(...Object.values(pointsOfInterest));
}

function func2(input, threshold) {
  const points = input.map(x => x.split(', ').map(x => +x));
  const [minX, minY, maxX, maxY] = points
    .reduce(([x, y, X, Y], [a, b]) => [m(x, a), m(y, b), M(X, a), M(Y, b)], [
      ...points[0],
      ...points[0],
    ])
    .map((x, i) => x + (i > 1 ? DIFF : -DIFF));

  let belowThreshold = 0;
  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      belowThreshold +=
        points.reduce((sum, coords) => sum + dist([x, y], coords), 0) >=
        threshold
          ? 0
          : 1;
    }
  }

  return belowThreshold;
}

if (require.main === module) {
  console.log('Part 1 (largest finite area):', func1(input));
  console.log('Part 2 (number of regions below threshold):', func2(input, 10000));
}

module.exports = {
  func1,
  func2,
};
