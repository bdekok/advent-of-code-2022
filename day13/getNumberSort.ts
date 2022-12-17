const parseInput = (input: string) => {
  return input.split(/\n\n/).map((row) => row.split(/\n/).map((row) => JSON.parse(row)));
};

type ValueOrArray<T> = T | Array<ValueOrArray<T>>;
const convertToArray = <T>(input: ValueOrArray<T>): ValueOrArray<T>[] => {
  return Array.isArray(input) ? input : [input]
}

export const checkItem = (
  left: ValueOrArray<number>,
  right: ValueOrArray<number>,
  rec = 0
): boolean | null => {
  const listLeft = convertToArray(left);
  const listRight = convertToArray(right);

  for (const [key, left] of Object.entries(listLeft)) {
    const index = parseInt(key);
    const right: ValueOrArray<number> = listRight[index];
    const bIsArray = Array.isArray(right);
    const aIsArray = Array.isArray(left);

    if (typeof right === "undefined") {
      return false;
    }
    if (aIsArray || bIsArray) {
      const result = checkItem(left, right, rec + 1);
      if (result !== null) {
        return result;
      }
    }
    if (left > right) {
      return false;
    }
    if (left < right) {
      return true;
    }
  }
  return listLeft.length < listRight.length ? true : null;
};

export const getSumOfIndexesSortedCorrectly = (input: string): number => {
  return parseInput(input)
    .map(([valueA, valueB], index) => (checkItem(valueA, valueB) === true ? index + 1 : 0))
    .reduce((acc, value) => acc + value, 0);
};
