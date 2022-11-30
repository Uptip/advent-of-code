import { promises as fs } from 'fs';
import path from 'path';

type Run = {
  pathToInput: string;
  formatInput: Function;
  partOne: Function;
  partTwo: Function;
  comment?: string;
};

export const loadFile = async (fileName: string): Promise<string> => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, '..', fileName),
      'utf-8',
    );
    return data;
  } catch (err) {}
};

export const range = (size: number): number[] => [...Array(size).keys()];

/* istanbul ignore next */
export const run = async ({
  pathToInput,
  formatInput,
  partOne,
  partTwo,
  comment,
}: Run): Promise<void> => {
  const suffix = Boolean(comment) ? ` (${comment})` : ``;
  const fileContent = await loadFile(pathToInput);
  const input = formatInput(fileContent);

  console.time(`Total time${suffix}`);

  console.time(`Part one time${suffix}`);
  console.log(`Answer one${suffix} is`, partOne(input));
  console.timeEnd(`Part one time${suffix}`);

  console.log(`—`);

  console.time(`Part two time${suffix}`);
  console.log(`Answer two${suffix} is`, partTwo(input));
  console.timeEnd(`Part two time${suffix}`);

  console.log(`—`);
  console.timeEnd(`Total time${suffix}`);
  console.log(`\n`);
};
