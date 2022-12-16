import { pipe, range } from 'ramda';

const DEBUG = false;

export const parseInput = (input: string) =>
  input
    .split('\n')
    .map(line =>
      line.match(
        /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)$/,
      ),
    )
    .map(([, x, y, bx, by]) => ({
      sensorX: Number(x),
      sensorY: Number(y),
      beaconX: Number(bx),
      beaconY: Number(by),
      sensorRadius:
        Math.abs(Number(x) - Number(bx)) + Math.abs(Number(y) - Number(by)),
    }))
    .reduce(
      (acc, observation) => {
        acc.observations.push(observation);
        acc.beacons.add(`${observation.beaconX},${observation.beaconY}`);
        return acc;
      },
      { observations: [], beacons: new Set<string>() },
    );

export const example = DEBUG
  ? `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`
  : undefined;

export const partOne = pipe(parseInput, ({ observations, beacons }) => {
  const y = DEBUG ? 10 : 2000000;
  const hashes = new Set();
  for (const { sensorX, sensorY, sensorRadius } of observations) {
    const distanceFromSensorToLine = Math.abs(sensorY - y);
    if (distanceFromSensorToLine <= sensorRadius) {
      range(
        sensorX - (sensorRadius - distanceFromSensorToLine),
        sensorX + (sensorRadius - distanceFromSensorToLine) + 1,
      ).forEach(x => {
        const coordinates = `${x},${y}`;
        if (!beacons.has(coordinates)) {
          hashes.add(coordinates);
        }
      });
    }
  }
  return hashes.size;
});

// Unfinished
// ---
// The idea was to find the coordinates of the outer ring of the sensor,
// because if the solution is unique, then the coordinate has to be a point
// located on one of those outer rings.
// ---
// The script was still iterating on a wild number of coordinates, so instead
// I went with another approach, simpler, which was to iterate on each line,
// check the first coordinate, and then increment by not one, but to the
// nearest x out of range of present sensor. See index.ts.

export const partTwo = pipe(parseInput, ({ observations, beacons }) => {
  const MAX = DEBUG ? 20 : 4000000;
  const outterRingCoordinates = {};
  let i = 0;

  observations.map(({ sensorX, sensorY, sensorRadius }) => {
    for (
      let x = sensorX - (sensorRadius + 1);
      x <= sensorX + (sensorRadius + 1);
      x++
    ) {
      i++;
      const upperY = sensorY + (sensorRadius + 1 - Math.abs(x - sensorX));
      const lowerY = sensorY - (sensorRadius + 1 - Math.abs(x - sensorX));

      if (i % 1000000 === 0) {
        console.log(i);
      }

      if (!beacons.has(`${x},${upperY}`)) {
        outterRingCoordinates[`${x},${upperY}`] = true;
      }

      if (!beacons.has(`${x},${lowerY}`)) {
        outterRingCoordinates[`${x},${upperY}`] = true;
      }
    }
  });

  for (let outterRingCoordinate in outterRingCoordinates) {
    let [x, y] = (outterRingCoordinate as string).split(',').map(Number);

    if (x < 0 || y < 0 || x > MAX || y > MAX) {
      outterRingCoordinates[outterRingCoordinate] = false;
    } else {
      for (const { sensorX, sensorY, sensorRadius } of observations) {
        const distanceFromSensor =
          Math.abs(x - sensorX) + Math.abs(y - sensorY);
        if (distanceFromSensor <= sensorRadius) {
          outterRingCoordinates[outterRingCoordinate] = false;
        }
      }
    }
  }

  return outterRingCoordinates;
});
