---
to: src/<%= year%>/<%= day%>/index.ts
---
import * as R from 'remeda';
import fs from 'fs';
import path from 'path';

const example = ``;

const input =
  example || fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8');

export const parseInput = (input: string) => input.split('\n');

export const partOne = R.pipe(input, parseInput, input => {});

export const partTwo = R.pipe(input, parseInput, input => {});