import { pipe } from 'ramda';
import { SolutionFunction } from '../../types';
import { max } from 'lodash';
import { range } from '../../2020/utils/index';

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
  const completeMovingTimeSlotsCount = Math.floor(totalTime / slotTime);
  const remainingMovingTime = Math.min(
    totalTime - completeMovingTimeSlotsCount * slotTime,
    movingTime,
  );
  const totalMovingTime =
    completeMovingTimeSlotsCount * movingTime + remainingMovingTime;
  return totalMovingTime * velocity;
};

export const partOne: SolutionFunction = pipe(
  parseInput,
  input =>
    Object.keys(input).map(reindeer =>
      calculateTravelledDistance({ ...input[reindeer], totalTime: 2503 }),
    ),
  max,
);

export const partTwo: SolutionFunction | any = pipe(
  parseInput,
  input =>
    range(2503)
      .map(i => i + 1)
      .map(totalTime =>
        Object.keys(input).map(reindeer => ({
          reindeer,
          distance: calculateTravelledDistance({
            ...input[reindeer],
            totalTime,
          }),
          totalTime,
        })),
      )
      .reduce((totalScores, secondScores) => {
        const sortedSecondScores = secondScores.sort(
          (a, b) => b.distance - a.distance,
        );
        const secondWinners = secondScores
          .filter(({ distance }) => distance === sortedSecondScores[0].distance)
          .map(({ reindeer }) => reindeer);
        secondWinners.forEach(reindeer => {
          totalScores[reindeer] = (totalScores[reindeer] ?? 0) + 1;
        });
        return totalScores;
      }, {}),
  (scores: { [reindeer: string]: number }) =>
    Object.values(scores).sort((a, b) => b - a)[0],
);
