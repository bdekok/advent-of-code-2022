import { assertEquals } from "../depts.ts";
import { getRockPaperScissorScoreRoundOne, getRockPaperScissorScoreRoundTwo } from "./getRockPaperScissorScore.ts"

const testData = `A Y
B X
C Z`

Deno.test("Exercise one on day two gets the rock paper scissor score by guessing choice", () => {
  assertEquals(getRockPaperScissorScoreRoundOne(testData), 15);
});

Deno.test("Exercise two on day two gets the rock paper scissor score by guessing choice", () => {
  assertEquals(getRockPaperScissorScoreRoundTwo(testData), 12);
});
  