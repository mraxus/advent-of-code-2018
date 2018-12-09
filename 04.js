const input = require('fs')
  .readFileSync('./data/04')
  .toString()
  .split('\n')
  .filter(x => x);

const GUARD_REGEX = /#(\d+)/;
const MINUTE_REGEX = /:(\d+)/;

function func1(input) {
  const totalSleep = {};
  const sleepPeriods = {};
  let longestSleepingGuard = null;
  let currentGuard;
  let sleepStart = null;
  let sleepEnd = null;

  input.sort().forEach(line => {
    if (line.indexOf('Guard #') > 0) {
      currentGuard = GUARD_REGEX.exec(line)[1];
      totalSleep[currentGuard] = totalSleep[currentGuard] || 0;
      sleepPeriods[currentGuard] = sleepPeriods[currentGuard] || [];
    } else if (sleepStart !== null) {
      sleepEnd = +MINUTE_REGEX.exec(line)[1];
      totalSleep[currentGuard] += sleepEnd - sleepStart;
      sleepPeriods[currentGuard].push({ start: sleepStart, end: sleepEnd });
      sleepStart = null;
      if (
        !longestSleepingGuard ||
        totalSleep[currentGuard] > totalSleep[longestSleepingGuard]
      ) {
        longestSleepingGuard = currentGuard;
      }
    } else {
      sleepStart = +MINUTE_REGEX.exec(line)[1];
    }
  });

  const periods = sleepPeriods[longestSleepingGuard];
  const minutes = [...Array(60)].map(() => 0);

  periods.forEach(({ start, end }) => {
    for (let i = start; i < end; i++) {
      minutes[i] += 1;
    }
  });

  const { m: mostFrequentMinute } = minutes.reduce(
    ({ m, c }, count, min) => (count > c ? { m: min, c: count } : { m, c }),
    { m: 0, c: 0 }
  );

  return longestSleepingGuard * mostFrequentMinute;
}

function func2(input) {
  const sleepCycles = {};
  const iter = input.sort()[Symbol.iterator]();
  let line, min, sleepStart, sleepEnd;
  let currentGuard = -1;
  let highestFrequency = -1;
  let mostFrequentMin = -1;
  let mostFrequentGuard = -1;

  while (!(line = iter.next()).done) {
    if (line.value.endsWith('shift')) {
      currentGuard = GUARD_REGEX.exec(line.value)[1];
      if (!sleepCycles[currentGuard]) {
        sleepCycles[currentGuard] = [...Array(60)].map(() => 0);
      }
    } else {
      sleepStart = +line.value.substring(15, 17);
      sleepEnd = +iter.next().value.substring(15, 17);
      for (min = sleepStart; min < sleepEnd; min++) {
        sleepCycles[currentGuard][min] += 1;
        if (sleepCycles[currentGuard][min] > highestFrequency) {
          highestFrequency = sleepCycles[currentGuard][min];
          mostFrequentMin = min;
          mostFrequentGuard = currentGuard;
        }
      }
    }
  }

  return mostFrequentGuard * mostFrequentMin;
}

if (require.main === module) {
  console.log('Part 1 (preferable guard through strategy 1):', func1(input));
  console.log('Part 2 (preferable guard through strategy 2):', func2(input))
}

module.exports = {
  func1,
  func2,
};
