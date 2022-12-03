const alphabetUppercase = Array.from(Array(26)).map((_, index) =>
  String.fromCharCode(index + 65)
);
const alphabetLowercase = alphabetUppercase.map((a) => a.toLowerCase());

const score: { [key: string]: number } = [
  ...alphabetLowercase,
  ...alphabetUppercase,
].reduce((acc, value, index) => ({ ...acc, [value]: index + 1 }), {});

export const getRuckSackStringPriority = (input: string): number => {
  return input
    .split(/\n/)
    .map((string) => [
      string.substring(0, string.length / 2).split(''),
      string.substring(string.length / 2).split(''),
    ])
    .map(([compartmentOne, compartmentTwo]) =>
      compartmentOne
        .filter((value) => compartmentTwo.includes(value))
        .filter((value, index, self) => self.indexOf(value) === index)
    )
    .reduce((acc, interSection) => {
      const roundScore = interSection.reduce(
        (acc: number, letter: string) => acc + score[letter],
        0
      );
      return acc + roundScore;
    }, 0);
};

export const getRuckSackStringPriorityByGroup = (input: string): number => {  
  return input
    .split(/\n/)
    .reduce<string[][]>((acc, _, index, array) => {
      if ((index + 1) % 3 === 0) {
        const intersection = [
          array[index - 2].split(''),
          array[index - 1].split(''),
          array[index].split(''),
        ]
          .reduce((a, b) => a.filter((c) => b.includes(c)))
          .filter((value, index, self) => self.indexOf(value) === index)
        return [...acc, intersection];
      }
      return acc;
    }, [])
    .reduce((acc, interSection) => {
      const roundScore = interSection.reduce(
        (acc: number, letter: string) => acc + score[letter],
        0
      );
      return acc + roundScore;
    }, 0);
};
