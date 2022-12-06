export const getStringStart = (input: string, uniqueCharacters: number) => {
  return (
    input.split('').findIndex((_, index, array) => {
      return (
        array
          .slice(index, index + uniqueCharacters)
          .filter((value, index, self) => self.indexOf(value) === index)
          .length === uniqueCharacters
      );
    }) + uniqueCharacters
  );
};
