const { func1, func2 } = require('../08');

describe('Day 1', () => {
  const partOne = [
    { input: '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2', result: 138 },
  ];
  const partTwo = [
    { input: '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2', result: 66 },
  ];

  partOne.forEach(({ input, result }) => {
    test(`Part 1 () with input "${input}" to be ${result}`, () => {
      expect(func1(input)).toBe(result);
    });
  });

  partTwo.forEach(({ input, result }) => {
    test(`Part 2 () with input "${input}" to be ${result}`, () => {
      expect(func2(input)).toBe(result);
    });
  });
});
