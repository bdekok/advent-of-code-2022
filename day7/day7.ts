import { resolve } from '../depts.ts';
import { Result } from '../main.ts';
import { getTotalDirectorySize } from './getDirectorySize.ts';

const filePath = resolve('day7', 'input', 'input.txt');

async function getDayFileValues(): Promise<string> {
  return await Deno.readTextFile(filePath);
}

export async function getDaySevenResults(): Promise<Result> {
  const input = await getDayFileValues();
  const exerciseOne =  getTotalDirectorySize(input);
 
  return { exerciseOne };
}
