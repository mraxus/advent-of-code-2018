const { func1, func2 } = require('../02');

describe('Day 02', () => {
  const partOne = [
    { input: 'abcdef,bababc,abbcde,abcccd,aabcdd,abcdee,ababab', result: 12 },
  ];

  const partTwo = [
    { input: 'abcde,fghij,klmno,pqrst,fguij,axcye,wvxyz', result: 'fgij' },
    { input: 'aaaaa,aaaaa', result: null },
    { input: 'aaaaa,baaaa', result: 'aaaa' },
    { input: 'aaaaa,bbaaa', result: null },
  ];

  partOne.forEach(({ input, result }) => {
    test(`Part 1 (checksum) with input "${input}" to be ${result}`, () => {
      expect(func1(input.split(','))).toBe(result);
    });
  });

  partTwo.forEach(({ input, result }) => {
    test(`Part 2 (common letters from the id boxes) with input "${input}" to be ${result}`, () => {
      expect(func2(input.split(','))).toBe(result);
    });
  });
});
