import { assertEquals } from "../depts.ts";
import { getMonkeyBusiness } from "./getMonkeyBusiness.ts";

const testData = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

Deno.test("Exercise one on day 11 gets the amount of monkey business after 20 rounds", () => {
  assertEquals(getMonkeyBusiness(testData, true, 20), 10605);
});

Deno.test("Exercise two on day 11 gets the amount of monkey business after 10000 rounds", () => {
    assertEquals(getMonkeyBusiness(testData, false, 20), 10197)
    assertEquals(getMonkeyBusiness(testData, false, 1000), 27019168)
    assertEquals(getMonkeyBusiness(testData, false, 10000), 2713310158);
  });