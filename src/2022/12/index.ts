import { pipe, times } from 'ramda';
import { alg, Graph } from 'graphlib';

const ELEVATIONS = 'SabcdefghijklmnopqrstuvwxyzE';

export const parseInput = (input: string) =>
  input.split('\n').map(line => line.split(''));

const generateGraph = (input: string[][], partTwo?: boolean) => {
  let startCoordinates = '';
  let endCoordinates = '';
  const graph = new Graph({ directed: true });

  times(y => {
    times(x => {
      const elevation = ELEVATIONS.indexOf(input[y][x]);
      const coordinates = `${x},${y}`;

      if (input[y][x] === 'S') {
        startCoordinates = coordinates;
      }

      if (input[y][x] === 'E') {
        endCoordinates = coordinates;
      }

      graph.setNode(coordinates, input[y][x]);

      [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ].forEach(([dx, dy]) => {
        const neighborCoordinates = `${x + dx},${y + dy}`;

        if (!input[y + dy] || !input[y + dy][x + dx]) {
          return;
        }

        const neighborElevation = ELEVATIONS.indexOf(input[y + dy][x + dx]);

        if (neighborElevation <= elevation + 1) {
          graph.setNode(neighborCoordinates, neighborElevation);

          if (partTwo) {
            graph.setEdge(neighborCoordinates, coordinates);
          } else {
            graph.setEdge(coordinates, neighborCoordinates);
          }
        }
      });
    }, input[0].length);
  }, input.length);

  return {
    input,
    graph,
    startCoordinates,
    endCoordinates,
  };
};

export const partOne = pipe(
  parseInput,
  generateGraph,
  ({ startCoordinates, endCoordinates, graph }) =>
    alg.dijkstra(graph, startCoordinates)[endCoordinates].distance,
);

export const partTwo = pipe(
  parseInput,
  input => generateGraph(input, true),
  ({ input, endCoordinates, graph }) =>
    Object.entries(alg.dijkstra(graph, endCoordinates)).reduce(
      (shortest, [coordinates, { distance }]) => {
        const [x, y] = coordinates.split(',').map(Number);
        return Math.min(shortest, input[y][x] !== 'a' ? Infinity : distance);
      },
      Infinity,
    ),
);
