const { func1, func2 } = require('../07');

const DATA =
  'Step C must be finished before step A can begin.|Step C must be finished before step F can begin.|Step A must be finished before step B can begin.|Step A must be finished before step D can begin.|Step B must be finished before step E can begin.|Step D must be finished before step E can begin.|Step F must be finished before step E can begin.';

describe('Day 06', () => {
  const partOne = [{ input: DATA.split('|'), result: 'CABDFE' }];

  const partTwo = [{ input: DATA.split('|'), result: 15 }];

  partOne.forEach(({ input, result }) => {
    test(`Part 1 (Sleigh assembly instructions) with input "${input}" to be ${result}`, () => {
      expect(func1(input)).toBe(result);
    });
  });

  partTwo.forEach(({ input, result }) => {
    test(`Part 2 (Assembly time taken) with input "${input}" to be ${result}`, () => {
      expect(func2(input, 2, 0)).toBe(result);
    });
  });
});
