import { assertEquals, resolve } from "../depts.ts";
import { followHead, getVisitedByTail, getVisitedByTailRange } from "./getVisitedByTail.ts";

const testData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const testData2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

Deno.test("Exercise one on day 9 gets the amount of cells that have been visited by the tail of a knot", () => {
  assertEquals(getVisitedByTail(testData), 13);
});

Deno.test("Exercise two on day 9 gets the amount of cells that have been visited by the tail of knots", () => {
  assertEquals(getVisitedByTailRange(testData, 9), 1);
  assertEquals(getVisitedByTailRange(testData2, 9), 36);
});

