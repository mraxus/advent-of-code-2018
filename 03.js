const input = require('fs')
  .readFileSync('./data/03')
  .toString()
  .split('\n')
  .filter(x => x);
const regex = /#(?<id>\d+) @ (?<left>\d+),(?<top>\d+): (?<width>\d+)x(?<height>\d+)/;
// #1 @ 1,3: 4x4

function compute(input) {
  const idMatrix = {};
  const nonOverlappingIds = new Set();

  const overlaps = input
    .map(line => regex.exec(line).groups)
    .map(grp =>
      Object.keys(grp).reduce((res, key) => ({ ...res, [key]: +grp[key] }), {})
    )
    .map(({ id, left, top, width, height }) => {
      let overlaps = 0;
      let x, y, pos, presentId;
      let add = true;

      for (x = left; x < left + width; x++) {
        for (y = top; y < top + height; y++) {
          pos = `${x},${y}`;
          presentId = idMatrix[pos];

          if (presentId === undefined) {
            idMatrix[pos] = id;
          } else if (presentId === 'multiple') {
            add = false;
          } else {
            nonOverlappingIds.delete(presentId);
            add = false;
            idMatrix[pos] = 'multiple';
            overlaps += 1;
          }
        }
      }

      if (add) {
        nonOverlappingIds.add(id);
      }

      return overlaps;
    })
    .reduce((sum, num) => sum + num);

  return {
    overlaps,
    nonOverlappingId: nonOverlappingIds.values().next().value,
  };
}

function func1({ overlaps }) {
  return overlaps;
}

function func2({ nonOverlappingId }) {
  return nonOverlappingId;
}

if (require.main === module) {
  const result = compute(input);
  console.log('Part 1 (overlapping claims):', func1(result));
  console.log('Part 2 (id not overlapping):', func2(result));
}

module.exports = {
	compute,
  func1,
  func2,
};
