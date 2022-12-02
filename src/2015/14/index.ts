import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { max } from 'lodash';

type ReindeerStats = {
  velocity: number;
  movingTime: number;
  restingTime: number;
};

export const parseInput = (
  input: string,
): {
  [reindeer: string]: ReindeerStats;
} =>
  input.split('\n').reduce((acc, line) => {
    const [, reindeer, velocity, movingTime, restingTime] = line.match(
      /^(\w+).*\s(\d+)\s.*\s(\d+)\s.*\s(\d+)\s/,
    );
    return {
      ...acc,
      [reindeer]: {
        velocity: Number(velocity),
        movingTime: Number(movingTime),
        restingTime: Number(restingTime),
      },
    };
  }, {});

const calculateTravelledDistance = ({
  velocity,
  movingTime,
  restingTime,
  totalTime,
}: ReindeerStats & { totalTime: number }) => {
  const slotTime = movingTime + restingTime;
  const movingTimeSlotsCount = Math.ceil(totalTime / slotTime);

  const totalMovingTime =
    totalTime - (movingTimeSlotsCount - 1) * totalTime > movingTime
      ? movingTimeSlotsCount * movingTime
      : 0;

  return totalMovingTime * velocity;
};

export const partOne: SolutionFunction | any = pipe(
  parseInput,
  input =>
    Object.keys(input).map(reindeer =>
      calculateTravelledDistance({ ...input[reindeer], totalTime: 2503 }),
    ),
  max,
);

export const partTwo: SolutionFunction = pipe(parseInput, input => {
  return 0;
});
