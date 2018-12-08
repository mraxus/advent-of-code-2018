const { func1, func2 } = require('../01');

describe('Day 1', () => {
  const partOne = [
    { input: '+1, -2, +3, +1', result: 3 },
    { input: '+1, +1, +1', result: 3 },
    { input: '+1, +1, -2', result: 0 },
    { input: '-1, -2, -3', result: -6 },
  ];
  const partTwo = [
		{ input: '+1, -2, +3, +1', result: 2 },
		{ input: '+1, -1', result: 0 },
		{ input: '+3, +3, +4, -2, -4', result: 10 },
		{ input: '-6, +3, +8, +5, -6', result: 5 },
		{ input: '+7, +7, -2, -7, -4', result: 14 },
  ];

  partOne.forEach(({ input, result }) => {
    test(`Part 1 (resulting frequency) with input "${input}" to be ${result}`, () => {
      expect(func1(input.replace(/, /g, '\n'))).toBe(result);
    });
  });

  partTwo.forEach(({ input, result }) => {
    test(`Part 2 (first recurring frequency) with input "${input}" to be ${result}`, () => {
      expect(func2(input.replace(/, /g, '\n'))).toBe(result);
    });
  });
});
