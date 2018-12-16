const input = require('fs')
  .readFileSync('./data/12')
  .toString();

function parse(input) {
  const [firstLine, notes] = input.split('\n\n');
  const [, initState] = firstLine.split(': ');

  const morph = notes
    .split('\n')
    .map(line => line.split(' => '))
    .reduce(
      (map, [match, result]) => ({
        ...map,
        [match]: result,
      }),
      {}
    );

  return {
    initState,
    morph,
  };
}

function nextGen(state, morph) {
  let next = '..';
  let strip;
  for (let x = 2; x < state.length - 2; x++) {
    strip = state.substring(x - 2, x + 3);
    next += morph[strip] || '.';
  }

  return next + '...';
}

function plantSum(state, diff) {
  return state
    .split('')
    .reduce((sum, c, i) => sum + (c === '#' ? i - diff : 0), 0);
}

function func1(input) {
  const { initState, morph } = parse(input);
  const shift = '...';
  let state = `${shift}${initState}...`;
  let diff = shift.length;
  let lastState;

  for (let gen = 1; gen <= 20; gen++) {
    lastState = state.substring(state.indexOf('#'));
    state = nextGen(state, morph);
  }

  return plantSum(state, diff);
}

function func2(input) {
  const { initState, morph } = parse(input);
  const shift = '..........';
  let state = `${shift}${initState}......`;
  let diff = shift.length;
  let lastState;

  const finalGeneration = 50000000000;

  for (let gen = 1; gen <= 200; gen++) {
    lastState = state.substring(state.indexOf('#'));
    state = nextGen(state, morph);
    if (lastState === state.substring(state.indexOf('#'))) {
      const sum = plantSum(state, diff);
      const genDiff = finalGeneration - gen;
      const count = state.split('.').join('').length;

      return sum + genDiff * count;
    }
  }

  return -1;
}

if (require.main === module) {
  console.log('Part 1 (plant sum after 20 generation):', func1(input));
  console.log('Part 2 (plant sum after 50 billion generation):', func2(input));
}

module.exports = {
  func1,
  func2,
};
