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

type OpponentInput = 'A' | 'B' | 'C';
type MyInput = 'X' | 'Y' | 'Z';

const playRockPaperScissorRound = (
  opponentChoice: RockPaperScissor,
  myChoice: RockPaperScissor
): RockPaperScissorResult => {
  const { Rock, Paper, Scissor } = RockPaperScissor;
  const { Draw, Win, Lose } = RockPaperScissorResult;

  if (opponentChoice === myChoice) {
    return Draw;
  } else if (
    (opponentChoice === Rock && myChoice === Paper) ||
    (opponentChoice === Paper && myChoice === Scissor) ||
    (opponentChoice === Scissor && myChoice === Rock)
  ) {
    return Win;
  } else {
    return Lose;
  }
};

const playRockPaperScissorRoundByWinOrLoseStrategy = (
  opponentChoice: RockPaperScissor,
  desiredResult: RockPaperScissorResult
): RockPaperScissor => {
  const { Rock, Paper, Scissor } = RockPaperScissor;
  const { Draw, Win, Lose } = RockPaperScissorResult;

  switch (desiredResult) {
    case Draw:
      return opponentChoice;
    // deno-lint-ignore no-fallthrough
    case Win:
      switch (opponentChoice) {
        case Rock:
          return Paper;
        case Paper:
          return Scissor;
        case Scissor:
          return Rock;
      }
    case Lose:
      switch (opponentChoice) {
        case Rock:
          return Scissor;
        case Paper:
          return Rock;
        case Scissor:
          return Paper;
      }
  }
};

const mapOpponentStrategyToRockPaperScissor = (
  input: string
): RockPaperScissor => {
  const opponentInput = input as OpponentInput;
  switch (opponentInput) {
    case 'A':
      return RockPaperScissor.Rock;
    case 'B':
      return RockPaperScissor.Paper;
    case 'C':
      return RockPaperScissor.Scissor;
  }
};

const mapMyStrategyToRockPaperScissorGuessed = (
  input: string
): RockPaperScissor => {
  const myInput = input as MyInput;
  switch (myInput) {
    case 'X':
      return RockPaperScissor.Rock;
    case 'Y':
      return RockPaperScissor.Paper;
    case 'Z':
      return RockPaperScissor.Scissor;
  }
};

const mapMyStrategyToRockPaperScissorResult = (
  input: string
): RockPaperScissorResult => {
  const myInput = input as MyInput;
  switch (myInput) {
    case 'X':
      return RockPaperScissorResult.Lose;
    case 'Y':
      return RockPaperScissorResult.Draw;
    case 'Z':
      return RockPaperScissorResult.Win;
  }
};

const inputToRockPaperScissorRounds = (input: string): string[][] => {
  return input.split(/\n/).map((round) => round.split(' '));
};

export const getRockPaperScissorScoreRoundOne = (input: string): number => {
  const rounds = inputToRockPaperScissorRounds(input).map(
    ([opponentInput, myInput]) => {
      return [
        mapOpponentStrategyToRockPaperScissor(opponentInput),
        mapMyStrategyToRockPaperScissorGuessed(myInput),
      ];
    }
  );

  return rounds.reduce(
    (acc, [opponentChoice, myChoice]) =>
      acc + playRockPaperScissorRound(opponentChoice, myChoice) + myChoice,
    0
  );
};

export const getRockPaperScissorScoreRoundTwo = (input: string): number => {
  const rounds: [RockPaperScissor, RockPaperScissorResult][] =
    inputToRockPaperScissorRounds(input).map(([opponentInput, myInput]) => {
      return [
        mapOpponentStrategyToRockPaperScissor(opponentInput),
        mapMyStrategyToRockPaperScissorResult(myInput),
      ];
    });

  return rounds.reduce(
    (acc, [opponentChoice, myChoice]) =>
      acc +
      playRockPaperScissorRoundByWinOrLoseStrategy(opponentChoice, myChoice) +
      myChoice,
    0
  );
};
