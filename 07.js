const input = require('fs')
  .readFileSync('./data/07')
  .toString()
  .split('\n')
  .filter(x => x);

class Node {
  constructor(name) {
    this.name = name;
    this.parents = new Map();
    this.children = new Map();
  }

  freeMe(parentName) {
    this.parents.delete(parentName);

    // true if no more parents
    return !this.parents.size;
  }

  freeChildren() {
    const freed = [];

    for (const [, child] of this.children) {
      if (child.freeMe(this.name)) {
        freed.push(child);
      }
    }

    return freed;
  }

  toString() {
    const toStr = map =>
      Array.from(map)
        .map(([n]) => n)
        .join(',');
    const childInfo = `children: [${toStr(this.children)}]`;
    const parentInfo = `parents: [${toStr(this.parents)}]`;
    return `Node { name: ${this.name}, ${childInfo}, ${parentInfo} }`;
  }
}

function parseInstructions(inputArray) {
  const nodes = {};
  const independents = new Set();
  const dependents = new Set();

  inputArray.forEach(i => {
    const p = i[5];
    const c = i[36];

    if (!dependents.has(p)) independents.add(p);
    dependents.add(c);
    if (independents.has(c)) independents.delete(c);

    if (!nodes[p]) nodes[p] = new Node(p);
    if (!nodes[c]) nodes[c] = new Node(c);

    nodes[p].children.set(c, nodes[c]);
    nodes[c].parents.set(p, nodes[p]);
  });

  return Array.from(independents)
    .sort()
    .map(i => nodes[i]);
}

function func1(input) {
  const nodes = [...parseInstructions(input)];
  let order = '';
  let next;

  while (nodes.length) {
    next = nodes.shift();
    order += next.name;

    nodes.push(...next.freeChildren());
    nodes.sort((a, b) => a.name.localeCompare(b.name));
  }

  return order;
}

function func2(input, workers, baseTime) {
  const assemblyTime = node => baseTime + node.name.charCodeAt(0) - 64;
  const nodes = parseInstructions(input)
    .map(n => [assemblyTime(n), n])
    .sort();
  let queue = [];
  let next;
  let time = 0;

  while (nodes.length) {
    [time, next] = nodes.shift();

    queue.push(...next.freeChildren());
    queue.sort((a, b) => a.name.localeCompare(b.name));

    while (queue.length && nodes.length < workers) {
      next = queue.shift();
      nodes.push([time + assemblyTime(next), next]);
    }
    nodes.sort((a, b) => a[0] - b[0]);
  }

  return time;
}

if (require.main === module) {
  console.log('Part 1 (Sleigh assembly instructions):', func1(input));
  console.log('Part 2 (Assembly time taken):', func2(input, 5, 60));
}

module.exports = {
  func1,
  func2,
};
