import process from 'process';
import { run } from './utils';

const launch = async () => {
  const dayArgIndex = process.argv.indexOf('--day');

  if (dayArgIndex === -1) {
    console.log(``);
    console.log(`\x1b[31m⚠️  Missing parameter --day.\x1b[0m`);
    console.log(``);
    console.log(`   Usage : yarn dev --day 01 for day 1.\x1b[0m`);
    process.exit(0);
  }

  const day = process.argv[dayArgIndex + 1].padStart(2, '0');

  let loadedFile: any;
  try {
    try {
      loadedFile = require(`../src/${day}/index.js`);
    } catch (err) {
      try {
        loadedFile = require(`../src/${day}/index.ts`);
      } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
          console.log(``);
          console.log(`⚠️  \x1b[31mNo files exist for day ${day}.\x1b[0m`);
          console.log(
            `   Try running \x1b[34myarn generate\x1b[0m, and start again`,
          );
        }
      }
    }

    const { partOne, partTwo } = loadedFile;

    if (process.env.NODE_ENV !== 'test') {
      run({
        pathToInput: `${day}/input.txt`,
        partOne,
        partTwo,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

launch();
