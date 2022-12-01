import { resolve } from "../depts.ts";
import { Result } from "../main.ts";
import { calcateTotalThreeHighestCalories, calculateHighestCaloriesPerElf } from "./getCalories.ts";

const dayOneFilePath = resolve("day1","input", "calories.txt");

async function getDayOneFileValues(): Promise<string> {
    return await Deno.readTextFile(dayOneFilePath);
}

export async function getDayOneResults(): Promise<Result>  {
    const dayOneValues = await getDayOneFileValues()
    const exerciseOne = calculateHighestCaloriesPerElf(dayOneValues)
    const exerciseTwo = calcateTotalThreeHighestCalories(dayOneValues);
    return  {exerciseOne, exerciseTwo} 
}
