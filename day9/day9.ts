import { resolve } from '../depts.ts';
import { Result } from '../main.ts';
import { getVisitedByTail } from './getVisitedByTail.ts';

const filePath = resolve('day9', 'input', 'input.txt');

export async function getDayNineResults(): Promise<Result> {
  const input = await Deno.readTextFile(filePath);
  const exerciseOne = getVisitedByTail(input);
  return { exerciseOne };
}
