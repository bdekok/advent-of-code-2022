const sum = (a: number, b: number) => a + b

const calculateCaloriesPerElf = (list: string): number[] => {
  return list.split(/\n\n/).map((elf) => 
    elf
      .split(/\n/)
      .map((calories) => parseInt(calories))
      .reduce(sum, 0)
  );
}

const calculateHighestCalories = (caloryList: number[]): number => {
  return Math.max(...caloryList);
}

export const calculateHighestCaloriesPerElf = (list: string): number => {
  return calculateHighestCalories(calculateCaloriesPerElf(list));
}

export const calcateTotalThreeHighestCalories = (list: string): number => {
  return calculateCaloriesPerElf(list)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(sum, 0);
}
