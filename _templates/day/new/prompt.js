require('dotenv').config();
const process = require('process');

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise(resolve => {
      if (process.argv.includes('--day')) {
        return resolve({
          day: process.argv[process.argv.indexOf('--day') + 1].padStart(2, '0'),
        });
      }

      prompter
        .prompt([
          {
            type: 'input',
            name: 'year',
            message: 'Year?',
            initial: new Date().getFullYear(),
          },
          {
            type: 'input',
            name: 'day',
            message: 'Which day should we add?',
            initial: `${new Date().getDate()}`.padStart(2, '0'),
          },
        ])
        .then(async ({ day, year }) => {
          const data = await fetch(
            `https://adventofcode.com/${year}/day/${Number(day)}/input`,
            {
              method: 'get',
              headers: {
                'Content-Type': 'text/plain',
                Cookie: `session=${process.env.AOC_SESSION}`,
              },
            },
          );
          const text = await data.text();

          resolve({
            day: day.padStart(2, '0'),
            year,
            text,
          });
        });
    });
  },
};
