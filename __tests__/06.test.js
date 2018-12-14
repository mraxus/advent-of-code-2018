const { func1, func2 } = require('../06')

describe('Day 06', () => {
  const partOne = [
    { input: '1, 1|1, 6|8, 3|3, 4|5, 5|8, 9'.split('|'), result: 17 },
  ]

  const partTwo = [
    { input: '1, 1|1, 6|8, 3|3, 4|5, 5|8, 9'.split('|'), result: 16 },
  ]

  partOne.forEach(({input, result}) => {
    test(`Part 1 (largest finite area) with input "${input}" to be ${result}`, () => {
      expect(func1(input)).toBe(result)
    })
  })

  partTwo.forEach(({input, result}) => {
    test(`Part 2 (number of regions below threshold) with input "${input}" to be ${result}`, () => {
      expect(func2(input, 32)).toBe(result)
    })
  })
})
