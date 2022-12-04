import { resolve } from '../depts.ts';
import { Result } from '../main.ts';
import { getCompleteOverlappingPairs, getPartialOverlappingPairs } from './getOverlappingPairs.ts';

const dayThreeFilePath = resolve('day4', 'input', 'input.txt');

async function getDayFileValues(): Promise<string> {
  return await Deno.readTextFile(dayThreeFilePath);
}

export async function getDayFourResults(): Promise<Result> {
  const input = await getDayFileValues();
  const exerciseOne = getCompleteOverlappingPairs(input);
  const exerciseTwo = getPartialOverlappingPairs(input);

  return { exerciseOne, exerciseTwo };
}
