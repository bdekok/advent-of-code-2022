import { assertEquals } from '../depts.ts';
import { getStringStart } from './getStringStart.ts';

const testData = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

Deno.test('Exercise one on day five gets the start of the string', () => {
  assertEquals(getStringStart(testData, 4), 7);
});

Deno.test('Exercise one on day five gets the start of the string', () => {
  assertEquals(getStringStart(testData, 14), 19);
});

// Deno.test('Exercise one on day five gets crates non reversed', () => {
//   assertEquals(getFirstOfCratesNonReversed(testData), 'MCD');
// });
