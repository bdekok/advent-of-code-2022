import { resolve } from '../depts.ts';
import { Result } from '../main.ts';
import { getScenicScore, getVisibleTreeCount } from './getVisibleTree.ts';

const filePath = resolve('day8', 'input', 'input.txt');

async function getDayFileValues(): Promise<string> {
  return await Deno.readTextFile(filePath);
}

export async function getDayEightResults(): Promise<Result> {
  const input = await getDayFileValues();
  const exerciseOne = getVisibleTreeCount(input);
  const exerciseTwo = getScenicScore(input)
  return { exerciseOne, exerciseTwo };
}
