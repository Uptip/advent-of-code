import { run } from '../utils/index';

export const formatInput = (input: string): any =>
  input
    .replace(/\n$/, '')
    .split('\n')
    .map(line => {
      const [direction, ...rest] = [...line];
      return { direction, value: Number(rest.join('')) };
    });

const cardinalDirection = ['N', 'E', 'S', 'W'];
const turnDirections = ['L', 'R'];

export const partOne = (input: any): any => {
  const output = input.reduce(
    ({ heading, north, east }, { direction, value }) => {
      if (turnDirections.includes(direction)) {
        return {
          north,
          east,
          heading:
            cardinalDirection[
              (4 +
                (cardinalDirection.indexOf(heading) +
                  ((2 * turnDirections.indexOf(direction) - 1) * value) / 90)) %
                4
            ],
        };
      }

      const newDirection = direction === 'F' ? heading : direction;
      return {
        heading,
        north:
          north +
          (newDirection === 'N' ? 1 : newDirection === 'S' ? -1 : 0) * value,
        east:
          east +
          (newDirection === 'E' ? 1 : newDirection === 'W' ? -1 : 0) * value,
      };
    },
    { east: 0, north: 0, heading: 'E' },
  );

  return Math.abs(output.east) + Math.abs(output.north);
};

export const partTwo = (input: any): any => {
  const output = input.reduce(
    ({ shipPosition, waypointPosition }, { direction, value }, index) => {
      if (direction === 'F') {
        return {
          waypointPosition,
          shipPosition: {
            north: shipPosition.north + value * waypointPosition.north,
            east: shipPosition.east + value * waypointPosition.east,
          },
        };
      }

      if (turnDirections.includes(direction)) {
        const angle =
          (((2 * turnDirections.indexOf(direction) - 1) * Math.PI) / -180) *
          value;
        return {
          shipPosition,
          waypointPosition: {
            east: Math.round(
              waypointPosition.east * Math.cos(angle) -
                waypointPosition.north * Math.sin(angle),
            ),
            north: Math.round(
              waypointPosition.east * Math.sin(angle) +
                waypointPosition.north * Math.cos(angle),
            ),
          },
        };
      }

      if (cardinalDirection.includes(direction)) {
        return {
          shipPosition,
          waypointPosition: {
            north:
              waypointPosition.north +
              (direction === 'N' ? 1 : direction === 'S' ? -1 : 0) * value,
            east:
              waypointPosition.east +
              (direction === 'E' ? 1 : direction === 'W' ? -1 : 0) * value,
          },
        };
      }

      return {
        shipPosition,
        waypointPosition,
      };
    },
    {
      shipPosition: {
        north: 0,
        east: 0,
      },
      waypointPosition: {
        east: 10,
        north: 1,
      },
    },
  );

  return (
    Math.abs(output.shipPosition.east) + Math.abs(output.shipPosition.north)
  );
};

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '12/input.txt', partOne, partTwo, formatInput });
}
