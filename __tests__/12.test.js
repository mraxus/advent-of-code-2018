const { func1, func2 } = require('../12');

const DATA =
  'initial state: #..#.#..##......###...###||...## => #|..#.. => #|.#... => #|.#.#. => #|.#.## => #|.##.. => #|.#### => #|#.#.# => #|#.### => #|##.#. => #|##.## => #|###.. => #|###.# => #|####. => #';

describe('Day 12', () => {
  const partOne = [{ input: DATA.split('|').join('\n'), result: 325 }];

  partOne.forEach(({ input, result }) => {
    test(`Part 1 (plant sum after 20 gen) should be ${result}`, () => {
      expect(func1(input)).toBe(result);
    });
  });
});
