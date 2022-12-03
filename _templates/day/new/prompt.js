require('dotenv').config();
const process = require('process');
const axios = require('axios');
const { promises: fs } = require('fs');
const path = require('path');

const fetchInput = async ({ year, day }) => {
  const { data } = await axios.get(
    `https://adventofcode.com/${year}/day/${Number(day)}/input`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=UTF-8',
        Cookie: `session=${process.env.AOC_SESSION}`,
      },
    },
  );

  try {
    await fs.mkdir(
      path.join(__dirname, `../../../src/${year}/${day.padStart(2, '0')}`),
    );
  } catch (err) {}
  await fs.writeFile(
    path.join(
      __dirname,
      `../../../src/${year}/${day.padStart(2, '0')}/input.txt`,
    ),
    data.trim(),
  );
};

module.exports = {
  prompt: ({ prompter }) => {
    return new Promise(async resolve => {
      if (process.argv.includes('--day')) {
        const day = process.argv[process.argv.indexOf('--day') + 1].padStart(
          2,
          '0',
        );
        const year =
          process.argv[process.argv.indexOf('--year') + 1] ||
          new Date().getFullYear();
        await generateInput({ day, year });
        return resolve({
          day,
          year,
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
          day = day.padStart(2, '0');
          await generateInput({ day, year });
          resolve({
            day,
            year,
          });
        });
    });
  },
};
