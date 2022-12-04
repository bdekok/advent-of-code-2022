const splitRangeRow = (input: string): [number, number] =>
  input.split('-').map((value) => parseInt(value)) as [number, number];

const completeOverlap = (
  [lowestRangeOne, highestRangeOne]: [number, number],
  [lowestRangeTwo, highestRangeTwo]: [number, number]
) =>
  (lowestRangeOne <= lowestRangeTwo && highestRangeOne >= highestRangeTwo) ||
  (lowestRangeOne >= lowestRangeTwo && highestRangeOne <= highestRangeTwo);

const partialOverlap = (
  [lowestRangeOne, highestRangeOne]: [number, number],
  [lowestRangeTwo, highestRangeTwo]: [number, number]
) =>
  (highestRangeOne <= lowestRangeTwo && lowestRangeOne >= highestRangeTwo) ||
  (highestRangeOne >= lowestRangeTwo && lowestRangeOne <= highestRangeTwo);

export const getCompleteOverlappingPairs = (input: string): number => {
  return input.split(/\n/).reduce((acc, value) => {
    const [rangeOne, rangeTwo] = value.split(',');
    if (completeOverlap(splitRangeRow(rangeOne), splitRangeRow(rangeTwo))) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

export const getPartialOverlappingPairs = (input: string): number => {
  return input.split(/\n/).reduce((acc, value) => {
    const [rangeOne, rangeTwo] = value.split(',');
    if (partialOverlap(splitRangeRow(rangeOne), splitRangeRow(rangeTwo))) {
      return acc + 1;
    }
    return acc;
  }, 0);
};
