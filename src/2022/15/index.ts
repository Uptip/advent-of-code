import { setWith, min, max, range } from 'lodash';
import { pipe } from 'ramda';

const manhattan = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(Number(x1) - Number(x2)) + Math.abs(Number(y1) - Number(y2));

export const parseInput = (input: string) =>
  input
    .split('\n')
    .map(line =>
      line.match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
      ),
    )
    .map(line => line.map(Number))
    .reduce(
      (acc, [, sensorX, sensorY, beaconX, beaconY]) => {
        const radius = manhattan(sensorX, sensorY, beaconX, beaconY);
        setWith(acc.grid, [sensorY, sensorX], 'S', Object);
        setWith(acc.grid, [beaconY, beaconX], 'B', Object);
        acc.sensors.push({ x: sensorX, y: sensorY, radius });
        acc.minX = min([acc.minX, sensorX - radius, beaconX - radius]);
        acc.maxX = max([acc.maxX, sensorX + radius, beaconX + radius]);
        return acc;
      },
      {
        grid: {},
        sensors: [],
        minX: Infinity,
        maxX: 0,
      },
    );

const TARGET = 2000000;
export const partOne = pipe(parseInput, ({ grid, sensors, minX, maxX }) =>
  range(minX, maxX + 1).reduce(
    (acc, x) =>
      !grid[TARGET][x] &&
      sensors.some(s => manhattan(s.x, s.y, x, TARGET) <= s.radius)
        ? acc + 1
        : acc,
    0,
  ),
);

const MAX_RANGE = 4000000;
export const partTwo = pipe(parseInput, ({ grid, sensors }) => {
  for (let y = 0; y < MAX_RANGE; y++) {
    if (!grid?.[y]) {
      grid[y] = {};
    }
    let x = 0;
    while (x <= MAX_RANGE) {
      const sensor = sensors.find(
        sensor => manhattan(sensor.x, sensor.y, x, y) <= sensor.radius,
      );
      if (sensor) {
        x = sensor.x + sensor.radius - Math.abs(sensor.y - y) + 1;
      } else {
        return x * 4000000 + y;
      }
    }
  }
});
