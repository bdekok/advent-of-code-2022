import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getSignalStrength, getTextFromRayTube } from "./getCycle.ts";

const filePath = resolve('day10', 'input', 'input.txt');

export async function getDayTenResults(): Promise<Result> {
    const input = await Deno.readTextFile(filePath);
    const exerciseOne = getSignalStrength(input);
    const exerciseTwo = '\n\n' + getTextFromRayTube(input)

    console.table(exerciseTwo)
    return { exerciseOne };
  }
  