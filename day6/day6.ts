import { resolve } from '../depts.ts';
import { Result } from '../main.ts';
import { getStringStart } from "./getStringStart.ts";

const dayThreeFilePath = resolve('day6', 'input', 'input.txt');

async function getDayFileValues(): Promise<string> {
  return await Deno.readTextFile(dayThreeFilePath);
}

export async function getDaySixResults(): Promise<Result> {
  const input = await getDayFileValues();
  const exerciseOne = getStringStart(input, 4)
  const exerciseTwo = getStringStart(input, 14)

  return { exerciseOne, exerciseTwo };
}
