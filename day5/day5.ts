import { resolve } from '../depts.ts';
import { Result } from '../main.ts';
import { getFirstOfCrates, getFirstOfCratesNonReversed } from './getCrate.ts';

const dayThreeFilePath = resolve('day5', 'input', 'input.txt');

async function getDayFileValues(): Promise<string> {
  return await Deno.readTextFile(dayThreeFilePath);
}

export async function getDayFiveResults(): Promise<Result> {
  const input = await getDayFileValues();
  const exerciseOne = getFirstOfCrates(input);
  const exerciseTwo = getFirstOfCratesNonReversed(input);
  return { exerciseOne, exerciseTwo };
}
