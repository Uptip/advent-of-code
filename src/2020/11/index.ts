import { run, range as times } from '../utils/index';

type StateCalculationInput = {
  input: string[][];
  occupiedSeatsThreshold: number;
  cellStateCalculationFunction: Function;
};

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const formatInput = (input: string): string[][] =>
  input
    .replace(/\n$/, '')
    .split('\n')
    .map(line => line.split(''));

const getAdjacentSeats = ({ row, column, input }) =>
  range(Math.max(row - 1, 0), Math.min(row + 1, input.length - 1))
    .flatMap(row =>
      range(
        Math.max(column - 1, 0),
        Math.min(column + 1, input[0].length - 1),
      ).map(column => [row, column]),
    )
    .filter(([y, x]) => y !== row || x !== column)
    .map(([y, x]) => input[y][x]);

const getVisibleSeats = ({ row, column, input }) => {
  const slopes = range(-1, 1)
    .flatMap(y => range(-1, 1).map(x => [y, x]))
    .filter(([y, x]) => Boolean(y) || Boolean(x));

  const getSlopeVisibleSeat = ({ row, column, input, slope }) => {
    try {
      const cell = input[row + slope[0]][column + slope[1]];
      if (cell !== '.') return cell;
      return getSlopeVisibleSeat({
        row: row + slope[0],
        column: column + slope[1],
        input,
        slope,
      });
    } catch (err) {
      return '.';
    }
  };

  return slopes.map(slope =>
    getSlopeVisibleSeat({ row, column, input, slope }),
  );
};

enum CellState {
  Empty,
  Floor,
  Occupied,
}

const getState = (cell: string): CellState => {
  switch (cell) {
    case 'L':
      return CellState.Empty;
    case '#':
      return CellState.Occupied;
    case '.':
      return CellState.Floor;
  }
};

const getNextCellState = ({
  row,
  column,
  input,
  cellStateCalculationFunction,
  occupiedSeatsThreshold,
}) => {
  switch (getState(input[row][column])) {
    case CellState.Empty:
      return !cellStateCalculationFunction({ row, column, input }).find(
        cell => cell === '#',
      )
        ? '#'
        : 'L';
    case CellState.Occupied:
      return cellStateCalculationFunction({ row, column, input }).filter(
        cell => cell === '#',
      ).length >= occupiedSeatsThreshold
        ? 'L'
        : '#';
    case CellState.Floor:
    default:
      return '.';
  }
};

const getNextState = ({
  input,
  occupiedSeatsThreshold,
  cellStateCalculationFunction,
}): string[][] =>
  times(input.length).map(row =>
    times(input[row].length).map(column =>
      getNextCellState({
        row,
        column,
        input,
        occupiedSeatsThreshold,
        cellStateCalculationFunction,
      }),
    ),
  );

const flattenState = (input: string[][]): string =>
  input.map(row => row.join('')).join('\n');

const statesAreEqual = (a: string[][], b: string[][]): Boolean =>
  flattenState(a) === flattenState(b);

const getStableStateOccupiedSeats = ({
  input,
  occupiedSeatsThreshold,
  cellStateCalculationFunction,
}: StateCalculationInput): number => {
  while (true) {
    const nextInput = getNextState({
      input,
      occupiedSeatsThreshold,
      cellStateCalculationFunction,
    });
    if (statesAreEqual(input, nextInput)) break;
    input = nextInput;
  }
  return (
    flattenState(
      getNextState({
        input,
        occupiedSeatsThreshold,
        cellStateCalculationFunction,
      }),
    ).match(/#/g) || []
  ).length;
};

export const partOne = (input: string[][]): number =>
  getStableStateOccupiedSeats({
    input,
    occupiedSeatsThreshold: 4,
    cellStateCalculationFunction: getAdjacentSeats,
  });

export const partTwo = (input: string[][]): any =>
  getStableStateOccupiedSeats({
    input,
    occupiedSeatsThreshold: 5,
    cellStateCalculationFunction: getVisibleSeats,
  });

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '11/input.txt', partOne, partTwo, formatInput });
}
