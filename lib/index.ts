import process from 'process';
import { run } from './utils';

const launch = async () => {
  const dayArgIndex = process.argv.indexOf('--day');
  const yearArgIndex = process.argv.indexOf('--year');

  if (dayArgIndex === -1 && yearArgIndex > -1) {
    console.log(``);
    console.log(`\x1b[31m⚠️  Missing parameter --day.\x1b[0m`);
    console.log(``);
    console.log(`   Usage : pnpm dev --day 01 for day 1.\x1b[0m`);
    process.exit(0);
  }

  let day: string;
  let year: string;

  if (dayArgIndex === -1 && yearArgIndex === -1) {
    day = `${new Date().getDate()}`.padStart(2, '0');
    year = `${new Date().getFullYear()}`;
  }

  day = process.argv[dayArgIndex + 1].padStart(2, '0');
  year = process.argv[yearArgIndex + 1] ?? `${new Date().getFullYear()}`;

  try {
    await import(`../src/${year}/${day}/index.ts`);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.log(``);
      console.log(`⚠️  \x1b[31mNo files exist for day ${day}.\x1b[0m`);
      console.log(
        `   Try running \x1b[34mpnpm generate\x1b[0m, and start again`,
      );
    } else {
      throw err;
    }
  }
};

launch();
