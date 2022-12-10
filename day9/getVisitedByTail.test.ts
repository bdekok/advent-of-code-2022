import { assertEquals } from "../depts.ts";
import { getVisitedByTail } from "./getVisitedByTail.ts";

const testData = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

Deno.test("Exercise one on day 9 gets the amount of cells that have been visited by the tail of a knot", () => {
  assertEquals(getVisitedByTail(testData), 13);
});
