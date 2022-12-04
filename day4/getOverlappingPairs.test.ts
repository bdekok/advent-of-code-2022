import { assertEquals } from '../depts.ts';
import { getCompleteOverlappingPairs, getPartialOverlappingPairs } from './getOverlappingPairs.ts';

const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

Deno.test('Exercise one on day four counts overlapping pairs', () => {
  assertEquals(getCompleteOverlappingPairs(testData), 2);
});

Deno.test('Exercise one on day four counts overlapping pairs', () => {
  assertEquals(getPartialOverlappingPairs(testData), 4);
});
