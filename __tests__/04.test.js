const { func1, func2 } = require('../04')

const TEST_DATA = '[1518-11-01 00:55] wakes up|[1518-11-01 23:58] Guard #99 begins shift|[1518-11-03 00:05] Guard #10 begins shift|[1518-11-05 00:55] wakes up|[1518-11-04 00:02] Guard #99 begins shift|[1518-11-01 00:00] Guard #10 begins shift|[1518-11-05 00:03] Guard #99 begins shift|[1518-11-01 00:05] falls asleep|[1518-11-04 00:46] wakes up|[1518-11-02 00:40] falls asleep|[1518-11-05 00:45] falls asleep|[1518-11-01 00:25] wakes up|[1518-11-01 00:30] falls asleep|[1518-11-02 00:50] wakes up|[1518-11-03 00:24] falls asleep|[1518-11-04 00:36] falls asleep|[1518-11-03 00:29] wakes up';

describe('Day 04', () => {
  const partOne = [
    { input: TEST_DATA.split('|'), result: 240 },
  ]

  const partTwo = [
    { input: TEST_DATA.split('|'), result: 4455 },
  ]

  partOne.forEach(({input, result}) => {
    test(`Part 1 (preferable guard through strategy 1) to be ${result}`, () => {
      expect(func1(input)).toBe(result)
    })
  })

  partTwo.forEach(({input, result}) => {
    test(`Part 2 (preferable guard through strategy 2) with to be ${result}`, () => {
      expect(func2(input)).toBe(result)
    })
  })
})
