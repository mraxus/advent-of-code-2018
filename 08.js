const input = require('fs')
  .readFileSync('./data/08')
  .toString();

function func1(input) {
  let pos = 0;
  function nextNum() {
    const nextPos = input.indexOf(' ', pos);
    const num = +input.substring(pos, nextPos === -1 ? undefined : nextPos);
    pos = nextPos + 1;

    return num;
  }
  function traverse(input) {
    let nodes = nextNum();
    let metaEntries = nextNum();
    let sum = 0;

    while (nodes--) {
      sum += traverse(input);
    }
    while (metaEntries--) {
      sum += nextNum();
    }

    return sum;
  }

  return traverse(input);
}

function func2(input) {
  let pos = 0;
  function nextNum() {
    const nextPos = input.indexOf(' ', pos);
    const num = +input.substring(pos, nextPos === -1 ? undefined : nextPos);
    pos = nextPos + 1;

    return num;
  }
  function traverse(input) {
    let nodeCount = nextNum();
    let metaEntries = nextNum();
    let nodes = [0];
    let sum = 0;
    let value;

    while (nodeCount--) {
      value = traverse(input);
      nodes.push(value);
    }
    while (metaEntries--) {
      value = nextNum();
      sum += nodes.length > 1 ? (nodes[value] || 0) : value;
    }

    return sum;
  }

  return traverse(input);
}

if (require.main === module) {
  console.log('Part 1 (sum of metadata):', func1(input));
  console.log('Part 2 (root value):', func2(input));
}

module.exports = {
  func1,
  func2,
};
