import { assertEquals } from "../depts.ts";

import { getRuckSackStringPriority, getRuckSackStringPriorityByGroup } from "./getStringPriority.ts";

const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`

Deno.test("Exercise one on day three gets the ruchsack score", () => {
  assertEquals(getRuckSackStringPriority(testData), 157);
});

Deno.test("Exercise one on day three gets the ruchsack score by gruoop", () => {
    assertEquals(getRuckSackStringPriorityByGroup(testData), 70);
})

