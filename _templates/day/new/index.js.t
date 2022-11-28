---
to: src/<%=day%>/index.<%=ext%>
---
export const parseInput = <%= ext == 'ts' ? '(input: string): any' : 'input'%> => {
  return input;
};

export const partOne = <%= ext == 'ts' ? '(input: string): number' : 'input'%> => {
  const data = parseInput(input);
};

export const partTwo = <%= ext == 'ts' ? '(input: string): number' : 'input'%> => {
  const data = parseInput(input);
};
