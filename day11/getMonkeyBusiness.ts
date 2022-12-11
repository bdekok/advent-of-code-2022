type MonkeyOperationVariable = "old" | number;
type MonkeyOperationTypes = "*" | "+";

interface MonkeyOperation {
  operation: MonkeyOperationTypes;
  x: MonkeyOperationVariable;
  y: MonkeyOperationVariable;
}

interface MonkeyTest {
  divisbleBy: number;
  true: number;
  false: number;
}

interface Monkey {
  items: number[];
  operation: MonkeyOperation;
  test: MonkeyTest;
}

const parseInputToMonkeys = (input: string): Monkey[] => {
  const uglyMonkeyRegex =
    /.*\n.*Starting items: (.*)\n.*Operation: new = (.*)\n.*Test: divisible by (\d*)\n.*If true: throw to monkey (\d*)\n.*If false: throw to monkey (\d*)/m;
  
    const parseAsMonkeyOperationVariable = (string: string): MonkeyOperationVariable => {
        return string === 'old' ? 'old' : parseInt(string) as MonkeyOperationVariable
    }
    return input
    .split(/\n\n/)
    .filter((value) => !!value)
    .map((monkey) => {
      const parsedMonkey = monkey.match(uglyMonkeyRegex)!;
      const [_, startingItemsStr, operationStr, divisbleByStr, ifTrueStr, ifFalseStr] = parsedMonkey;
      const [x, operation, y] = operationStr.split(" ");

      return {
        items: startingItemsStr.split(",").map((value) => parseInt(value)),
        operation: {
          operation: operation as MonkeyOperationTypes,
          x: parseAsMonkeyOperationVariable(x),
          y: parseAsMonkeyOperationVariable(y),
        },
        test: {
          divisbleBy: parseInt(divisbleByStr),
          true: parseInt(ifTrueStr),
          false: parseInt(ifFalseStr),
        },
      };
    });
};

const calculateWorryLevel = (item: number, operation: MonkeyOperation): number => {
  const x = operation.x === "old" ? item : operation.x;
  const y = operation.y === "old" ? item : operation.y;

  switch (operation.operation) {
    case "+":
      return x + y;
    case "*":
      return x * y;
  }
};

export const getMonkeyBusiness = (input: string, divideByThree: boolean, rounds = 20): number => {
  const monkeys = parseInputToMonkeys(input);
  const divisor = divideByThree ? 1 : monkeys.reduce((acc, monkey) => acc * monkey.test.divisbleBy, 1);
  const itemsInspected: { [key: number]: number } = {};

  for (let index = 1; index <= rounds; index++) {
    for (const [key, monkey] of monkeys.entries()) {
      for (const item of monkey.items) {
        const worryLevel = divideByThree
          ? Math.floor(calculateWorryLevel(item, monkey.operation) / 3)
          : calculateWorryLevel(item, monkey.operation) % divisor;

        if (worryLevel % monkey.test.divisbleBy === 0) {
          monkeys[monkey.test.true].items = [...monkeys[monkey.test.true].items, worryLevel];
        } else {
          monkeys[monkey.test.false].items = [...monkeys[monkey.test.false].items, worryLevel];
        }
        itemsInspected[key] = (itemsInspected[key] ?? 0) + 1;
      }
      monkeys[key].items = [];
    }
  }

  return Object.values(itemsInspected)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, value) => acc * value, 1);
};
