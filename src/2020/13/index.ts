import { run } from '../utils/index';

type Input = {
  timestamp: number;
  ids: any[];
};

export const formatInput = (input: string): Input => {
  const [timestamp, ids] = input.replace(/\n$/, '').split('\n');
  return {
    timestamp: Number(timestamp),
    ids: ids.split(',').map(Number),
  };
};

export const partOne = ({ ids, timestamp }: any): any =>
  ids
    .filter(id => !isNaN(id))
    .map(id => ({
      id,
      waitingTime: Math.ceil(timestamp / id) * id - timestamp,
    }))
    .sort((a, b) => a.waitingTime - b.waitingTime)
    .slice(0, 1)
    .reduce((_, { id, waitingTime }) => Number(id) * waitingTime, null);

export const partTwo = ({ ids }: Input): number => {
  let time = ids[0];
  let delta = ids[0];
  for (let i = 1; i < ids.length; i++) {
    const id = ids[i];
    if (isNaN(id)) continue;
    while ((time + i) % id) {
      time += delta;
    }
    delta *= id;
  }
  return time;
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '13/input.txt', partOne, partTwo, formatInput });
}
