enum RockPaperScissor {
  Rock = 1,
  Paper = 2,
  Scissor = 3,
}

enum RockPaperScissorResult {
  Win = 6,
  Draw = 3,
  Lose = 0,
}

const mapInputToRockPaperScissor = new Map<string, RockPaperScissor>([
  ['A', RockPaperScissor.Rock],
  ['B', RockPaperScissor.Paper],
  ['C', RockPaperScissor.Scissor],
  ['X', RockPaperScissor.Rock],
  ['Y', RockPaperScissor.Paper],
  ['Z', RockPaperScissor.Scissor],
]);

const mapInputToResult = new Map<string, RockPaperScissorResult>([
  ['X', RockPaperScissorResult.Lose],
  ['Y', RockPaperScissorResult.Draw],
  ['Z', RockPaperScissorResult.Win],
]);

const rockPaperScissorResults: Record<
  RockPaperScissor,
  Record<RockPaperScissor, RockPaperScissorResult>
> = {
  [RockPaperScissor.Paper]: {
    [RockPaperScissor.Paper]: RockPaperScissorResult.Draw,
    [RockPaperScissor.Scissor]: RockPaperScissorResult.Win,
    [RockPaperScissor.Rock]: RockPaperScissorResult.Lose,
  },
  [RockPaperScissor.Rock]: {
    [RockPaperScissor.Rock]: RockPaperScissorResult.Draw,
    [RockPaperScissor.Paper]: RockPaperScissorResult.Win,
    [RockPaperScissor.Scissor]: RockPaperScissorResult.Lose,
  },
  [RockPaperScissor.Scissor]: {
    [RockPaperScissor.Scissor]: RockPaperScissorResult.Draw,
    [RockPaperScissor.Rock]: RockPaperScissorResult.Win,
    [RockPaperScissor.Paper]: RockPaperScissorResult.Lose,
  },
};

export const getRockPaperScissorScoreRoundOne = (input: string): number => {
  return input
    .split(/\n/)
    .map((round) => round.split(' '))
    .map(([opponentInput, myInput]) => [
      mapInputToRockPaperScissor.get(opponentInput)!,
      mapInputToRockPaperScissor.get(myInput)!,
    ])
    .reduce((acc, [opponentChoice, myChoice]) => {
      return acc + rockPaperScissorResults[opponentChoice][myChoice] + myChoice;
    }, 0);
};

export const getRockPaperScissorScoreRoundTwo = (input: string): number => {
  return input
    .split(/\n/)
    .map((round) => round.split(' '))
    .map<[RockPaperScissor, RockPaperScissorResult]>(
      ([opponentInput, myInput]) => [
        mapInputToRockPaperScissor.get(opponentInput)!,
        mapInputToResult.get(myInput)!,
      ]
    )
    .reduce((acc, [opponentChoice, myChoice]) => {
      const opponent = rockPaperScissorResults[opponentChoice];
      const play = Object.keys(opponent)
        .map((key) => Number(key) as RockPaperScissor)
        .find((key) => opponent[key] === myChoice)!;

      return acc + play + myChoice;
    }, 0);
};
