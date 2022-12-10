const range = (length: number) => [...Array(length).keys()];

enum Direction {
  Up = "U",
  Right = "R",
  Down = "D",
  Left = "L",
}

interface Position {
  x: number;
  y: number;
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
    
  }
};

export const getVisitedByTail = (input: string): number => {

  let head: Position = { x: 0, y: 4 };
  let tail: Position = { x: 0, y: 4 };

  const tailPositions = new Set()
  for (const line of input.split(/\n/)) {
    const [direction, stepsString] = line.split(" ") as [Direction, string];
    const steps = parseInt(stepsString);

    console.log('======', direction,steps,  '======')
    for (const _ of range(steps)) {
      const isOverlapping = head.x === tail.x && head.y === tail.y;
      head = move(head, direction);

      if (isOverlapping) {
        // console.log({ head, tail, direction, step: _ + 1});
        console.log(`${tail.x},${tail.y}`)

        tailPositions.add(`${tail.x},${tail.y}`)
        continue;
      }

      const tailMovingUp = head.y - 2 === tail.y 
      const tailMovingDown = head.y + 2 === tail.y
      const tailMovingRight = head.x + 2 === tail.x
      const tailMovingLeft = head.x - 2 === tail.x

      const tailMovingDiagonalRight = head.x - 1 === tail.x && (tailMovingUp || tailMovingDown)
      const tailMovingDiagonalUp = head.y +1 === tail.y && (tailMovingLeft || tailMovingRight)
      const tailMovingDiagonalLeft = head.x + 1 === tail.x &&  (tailMovingUp || tailMovingDown)
      const tailMovingDiagonalDown = head.y -1 === tail.y && (tailMovingLeft || tailMovingRight)

      if(tailMovingDiagonalRight) {
        tail = move(tail, Direction.Right)
      }
      if(tailMovingDiagonalUp) {
        tail = move(tail, Direction.Up)
      }
      if(tailMovingDiagonalLeft) {
        tail = move(tail, Direction.Left)
      }
      if(tailMovingDiagonalDown) {
        tail = move(tail, Direction.Down)
      }
      if (tailMovingLeft || tailMovingRight || tailMovingUp || tailMovingDown) {
        tail = move(tail, direction);
      }
      console.log(`${tail.x},${tail.y}`)
      tailPositions.add(`${tail.x},${tail.y}`)
    }
  }
  
  console.log(tailPositions)
  return tailPositions.size
};
