import { assertEquals } from '../depts.ts';
import { getFirstOfCrates, getFirstOfCratesNonReversed } from './getCrate.ts';

const testData = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

Deno.test('Exercise one on day five gets crates', () => {
  assertEquals(getFirstOfCrates(testData), 'CMZ');
});

Deno.test('Exercise one on day five gets crates non reversed', () => {
  assertEquals(getFirstOfCratesNonReversed(testData), 'MCD');
});
