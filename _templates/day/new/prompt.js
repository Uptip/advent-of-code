require('dotenv').config();
const process = require('process');
const axios = require('axios');
const { promises: fs } = require('fs');
const path = require('path');

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise(resolve => {
      if (process.argv.includes('--day')) {
        return resolve({
          day: process.argv[process.argv.indexOf('--day') + 1].padStart(2, '0'),
          year:
            process.argv[process.argv.indexOf('--year') + 1] ||
            new Date().getFullYear(),
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
          const { data } = await axios.get(
            `https://adventofcode.com/${year}/day/${Number(day)}/input`,
            {
              headers: {
                'Content-Type': 'text/plain; charset=UTF-8',
                Cookie: `session=${process.env.AOC_SESSION}`,
              },
            },
          );

          await fs.writeFile(
            path.join(
              __dirname,
              `../../../src/${year}/${day.padStart(2, '0')}/input.txt`,
            ),
            data.trim(),
          );

          resolve({
            day: day.padStart(2, '0'),
            year,
          });
        });
    });
  },
};
