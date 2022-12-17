import { checkItem, getSumOfIndexesSortedCorrectly } from "./getNumberSort.ts";
import { assertEquals } from "../depts.ts";

const testData = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

Deno.test("Exercise one on day 13 returns the sum of the indexes that are sorted correctly", () => {
  assertEquals(getSumOfIndexesSortedCorrectly(testData), 13);
});

Deno.test(
  "[1,1,3,1,1] vs [1,1,5,1,1] is in the right order as all are smaller or equal on the left side",
  () => {
    assertEquals(checkItem([1, 1, 3, 1, 1], [1, 1, 5, 1, 1]), true);
  }
);

Deno.test("[[1],[2,3,4]] vs [[1],4] is in the right order", () => {
  assertEquals(checkItem([[1], [2, 3, 4]], [[1], 4]), true);
});

Deno.test("[9] vs [[8,7,6]] is NOT in the right order", () => {
  assertEquals(checkItem([9], [[8, 7, 6]]), false);
});

Deno.test("[[4,4],4,4] vs [[4,4],4,4,4] is in the right order", () => {
  assertEquals(checkItem([[4, 4], 4, 4], [[4, 4], 4, 4, 4]), true);
});

Deno.test("[7,7,7,7] vs [7,7,7] is NOT in the right order", () => {
  assertEquals(checkItem([7, 7, 7, 7], [7, 7, 7]), false);
});

Deno.test("[] vs [3] are in the right order", () => {
  assertEquals(checkItem([], [3]), true);
});

Deno.test("[[[]]] vs [[]] are NOT in the right order", () => {
  assertEquals(checkItem([[[]]], [[]]), false);
});
Deno.test("[] vs [[]] are  in the right order", () => {
  assertEquals(checkItem([], [[]]), true);
});

Deno.test(
  "[1,[2,[3,[4,[5,6,7]]]],8,9] vs [1,[2,[3,[4,[5,6,0]]]],8,9] are NOT in the right order",
  () => {
    assertEquals(
      checkItem([1, [2, [3, [4, [5, 6, 7]]]], 8, 9], [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]),
      false
    );
  }
);
