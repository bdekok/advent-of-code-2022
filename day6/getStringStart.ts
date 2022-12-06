export const getStringStart = (input: string, uniqueChars: number) =>
  input
    .split('')
    .findIndex(
      (_, index, array) =>
        new Set(array.slice(index, index + uniqueChars)).size === uniqueChars
    ) + uniqueChars;
