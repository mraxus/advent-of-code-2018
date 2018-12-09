const { compute, func1, func2 } = require('../03')

describe('Day 03', () => {
  const partOne = [
    { input: '#1 @ 1,3: 4x4|#2 @ 3,1: 4x4|#3 @ 5,5: 2x2', result: 4 },
  ]

  const partTwo = [
    { input: '#1 @ 1,3: 4x4|#2 @ 3,1: 4x4|#3 @ 5,5: 2x2', result: 3 },
  ]

  partOne.forEach(({input, result}) => {
    test(`Part 1 (overlapping claims) with input "${input}" to be ${result}`, () => {
      expect(func1(compute(input.split('|')))).toBe(result)
    })
  })

  partTwo.forEach(({input, result}) => {
    test(`Part 2 (id not overlapping) with input "${input}" to be ${result}`, () => {
      expect(func2(compute(input.split('|')))).toBe(result)
    })
  })
})
