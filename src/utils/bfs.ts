export const bfs = (
  grid: { [key: string]: string[] },
  starting: string,
  ending: string,
) => {
  const queue = [];
  const visited = [starting];

  if (starting === ending) {
    return [starting];
  }

  queue.push([starting]);

  while (queue.length > 0) {
    const path = queue.shift();
    const node = path[path.length - 1];

    for (let neighbor of grid[node]) {
      if (visited.includes(neighbor)) {
        continue;
      }
      if (neighbor === ending) {
        return path.concat([neighbor]);
      }

      visited.push(neighbor);
      queue.push(path.concat([neighbor]));
    }
  }

  return [];
};
