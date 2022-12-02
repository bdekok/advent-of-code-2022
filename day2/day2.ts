import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { getRockPaperScissorScoreRoundOne, getRockPaperScissorScoreRoundTwo } from "./getRockPaperScissorScore.ts";

const dayTwoFilePath = resolve("day2","input", "input.txt");

async function getDayTwoFileValues(): Promise<string> {
    return await Deno.readTextFile(dayTwoFilePath);
}

export async function getDayTwoResults(): Promise<Result>  {
    const input = await getDayTwoFileValues()
    const exerciseOne = getRockPaperScissorScoreRoundOne(input)
    const exerciseTwo = getRockPaperScissorScoreRoundTwo(input)
    return  {exerciseOne, exerciseTwo} 
}
