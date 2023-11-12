import { pipe } from 'ramda';

export const parseInput = (input: string) =>
  input
    .split('\n')
    .map(line => {
      const [date, action] = line.replace('[', '').split('] ');
      return { date, action };
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .reduce(
      (acc, { date, action }) => {
        const [_, minute] = date.split(' ');
        if (action.includes('Guard')) {
          const [_, id] = action.split(' ');
          acc.currentGuard = id;
        }
        if (action.includes('falls')) {
          acc.currentSleep = Number(minute.replace(':', ''));
        }
        if (action.includes('wakes')) {
          const wake = Number(minute.replace(':', ''));
          if (!acc.guards[acc.currentGuard]) {
            acc.guards[acc.currentGuard] = [];
          }
          acc.guards[acc.currentGuard].push({
            start: acc.currentSleep,
            end: wake,
          });
        }
        return acc;
      },
      {
        currentGuard: '',
        currentSleep: 0,
        guards: {} as {
          id: string;
          sleeps: { start: number; end: number }[];
        },
      },
    );

export const partOne = pipe(parseInput, input => {
  const lazyGuardId = Object.entries(input.guards).reduce(
    (acc, [id, sleeps]: [string, { start: number; end: number }[]]) => {
      const total = sleeps.reduce((acc, { start, end }) => {
        return acc + (end - start);
      }, 0);
      if (total > acc.total) {
        acc.total = total;
        acc.id = id;
      }
      return acc;
    },
    { id: '', total: 0 },
  )?.id;

  const lazyGuard = input.guards[lazyGuardId];

  const minutes = lazyGuard.reduce((acc, { start, end }) => {
    for (let i = start; i < end; i++) {
      if (!acc[i]) {
        acc[i] = 0;
      }
      acc[i]++;
    }
    return acc;
  }, {} as { [key: number]: number });

  const mostSleepyMinute = Object.entries(minutes).reduce(
    (acc, [minute, count]) => {
      if (Number(count) > acc.count) {
        acc.count = Number(count);
        acc.minute = Number(minute);
      }
      return acc;
    },
    { minute: 0, count: 0 },
  )?.minute;

  return mostSleepyMinute * Number(lazyGuardId.replace('#', ''));
});

export const partTwo = pipe(parseInput, input => {
  const guardsMostSleepyMinute = Object.entries(input.guards).reduce(
    (acc, [id, sleeps]: [string, { start: number; end: number }[]]) => {
      return {
        ...acc,
        [id]: sleeps.reduce((acc, { start, end }) => {
          for (let i = start; i < end; i++) {
            if (!acc[i]) {
              acc[i] = 0;
            }
            acc[i]++;
          }
          return acc;
        }, {} as { [key: number]: number }),
      };
    },
  );

  const globalMostSleepyMinute = Object.entries(guardsMostSleepyMinute).reduce(
    (acc, [id, minutes]) => {
      const mostSleepyMinute = Object.entries(minutes).reduce(
        (acc, [minute, count]) => {
          if (Number(count) > acc.count) {
            acc.count = Number(count);
            acc.minute = Number(minute);
          }
          return acc;
        },
        { minute: 0, count: 0 },
      );
      if (mostSleepyMinute.count > acc.count) {
        acc.count = mostSleepyMinute.count;
        acc.minute = mostSleepyMinute.minute;
        acc.id = id;
      }
      return acc;
    },
    { id: '', minute: 0, count: 0 },
  );

  return (
    globalMostSleepyMinute.minute *
    Number(globalMostSleepyMinute.id.replace('#', ''))
  );
});
