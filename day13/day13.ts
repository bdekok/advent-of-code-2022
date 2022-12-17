import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getSumOfIndexesSortedCorrectly } from "./getNumberSort.ts";

const filePath = resolve('day13', 'input', 'input.txt');

export async function getDayThirtheenResults(): Promise<Result> {
    const input = await Deno.readTextFile(filePath);
    const exerciseOne = getSumOfIndexesSortedCorrectly(input);
    return { exerciseOne };
  }
  