import { pipe } from 'ramda';

export const parseInput = (input: string) =>
  input.split('\n').map(line => line.split('').map(Number));

export const partOne = pipe(parseInput, input => {
  let total = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const tree = input[i][j];

      if (
        i === 0 ||
        j === 0 ||
        i === input.length - 1 ||
        j === input[i].length - 1
      ) {
        total += 1;
        continue;
      }

      let blocked = false;
      for (let k = 0; k < i; k++) {
        if (input[k][j] >= tree) {
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        total += 1;
        continue;
      }

      blocked = false;
      for (let k = 0; k < i; k++) {
        if (input[i][k] >= tree) {
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        total += 1;
        continue;
      }

      blocked = false;
      for (let k = i + 1; k < input.length; k++) {
        if (input[k][j] >= tree) {
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        total += 1;
        continue;
      }

      blocked = false;
      for (let k = j + 1; k < input[0].length; k++) {
        if (input[i][k] >= tree) {
          blocked = true;
          break;
        }
      }
      if (!blocked) {
        total += 1;
        continue;
      }
    }
  }
  return total;
});

export const partTwo = pipe(parseInput, input => {
  let best = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      let score = { up: 0, down: 0, left: 0, right: 0 };

      for (let k = i - 1; k >= 0; k--) {
        score.up += 1;
        if (input[k][j] >= input[i][j]) {
          break;
        }
      }

      for (let k = j - 1; k >= 0; k--) {
        score.left += 1;
        if (input[i][k] >= input[i][j]) {
          break;
        }
      }

      for (let k = i + 1; k < input.length; k++) {
        score.down += 1;
        if (input[k][j] >= input[i][j]) {
          break;
        }
      }

      for (let k = j + 1; k < input[i].length; k++) {
        score.right += 1;
        if (input[i][k] >= input[i][j]) {
          break;
        }
      }

      best = Math.max(best, score.up * score.left * score.right * score.down);
    }
  }

  return best;
});
