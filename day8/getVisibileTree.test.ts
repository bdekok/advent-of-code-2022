import { assertEquals } from '../depts.ts';
import { getScenicScore, getVisibleTreeCount } from './getVisibleTree.ts';

const testData = `30373
25512
65332
33549
35390`;

Deno.test('Exercise one on day eight gets which trees are visible', () => {
  assertEquals(getVisibleTreeCount(testData), 21);
});


Deno.test('Exercise one on day eight gets which trees are visible', () => {
    assertEquals(getScenicScore(testData), 8);
  });
  
  