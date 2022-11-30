import { run } from '../utils/index';

type Instructions = {
  [key: string]: any;
};

export const formatInput = (input: string): Instructions =>
  input
    .replace(/\n$/, '')
    .split('\n')
    .reduce((acc, instruction) => {
      const [color, content] = instruction.split(' bags contain ');
      return {
        ...acc,
        [color]: content
          .split(', ')
          .map(colorInstruction => {
            const [count, ...color] = colorInstruction
              .replace(/bag[s]?[\.]?$/, '')
              .split(' ');
            return !isNaN(Number(count))
              ? { count: Number(count), color: color.join(' ').trim() }
              : null;
          })
          .filter(Boolean),
      };
    }, {});

const getColorContents = ({ color, count, colors }) =>
  (colors[color] || []).flatMap(({ color }) => {
    console.log(color, count);
    return {
      color,
      content: (colors[color] || []).flatMap(({ color }) =>
        getColorContents({ color, count: 1, colors }),
      ),
    };
  });

export const partOne = (colors: Instructions): any =>
  Object.keys(colors)
    .map(color => ({
      color,
      content: getColorContents({ color, colors, count: 1 }),
    }))
    .map(({ content }) => new Set(content.map(({ color }) => color)))
    .filter(content => content.has('shiny gold')).length;

export const partTwo = (colors: Instructions): any =>
  JSON.stringify(
    getColorContents({ color: 'shiny gold', colors, count: 1 }),
    null,
    2,
  );

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
  run({ pathToInput: '07/input.txt', partOne, partTwo, formatInput });
}
