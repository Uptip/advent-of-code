import { times } from 'lodash';
import { pipe } from 'ramda';

export const parseInput = (
  input: string,
): {
  initialState: { [key: string]: string[] };
  moves: { quantity: number; from: number; to: number }[];
} => {
  const source = input.split('\n\n')[0].split('\n').slice(0, -1);
  let initialState = {};

  times((source[0].length + 1) / 4).forEach(i => {
    times(source.length).map(j => {
      initialState[i + 1] = [
        source[j][4 * i + 1],
        ...(initialState[i + 1] || []),
      ].filter(crate => crate !== ' ');
    });
  });

  const moves = input
    .split('\n\n')[1]
    .split('\n')
    .map(line => {
      const [, quantity, from, to] = line.match(
        /^move (\d+) from (\d+) to (\d+)/,
      );
      return {
        quantity: Number(quantity),
        from: Number(from),
        to: Number(to),
      };
    });

  return { initialState, moves };
};

export const partOne = pipe(
  parseInput,
  ({ initialState, moves }) =>
    moves.reduce((state, { quantity, from, to }) => {
      times(quantity).forEach(() => {
        state[to].push(state[from][state[from].length - 1]);
        state[from].pop();
      });
      return state;
    }, initialState),
  values =>
    Object.values(values)
      .map(arr => arr[arr.length - 1])
      .join(''),
);

export const partTwo = pipe(
  parseInput,
  ({ initialState, moves }) =>
    moves.reduce((state, { quantity, from, to }) => {
      state[to] = [...state[to], ...state[from].slice(-quantity)];
      state[from] = state[from].slice(0, -quantity);
      return state;
    }, initialState),
  values =>
    Object.values(values)
      .map(arr => arr[arr.length - 1])
      .join(''),
);
