import * as R from 'remeda';
import fs from 'fs';
import path from 'path';

const example = ``;

const processPolymer = (polymer: string) => {
  const regex =
    /aA|bB|cC|dD|eE|fF|gG|hH|iI|jJ|kK|lL|mM|nN|oO|pP|qQ|rR|sS|tT|uU|vV|wW|xX|yY|zZ|Aa|Bb|Cc|Dd|Ee|Ff|Gg|Hh|Ii|Jj|Kk|Ll|Mm|Nn|Oo|Pp|Qq|Rr|Ss|Tt|Uu|Vv|Ww|Xx|Yy|Zz/g;

  if (!regex.test(polymer)) {
    return polymer;
  }

  return processPolymer(polymer.replace(regex, ''));
};

const input =
  example || fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8').trim();

export const partOne = R.pipe(input, input => processPolymer(input).length);

export const partTwo = R.pipe(input, input => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return alphabet.reduce((acc, letter) => {
    const localRegex = new RegExp(letter, 'gi');
    const localLength = processPolymer(input).replace(localRegex, '').length;
    return Math.min(acc, localLength);
  }, Infinity);
});
