import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { allPermutations } from 'all-permutations';
import { max, min, sum } from 'lodash';

export const parseInput = (input: string) => {
  const distances = new Map<string, number>();
  const destinations = new Set<string>();

  input.split('\n').forEach(line => {
    const [, from, to, distance] = line.match(/(\w+) to (\w+) = (\d+)/);
    distances.set(`${from}-${to}`, Number(distance));
    distances.set(`${to}-${from}`, Number(distance));
    destinations.add(from);
    destinations.add(to);
  });

  return { distances, destinations };
};

const getAllPermutationsDistances = ({ distances, destinations }) =>
  allPermutations(destinations).map(destinations =>
    sum(
      destinations
        .reduce(
          (acc, curr) => [
            ...acc.slice(0, -1),
            acc.at(-1) && [acc.at(-1), curr],
            [curr],
          ],
          [],
        )
        .filter(route => route?.length > 1)
        .map(([from, to]) => distances.get(`${from}-${to}`)),
    ),
  );

export const partOne: SolutionFunction = pipe(
  parseInput,
  ({ distances, destinations }) =>
    min(getAllPermutationsDistances({ distances, destinations })),
);

export const partTwo: SolutionFunction = pipe(
  parseInput,
  ({ distances, destinations }) =>
    max(getAllPermutationsDistances({ distances, destinations })),
);
