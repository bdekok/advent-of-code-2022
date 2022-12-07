type CrateData = { [key: number]: string[] };
interface Instruction {
  move: number;
  from: number;
  to: number;
}

const parsePuzzleData = (input: string): CrateData => {
  const data = input
    .split(/\n\n/)[0]
    .split(/\n/)
    .map((row) =>
      row
        .match(/.{1,4}/g)!
        .map((value) =>
          value.match(/\[(.*?)\]/g) ? value.match(/\[(.*?)\]/)![1] : ''
        )
    );
  const transposedAndFiltered = data[0].map((_, index) =>
    data.map((col) => col[index]).filter((value) => value)
  );
  return transposedAndFiltered;
};

const parsePuzzleInstructions = (input: string): Instruction[] =>
  input
    .split(/\n\n/)[1]
    .split(/\n/)
    .map((value) => {
      const [result] = value.matchAll(/move (.+) from (.+) to (.+)/g);
      return result ? result : [];
    })
    .filter((value) => value.length)
    .map(([_, move, from, to]) => ({
      move: parseInt(move),
      from: parseInt(from) - 1,
      to: parseInt(to) - 1,
    }));

const performCrateOperations = (
  data: CrateData,
  instructions: Instruction[],
  reverse: boolean
) => {
  return instructions.reduce((acc, { move, from, to }) => {
    const movedItems = reverse
      ? acc[from].slice(0, move).reverse()
      : acc[from].slice(0, move);
    acc[from] = [...acc[from].slice(move)];
    acc[to] = [...movedItems, ...acc[to]];

    return acc;
  }, data);
};

const getFirstLetterOfCrates = (crates: CrateData) =>
  Object.values(crates)
    .map((value) => value[0])
    .join('');

export const getFirstOfCrates = (input: string): string => {
  const data = parsePuzzleData(input);
  const instructions = parsePuzzleInstructions(input);
  const crateResult = performCrateOperations(data, instructions, true);
  return getFirstLetterOfCrates(crateResult);
};

export const getFirstOfCratesNonReversed = (input: string): string => {
  const data = parsePuzzleData(input);
  const instructions = parsePuzzleInstructions(input);
  const crateResult = performCrateOperations(data, instructions, false);
  return getFirstLetterOfCrates(crateResult);
};
