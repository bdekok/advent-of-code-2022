const range = (length: number) => [...Array(length).keys()];

enum Direction {
  Up = "U",
  Right = "R",
  Down = "D",
  Left = "L",
  UpRight = "UR",
  UpLeft = "UL",
  DownLeft = "DL",
  DownRight = "DR",
}

interface Position {
  x: number;
  y: number;
  hasMoved: boolean;
}

const move = (position: Position, direction: Direction): Position => {
  switch (direction) {
    case Direction.Up:
      return { ...position, y: position.y - 1 };
    case Direction.Right:
      return { ...position, x: position.x + 1 };
    case Direction.Down:
      return { ...position, y: position.y + 1 };
    case Direction.Left:
      return { ...position, x: position.x - 1 };
    case Direction.UpRight:
      return { ...position, y: position.y - 1, x: position.x + 1 };
    case Direction.UpLeft:
      return { ...position, y: position.y - 1, x: position.x - 1 };
    case Direction.DownLeft:
      return { ...position, y: position.y + 1, x: position.x - 1 };
    case Direction.DownRight:
      return { ...position, y: position.y + 1, x: position.x + 1 };
  }
};

export const followHead = (head: Position, tail: Position) => {
  const isOverlapping = head.x - 1 === tail.x && head.y - 1 === tail.y;
  if (isOverlapping || head.hasMoved == false) {
    return { ...tail, hasMoved: false };
  }
  tail = { ...tail, hasMoved: true };

  const tailMovingUp = head.y === tail.y - 2;
  const tailMovingDown = head.y === tail.y + 2;
  const tailMovingRight = head.x === tail.x + 2;
  const tailMovingLeft = head.x === tail.x - 2;
  const tailMovingDiagonalRight = head.x >= tail.x + 1;
  const tailMovingDiagonalUp = head.y <= tail.y - 1;
  const tailMovingDiagonalLeft = head.x <= tail.x - 1;
  const tailMovingDiagonalDown = head.y >= tail.y + 1;

  if ((tailMovingDiagonalRight && tailMovingUp) || (tailMovingDiagonalUp && tailMovingRight)) {
    return move(tail, Direction.UpRight);
  }
  if ((tailMovingDiagonalRight && tailMovingDown) || (tailMovingDiagonalDown && tailMovingRight)) {
    return move(tail, Direction.DownRight);
  }
  if ((tailMovingDiagonalUp && tailMovingLeft) || (tailMovingDiagonalLeft && tailMovingUp)) {
    return move(tail, Direction.UpLeft);
  }
  if ((tailMovingDiagonalLeft && tailMovingDown) || (tailMovingDiagonalDown && tailMovingLeft)) {
    return move(tail, Direction.DownLeft);
  }
  if (tailMovingLeft) {
    return move(tail, Direction.Left);
  }
  if (tailMovingRight) {
    return move(tail, Direction.Right);
  }
  if (tailMovingUp) {
    return move(tail, Direction.Up);
  }
  if (tailMovingDown) {
    return move(tail, Direction.Down);
  }
  return { ...tail, hasMoved: false };
};

export const getVisitedByTail = (input: string): number => {
  let head: Position = { x: 0, y: 0, hasMoved: true };
  let tail: Position = { x: 0, y: 0, hasMoved: false };
  const tailPositions = new Set();

  for (const line of input.split(/\n/)) {
    const [direction, stepsString] = line.split(" ") as [Direction, string];
    const steps = parseInt(stepsString);
    for (const _ of range(steps)) {
      head = move(head, direction);
      tail = followHead(head, tail);
      tailPositions.add(`${tail.x},${tail.y}`);
    }
  }

  return tailPositions.size;
};

export const getVisitedByTailRange = (input: string, tailLength: number): number => {
  let head: Position = { x: 0, y: 0, hasMoved: true };
  const tailNumbers: Position[] = range(tailLength).map((_) => ({ x: 0, y: 0, hasMoved: false }));
  const tailPositions = new Set();

  for (const line of input.split(/\n/)) {
    const [direction, stepsString] = line.split(" ") as [Direction, string];
    const steps = parseInt(stepsString);

    for (const _ of range(steps)) {
      head = move(head, direction);
      for (const index of tailNumbers.keys()) {
        if (index === 0) {
          tailNumbers[index] = followHead(head, tailNumbers[index]);
        } else {
          tailNumbers[index] = followHead(tailNumbers[index - 1], tailNumbers[index]);
        }
        if (index === tailLength - 1) {
          tailPositions.add(`${tailNumbers[index].x},${tailNumbers[index].y}`);
        }
      }
    }
  }
  return tailPositions.size;
};
