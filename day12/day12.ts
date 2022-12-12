import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getMazeShortest, getMazeShortestZtoA } from "./getMazeSolution.ts";

const filePath = resolve('day12', 'input', 'input.txt');

export async function getDayTwelveResults(): Promise<Result> {
    const input = await Deno.readTextFile(filePath);
    const exerciseOne = getMazeShortest(input);
    const exerciseTwo = getMazeShortestZtoA(input)
    return { exerciseOne, exerciseTwo };
  }
  