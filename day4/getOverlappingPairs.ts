const splitRangeRow = (input: string): number[] =>
  input.split('-').map((value) => parseInt(value));
const getLowestOfRangeRow = (input: string): number => splitRangeRow(input)[0];
const getHighestOfRangeRow = (input: string): number => splitRangeRow(input)[1];

export const getCompleteOverlappingPairs = (input: string): number => {
  return input.split(/\n/).reduce((acc, value) => {
    const [rangeOne, rangeTwo] = value.split(',');

    const rangeOneFitsInRangeTwo =
      getLowestOfRangeRow(rangeOne) <= getLowestOfRangeRow(rangeTwo) &&
      getHighestOfRangeRow(rangeOne) >= getHighestOfRangeRow(rangeTwo);

    const rangeTwoFitsInRangeOne =
      getLowestOfRangeRow(rangeOne) >= getLowestOfRangeRow(rangeTwo) &&
      getHighestOfRangeRow(rangeOne) <= getHighestOfRangeRow(rangeTwo);

    if (rangeTwoFitsInRangeOne || rangeOneFitsInRangeTwo) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

export const getPartialOverlappingPairs = (input: string): number => {
  return input.split(/\n/).reduce((acc, value) => {
    const [rangeOne, rangeTwo] = value.split(',');

    const rangeOneFitsInRangeTwo =
      getHighestOfRangeRow(rangeOne) <= getLowestOfRangeRow(rangeTwo) &&
      getLowestOfRangeRow(rangeOne) >= getHighestOfRangeRow(rangeTwo);

    const rangeTwoFitsInRangeOne =
      getHighestOfRangeRow(rangeOne) >= getLowestOfRangeRow(rangeTwo) &&
      getLowestOfRangeRow(rangeOne) <= getHighestOfRangeRow(rangeTwo);

    if (rangeTwoFitsInRangeOne || rangeOneFitsInRangeTwo) {
      return acc + 1;
    }
    return acc;
  }, 0);
};
