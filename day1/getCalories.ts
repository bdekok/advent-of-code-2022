function calculateCaloriesPerElf(list: string): number[] {
  return list.split(/\n\n/).map((elf) => {
    return elf
      .split(/\n/)
      .map((calories) => parseInt(calories))
      .reduce((acc, curr) => acc + curr, 0);
  });
}

function calculateHighestCalories(caloryList: number[]): number {
  return Math.max(...caloryList);
}

export function calculateHighestCaloriesPerElf(list: string): number {
  return calculateHighestCalories(calculateCaloriesPerElf(list));
}

export function calcateTotalThreeHighestCalories(list: string): number {
  return calculateCaloriesPerElf(list)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, cur) => acc + cur, 0);
}
