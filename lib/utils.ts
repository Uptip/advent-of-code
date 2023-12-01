export const run = async ({
  partOne,
  partTwo,
}: {
  partOne: number;
  partTwo: number;
}): Promise<void> => {
  console.log(`🎄 Answer 1 is \x1b[32m`, partOne, '\x1b[0m');
  console.log(``);
  console.log(`🎄 Answer 2 is \x1b[32m`, partTwo, '\x1b[0m');
};
