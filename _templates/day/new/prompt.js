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
            name: 'day',
            message: 'Which day should we add?',
            initial: `${new Date().getDate()}`.padStart(2, '0'),
          },
          {
            type: 'select',
            name: 'extension',
            message: 'Which language would you like?',
            choices: ['JavaScript', 'TypeScript'],
          },
        ])
        .then(({ day, extension }) => {
          resolve({
            day: day.padStart(2, '0'),
            ext: extension === 'TypeScript' ? 'ts' : 'js',
          });
        });
    });
  },
};
