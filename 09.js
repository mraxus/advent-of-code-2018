const input = require('fs')
  .readFileSync('./data/09')
  .toString();

class Marble {
  constructor(value, clocker = null, counter = null) {
    this.value = value;
    this.clocker = clocker || this;
    this.counter = counter || this;
  }

  insertNewMarble(value) {
    const next = this.clocker;
    const nextNext = this.clocker.clocker;
    const newCurrent = new Marble(value, nextNext, next);
    next.clocker = newCurrent;
    nextNext.counter = newCurrent;

    return newCurrent;
  }

  extractSomeMarble(value) {
    let nextMarble = this;

    for (let x = 0; x < 7; x++) {
      nextMarble = nextMarble.counter;
    }

    nextMarble.counter.clocker = nextMarble.clocker;
    nextMarble.clocker.counter = nextMarble.counter;

    return [nextMarble.clocker, value + nextMarble.value];
  }
}

function func1(input, factor=1) {
  const words = input.split(' ');
  const players = [...Array(+words[0])].map(_ => 0);
  const lastValue = +words[6];
  let currentMarble = new Marble(0);
  let player = 0;
  let points = null;

  for (let value = 1; value <= (lastValue * factor); value++) {
    if (value % 23 === 0) {
      [currentMarble, points] = currentMarble.extractSomeMarble(value);
      players[player] += points;
    } else {
      currentMarble = currentMarble.insertNewMarble(value);
    }

    player = (player + 1) % players.length;
  }

  return Math.max(...players);
}

function func2(input) {
  return func1(input, 100);
}

if (require.main === module) {
  console.log('Part 1 (highest marble game score):', func1(input));
  console.log('Part 2 (100 x larger):', func2(input))
}

module.exports = {
  func1,
  func2,
};
