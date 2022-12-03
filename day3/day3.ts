import { resolve } from '../depts.ts';
import { Result } from '../main.ts';
import {
  getRuckSackStringPriority,
  getRuckSackStringPriorityByGroup,
} from './getStringPriority.ts';

const dayThreeFilePath = resolve('day3', 'input', 'input.txt');

async function getDayThreeFileValues(): Promise<string> {
  return await Deno.readTextFile(dayThreeFilePath);
}

export async function getDayThreeResults(): Promise<Result> {
  const input = await getDayThreeFileValues();
  const exerciseOne = getRuckSackStringPriority(input);
  const exerciseTwo = getRuckSackStringPriorityByGroup(input);
  return { exerciseOne, exerciseTwo };
}
