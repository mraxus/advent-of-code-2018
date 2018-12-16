const input = 8868;

function powerLevel(x, y, serial) {
  const rackID = x + 10;
  const initPowerLevel = rackID * y;

  return Math.floor((((initPowerLevel + serial) * rackID) % 1000) / 100) - 5;
}

function func1(serial) {
  const p = [...Array(300)].map((_, i) =>
    [...Array(300)].map((_, j) => powerLevel(j + 1, i + 1, serial))
  );
  let value;
  let max = -99999;
  let coords = '';

  for (let i = 0; i < p.length - 2; i++) {
    for (let j = 0; j < p.length - 2; j++) {
      value =
        p[i + 0][j + 0] +
        p[i + 0][j + 1] +
        p[i + 0][j + 2] +
        p[i + 1][j + 0] +
        p[i + 1][j + 1] +
        p[i + 1][j + 2] +
        p[i + 2][j + 0] +
        p[i + 2][j + 1] +
        p[i + 2][j + 2];
      if (value > max) {
        max = value;
        coords = `${j + 1},${i + 1}`;
      }
    }
  }

  return coords;
}

function sumMatrix(matrix, i, j, size) {
  let sum = 0;
  for (let a = i; a < i + size; a++) {
    for (let b = j; b < j + size; b++) {
      sum += matrix[a][b];
    }
  }
  return sum;
}

function func2(serial) {
  const p = [...Array(300)].map((_, i) =>
    [...Array(300)].map((_, j) => powerLevel(j + 1, i + 1, serial))
  );
  let value;
  let max = -99999;
  let coords = '';

  // TODO: Fix this so it's not insanely slow X-|
  for (let size = 1; size <= 300; size++) {
    for (let i = 0; i <= p.length - size; i++) {
      for (let j = 0; j <= p.length - size; j++) {
        value = sumMatrix(p, i, j, size);
        if (value > max) {
          max = value;
          coords = `${j + 1},${i + 1},${size}`;
        }
      }
    }
  }

  return coords;
}

if (require.main === module) {
  console.log(
    'Part 1 (3x3 largest total power fuel cell coordinate):',
    func1(input)
  );
  console.log('Part 2 ():', func2(input))
}

module.exports = {
  func1,
  func2,
};
