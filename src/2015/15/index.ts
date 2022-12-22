import { pipe } from 'ramda';
import { sum } from 'lodash';

export const parseInput = (input: string) =>
  input.split('\n').map(line => {
    const [, ingredient, capacity, durability, flavor, texture, calories] =
      line.match(
        /^(\w+):.*\s(-?\d+),.*\s(-?\d+),.*\s(-?\d+),.*\s(-?\d+),.*\s(-?\d+)/,
      );

    return {
      ingredient,
      capacity: Number(capacity),
      durability: Number(durability),
      flavor: Number(flavor),
      texture: Number(texture),
      calories: Number(calories),
    };
  });

const calculate = (
  input: {
    ingredient: string;
    capacity: number;
    durability: number;
    flavor: number;
    texture: number;
    calories: number;
  }[],
  part = 1,
) => {
  let maxScore = -Infinity;
  for (let i = 0; i <= 100; i++) {
    for (let j = 0; j <= 100 - i; j++) {
      for (let k = 0; k <= 100 - i - j; k++) {
        const l = 100 - i - j - k;

        const capacity = sum([
          i * input[0].capacity,
          j * input[1].capacity,
          k * input[2].capacity,
          l * input[3].capacity,
        ]);

        const durability = sum([
          i * input[0].durability,
          j * input[1].durability,
          k * input[2].durability,
          l * input[3].durability,
        ]);

        const flavor = sum([
          i * input[0].flavor,
          j * input[1].flavor,
          k * input[2].flavor,
          l * input[3].flavor,
        ]);

        const texture = sum([
          i * input[0].texture,
          j * input[1].texture,
          k * input[2].texture,
          l * input[3].texture,
        ]);

        if (
          part === 2 &&
          i * input[0].calories +
            j * input[1].calories +
            k * input[2].calories +
            l * input[3].calories !==
            500
        ) {
          continue;
        }

        maxScore = Math.max(
          maxScore,
          Math.max(0, capacity) *
            Math.max(0, durability) *
            Math.max(0, flavor) *
            Math.max(0, texture),
        );
      }
    }
  }

  return maxScore;
};

export const partOne = pipe(parseInput, input => calculate(input, 1));

export const partTwo = pipe(parseInput, input => calculate(input, 2));
