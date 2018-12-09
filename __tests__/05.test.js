const { func1, func2 } = require('../05')

describe('Day 05', () => {
  const partOne = [
    { input: 'aA', result: 0 },
    { input: 'abBA', result: 0 },
    { input: 'abAB', result: 4 },
    { input: 'aabAAB', result: 6 },
    { input: 'dabAcCaCBAcCcaDA', result: 10 },
    { input: 'lDdhGghHHLAXxaKkFfDdsSKkeyYEwWDdlBbLIisGcCvOVQqvoVgGPAWwapgIiDJeiIOoElLBBbbGgrRYyNZMmznFfjBboZzdDmMmMsSKHhkgGAfZzZz', result: 5 },
    { input: 'lDdhGghHHLAXxaKkFfDdsSKkeyYEwWDd', result: 0 },
  ]

  const partTwo = [
    { input: 'dabAcCaCBAcCcaDA', result: 4 },
  ]

  partOne.forEach(({input, result}) => {
    test(`Part 1 (polymer reduction) with input "${input}" to be ${result}`, () => {
      expect(func1(input)).toBe(result)
    })
  })

  partTwo.forEach(({input, result}) => {
    test(`Part 2 (polymer reduction with the most significant elimination) with input "${input}" to be ${result}`, () => {
      expect(func2(input)).toBe(result)
    })
  })
})
