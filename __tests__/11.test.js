const { func1, func2 } = require('../11')

describe('Day 11', () => {
  const partOne = [
    { input: 18, result: '33,45' },
    { input: 42, result: '21,61' },
  ]

  const partTwo = [
    { input: '', result: -1 },
  ]

  partOne.forEach(({input, result}) => {
    test(`Part 1 (3x3 largest total power fuel cell coordinate) with input "${input}" to be ${result}`, () => {
      expect(func2(input)).toBe(result)
    })
  })

  // partTwo.forEach(({input, result}) => {
  //   test(`Part 2 () with input "${input}" to be ${result}`, () => {
  //     expect(func2(input)).toBe(result)
  //   })
  // })
})
