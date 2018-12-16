const { spawn } = require('child_process');

const YEAR = '2018';
const USER = 'mraxus';
const STARS = '22';

const assignments = [
  { filename: '01.js', title: 'Day 1: Chronal Calibration' },
  { filename: '02.js', title: 'Day 2: Inventory Management System' },
  { filename: '03.js', title: 'Day 3: No Matter How You Slice It' },
  { filename: '04.js', title: 'Day 4: Repose Record' },
  { filename: '05.js', title: 'Day 5: Alchemical Reduction' },
  { filename: '06.js', title: 'Day 6: Chronal Coordinates' },
  { filename: '07.js', title: 'Day 7: The Sum of Its Parts' },
  { filename: '08.js', title: 'Day 8: Memory Maneuver' },
  { filename: '09.js', title: 'Day 9: Marble Mania' },
  { filename: '10.js', title: 'Day 10: The Stars Align' },
  { filename: '11.js', title: 'Day 11: Chronal Charge' },
  { filename: '12.js', title: '' },
  { filename: '13.js', title: '' },
  { filename: '14.js', title: '' },
  { filename: '15.js', title: '' },
  { filename: '16.js', title: '' },
  { filename: '17.js', title: '' },
  { filename: '18.js', title: '' },
  { filename: '19.js', title: '' },
  { filename: '20.js', title: '' },
  { filename: '21.js', title: '' },
  { filename: '22.js', title: '' },
  { filename: '23.js', title: '' },
  { filename: '24.js', title: '' },
  { filename: '25.js', title: '' },
].filter(({ title }) => title);
const white = text => `\x1b[38;2;255;255;255m${text}\x1b[0m`;
const gray = text => `\x1b[38;2;178;178;178m${text}\x1b[0m`;
const yellow = text => `\x1b[38;2;255;255;106m${text}\x1b[0m`;
const orange = text => `\x1b[38;2;255;153;0m${text}\x1b[0m`;
const darkGreen = text => `\x1b[38;2;0;153;0m${text}\x1b[0m`;
const brightGreen = text => `\x1b[38;2;0;204;0m${text}\x1b[0m`;

const aoc = brightGreen(`Advent of Code ${YEAR}`);
const author = orange(USER);
const stars = yellow(`${STARS} stars so far`);

function formatTime([sec, nanosec]) {
  const ms = Math.round((sec * 1e9 + nanosec) / 1e6);

  if (ms < 1000) {
    return brightGreen(`${ms} ms`);
  } else if (ms < 1500) {
    return darkGreen(`${ms} ms`);
  } else {
    return darkGreen(`${ms / 1e3} sec`);
  }
}

function executeAssignment({ filename, title }) {
  return new Promise((res, rej) => {
    const child = spawn('node', [`./${filename}`]);
    let output = '';
    let dots = '';

    const time = process.hrtime();
    process.stdout.write(`${title} ${dots}`);

    title = white(title);

    let tmrID = setInterval(() => {
      dots += '.';
      process.stdout.write(`\r${title} ${dots}`);
    }, 1000);

    child.stdout.on('data', data => (output += data));
    child.on('error', err => rej(err));
    child.on('close', () => {
      clearInterval(tmrID);

      console.log(`\r${title}  [${formatTime(process.hrtime(time))}]`);
      console.log(
        output
          .split('\n')
          .filter(x => x)
          .map(line => {
            const [desc, answer] = line.split(':');
            if (!answer) {
              return `  ${gray(desc)}`;
            }
            return `  ${gray(desc)}:${yellow(answer)}`;
          })
          .join('\n') + '\n'
      );
      res();
    });
  });
}

const startedAt = process.hrtime();

assignments
  .reduce(
    (p, assignment) => p.then(() => executeAssignment(assignment)),
    Promise.resolve()
  )
  .then(() => {
    const [sec, nanosec] = process.hrtime(startedAt);
    const totalTime = darkGreen(sec + '.' + Math.round(nanosec / 1e6));

    console.log(`${author} completed ${stars} in ${aoc}.`);
    console.log(`Completed assignments computed in ${totalTime} seconds`);
  });
