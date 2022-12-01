import { assertEquals } from "../depts.ts";
import { calcateTotalThreeHighestCalories, calculateHighestCaloriesPerElf } from "./getCalories.ts"

const testData = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

Deno.test("Exercise one on day one counts the Elf that consumed most calories", () => {
  assertEquals(calculateHighestCaloriesPerElf(testData), 24000);
});

Deno.test("Exercise two on day one counts the total of calories of the three top most consuming elves", () => {
  assertEquals(calcateTotalThreeHighestCalories(testData), 45000);
});
