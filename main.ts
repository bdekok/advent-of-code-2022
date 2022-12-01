import { getDayOneResults } from "./day1/day1.ts";

export interface Result {
    exerciseOne: number,
    exerciseTwo?: number
}

function printResults(result: Result) {
    console.log(JSON.stringify(result, null, 2))
}


async function getDayResults() {
    const day = prompt("Please put in the day of the month you want the answer to:");
    switch(day) { 
        case "1": 
            printResults(await getDayOneResults())
            break;
        default:
            return console.log("We don't know the question, but 42 is the answer")
    }
}

getDayResults()
