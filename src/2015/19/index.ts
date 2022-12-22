import { pipe } from 'ramda';

export const parseInput = (input: string) => {
  const [rawReplacements, formula] = input.split('\n\n');

  const replacements = rawReplacements.split('\n').reduce((acc, line) => {
    const [from, to] = line.split(' => ');
    return { ...acc, [from]: [...(acc[from] || []), to] };
  }, {});
  return { replacements, formula };
};

export const partOne = pipe(parseInput, ({ replacements, formula }) => {
  let match: RegExpExecArray | null;
  let matches = [];
  while ((match = /([a-zA-Z][a-z]*)/g.exec(formula)) !== null) {
    matches.push(match);
  }
  return new Set([
    ...matches.reduce((data, entry) => {
      const index = entry.index;
      const element = entry[0];
      if (replacements[element]) {
        replacements[element].forEach(replacement => {
          data.push(`${formula}`.splice(index, element.length, replacement));
        });
      }
      return data;
    }, []),
  ]).size;
});

export const partTwo = pipe(parseInput, ({ replacements, formula }) => {
  const reverse = Object.keys(replacements).reduce((table, replacement) => {
    replacements[replacement].forEach((element: any) => {
      table.set(element, replacement);
    });
    return table;
  }, new Map());

  let total = 0;

  while (formula !== 'e') {
    for (const [element, replacement] of reverse.entries()) {
      if (formula.includes(element)) {
        formula = formula.replace(element, replacement);
        total += 1;
      }
    }
  }
  return total;
});
