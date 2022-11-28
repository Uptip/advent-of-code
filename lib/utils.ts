import { promises as fs } from 'fs';
import path from 'path';

export const loadFile = async (fileName: string): Promise<string> => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, '..', 'src', fileName),
      'utf-8',
    );
    return data;
  } catch (err) {
    console.log('Error loading file');
    return '';
  }
};

export const run = async ({
  pathToInput,
  partOne,
  partTwo,
}: {
  pathToInput: string;
  partOne: (input: string) => number;
  partTwo: (input: string) => number;
}): Promise<void> => {
  const fileContent = await loadFile(pathToInput);

  console.time(`\x1b[2mTotal time\x1b[0m`);

  console.time(`\x1b[2mPart one time\x1b[0m`);
  console.log(``);
  console.log(`🎄 Answer one is \x1b[32m`, partOne(fileContent), '\x1b[0m');
  console.timeEnd(`\x1b[2mPart one time\x1b[0m`);

  console.log(``);

  console.time(`\x1b[2mPart two time\x1b[0m`);
  console.log(`🎄 Answer two is \x1b[32m`, partTwo(fileContent), '\x1b[0m');
  console.timeEnd(`\x1b[2mPart two time\x1b[0m`);

  console.log(``);
  console.timeEnd(`\x1b[2mTotal time\x1b[0m`);
  console.log(``);
};
