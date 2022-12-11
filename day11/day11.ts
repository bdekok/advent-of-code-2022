import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getMonkeyBusiness } from "./getMonkeyBusiness.ts";

const filePath = resolve('day11', 'input', 'input.txt');

export async function getDayElevenResults(): Promise<Result> {
    const input = await Deno.readTextFile(filePath);
    const exerciseOne = getMonkeyBusiness(input, true, 20);
    const exerciseTwo = getMonkeyBusiness(input, false, 10000);

    return { exerciseOne, exerciseTwo };
  }
  