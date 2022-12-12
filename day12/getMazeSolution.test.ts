import { assertEquals } from "../depts.ts";
import { getMazeShortest, getMazeShortestZtoA } from "./getMazeSolution.ts";

const testData = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

Deno.test("Exercise one on day 12 traverses a maze", () => {
  assertEquals(getMazeShortest(testData), 31);
});
Deno.test("Exercise one on day 12 traverses a maze reverse", () => {
    assertEquals(getMazeShortestZtoA(testData), 29);
  });
  