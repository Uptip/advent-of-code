import { pipe, sum } from 'ramda';

const parseInput = (
  input: string,
): {
  tree: Record<string, number>;
  folders: Set<string>;
  pwd: string[];
} =>
  input.split('\n').reduce(
    (acc, line) => {
      if (line.startsWith('$')) {
        if (line.startsWith('$ cd ')) {
          const relativePath = line.slice(5);
          let pwd: string[] = [];
          if (relativePath === '/') {
            pwd = [];
          } else if (relativePath === '..') {
            pwd = acc.pwd.slice(0, -1);
          } else {
            pwd = [...acc.pwd, relativePath];
          }

          return {
            ...acc,
            pwd,
            folders: new Set([...acc.folders, pwd.join('/')]),
          };
        }
      } else {
        if (!line.startsWith('dir')) {
          const [size, name] = line.split(' ');
          return {
            ...acc,
            tree: {
              ...acc.tree,
              [[...acc.pwd, name].join('/')]: Number(size),
            },
          };
        }
      }

      return acc;
    },
    {
      tree: {},
      folders: new Set<string>(),
      pwd: [],
    },
  );

const calculateFolderSize = (tree: any, folder: string) =>
  Object.keys(tree)
    .filter(path => path.startsWith(folder))
    .map(path => tree[path])
    .reduce((acc, size) => acc + size, 0);

export const partOne = pipe(parseInput, ({ tree, folders }) =>
  [...folders].reduce((acc, folder) => {
    const folderSize = calculateFolderSize(tree, folder);

    if (folderSize <= 100000) {
      return acc + folderSize;
    }

    return acc;
  }, 0),
);

export const partTwo = pipe(parseInput, ({ tree, folders }) => {
  const neededSpace = 30000000 - (70000000 - sum(Object.values(tree)));

  return [...folders]
    .reduce(
      (acc, folder) => [
        ...acc,
        { path: folder, size: calculateFolderSize(tree, folder) },
      ],
      [],
    )
    .filter(({ size }) => size >= neededSpace)
    .sort((a, b) => a.size - b.size)[0].size;
});
