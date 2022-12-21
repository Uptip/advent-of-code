import { entries, setWith } from 'lodash';
import { clone, keys, pipe } from 'ramda';
import { bfs } from '../../utils/bfs';

const calculateFlows = (
  distances: { [key: string]: { [key: string]: number } },
  valve: string,
  remainingMinutes: number,
  remainingValves: string[],
  opened = {},
) => {
  const flows = [opened];

  remainingValves.forEach((remainingValve, index: number) => {
    const nextRemainingMinutes =
      remainingMinutes - distances[valve][remainingValve] - 1;

    if (nextRemainingMinutes < 1) {
      return;
    }

    const nextOpened = clone(opened);
    nextOpened[remainingValve] = nextRemainingMinutes;

    const nextLeft = [...remainingValves];
    nextLeft.splice(index, 1);

    flows.push(
      ...calculateFlows(
        distances,
        remainingValve,
        nextRemainingMinutes,
        nextLeft,
        nextOpened,
      ),
    );
  });

  return flows;
};

export const parseInput = pipe(
  (input: string) =>
    input.split('\n').reduce(
      ({ graph, flows }, line) => {
        const [, valve, rawFlow, rawTunnels] = line
          .replace(/,/g, '')
          .match(
            /Valve (\w+) has flow rate=(\d+); tunnels{0,1} leads{0,1} to valves{0,1} ((\w+\s?)+)$/,
          );

        const flow = Number(rawFlow);
        const tunnels = rawTunnels.split(' ');

        return {
          graph: {
            ...graph,
            [valve]: tunnels,
          },
          flows: {
            ...flows,
            [valve]: flow,
          },
        };
      },
      { graph: {}, flows: {} },
    ),
  ({ graph, flows }) => {
    const distances = {};
    keys(graph).forEach(start => {
      keys(graph).forEach(end => {
        setWith(
          distances,
          `[${start}][${end}]`,
          bfs(graph, start, end).length - 1,
          Object,
        );
      });
    });

    return { graph, flows, distances };
  },
);

export const partOne = pipe(
  parseInput,
  ({ graph, flows, distances }) =>
    calculateFlows(
      distances,
      'AA',
      30,
      keys(graph).filter(valve => Boolean(flows[valve])),
    )
      .map(path =>
        entries(path).reduce(
          (acc, [key, value]: [string, number]) => acc + flows[key] * value,
          0,
        ),
      )
      .sort((a, b) => b - a)[0],
);

export const partTwo = pipe(parseInput, ({ graph, flows, distances }) => {
  const scores = calculateFlows(
    distances,
    'AA',
    26,
    keys(graph).filter(valve => Boolean(flows[valve])),
  ).reduce((acc, rate) => {
    const key = keys(rate).sort().join(',');
    const score = entries(rate).reduce(
      (acc, [key, value]: [string, number]) => acc + flows[key] * value,
      0,
    );

    return {
      ...acc,
      [key]: Math.max(acc[key] || -Infinity, score),
    };
  });

  let highest = -Infinity;

  Object.keys(scores).forEach(player => {
    Object.keys(scores).forEach(elephant => {
      const valves = player.split(',').concat(elephant.split(','));
      const deduped = [...new Set(valves)];

      if (deduped.length === valves.length)
        highest = Math.max(scores[player] + scores[elephant], highest);
    });
  });

  return highest;
});
