const { func1, func2 } = require('../09')

describe('Day 09', () => {
  const partOne = [
    { input: '9 players; last marble is worth 32 points', result: 32 },
    { input: '10 players; last marble is worth 1618 points', result: 8317 },
    { input: '13 players; last marble is worth 7999 points', result: 146373 },
    { input: '17 players; last marble is worth 1104 points', result: 2764 },
    { input: '21 players; last marble is worth 6111 points', result: 54718 },
    { input: '30 players; last marble is worth 5807 points', result: 37305 },
  ]

  const partTwo = [
    { input: '', result: -1 },
  ]

  partOne.forEach(({input, result}) => {
    test(`Part 1 () with input "${input}" to be ${result}`, () => {
      expect(func1(input)).toBe(result)
    })
  })

  // partTwo.forEach(({input, result}) => {
  //   test(`Part 2 () with input "${input}" to be ${result}`, () => {
  //     expect(func2(input)).toBe(result)
  //   })
  // })
})
