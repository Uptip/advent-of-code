import { last, pipe, times } from 'ramda';

export const parseInput = (
  input: string,
): {
  initialState: { [key: string]: string[] };
  moves: { quantity: number; from: number; to: number }[];
} => {
  const source = input.split('\n\n')[0].split('\n').slice(0, -1);
  let initialState = {};

  times(i => {
    times(j => {
      initialState[i + 1] = [
        source[j][4 * i + 1],
        ...(initialState[i + 1] || []),
      ].filter(crate => crate !== ' ');
    }, source.length);
  }, (source[0].length + 1) / 4);

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

const getTopCranes = (state: { [key: string]: string[] }) =>
  Object.values(state).map(last).join('');

export const partOne = pipe(
  parseInput,
  ({ initialState, moves }) =>
    moves.reduce((state, { quantity, from, to }) => {
      times(() => {
        state[to].push(state[from].pop());
      }, quantity);
      return state;
    }, initialState),
  getTopCranes,
);

export const partTwo = pipe(
  parseInput,
  ({ initialState, moves }) =>
    moves.reduce(
      (state, { quantity, from, to }) => ({
        ...state,
        [to]: [...state[to], ...state[from].slice(-quantity)],
        [from]: state[from].slice(0, -quantity),
      }),
      initialState,
    ),
  getTopCranes,
);
