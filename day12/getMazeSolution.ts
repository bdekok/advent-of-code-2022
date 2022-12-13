interface Coordinate {
  x: number;
  y: number;
}

interface MazePosition extends Coordinate {
  value: string;
  isStart: boolean;
  isEnd: boolean;
  traversedPath: Coordinate[];
}

const parseMaze = (input: string): MazePosition[][] => {
  return input.split(/\n/).map((rowValue, y) =>
    rowValue.split("").map((columnValue, x) => {
      const isStart = columnValue === "S";
      const isEnd = columnValue === "E";

      if (isStart) {
        columnValue = "a";
      }
      if (isEnd) {
        columnValue = "z";
      }
      return { x, y, value: columnValue, isStart, isEnd, traversedPath: [] };
    })
  );
};

export const traverseMazeBreadthFirst = (
  matrix: MazePosition[][],
  start: MazePosition,
  compareFn: (neighbourValue: string, currentValue: string) => boolean,
  isEndCheck: (value: MazePosition) => boolean
) => {
  const queue = [{ ...start }];
  const visited: Set<string> = new Set();
  visited.add(`${start.x},${start.y}`);

  while (queue.length > 0) {
    const current = queue.shift()!;
    const { x, y, value, traversedPath } = current;

    if (isEndCheck(current)) {
      return traversedPath;
    }
    
    const topNeighbour = matrix?.[y]?.[x - 1];
    const rightNeighbour = matrix?.[y + 1]?.[x];
    const bottomNeighbour = matrix?.[y]?.[x + 1];
    const leftNeighbour = matrix?.[y - 1]?.[x];
    const neighbours = [topNeighbour, rightNeighbour, bottomNeighbour, leftNeighbour].filter(
      (value) => value
    );

    for (const neighbour of neighbours) {
      const isVisited = visited.has(`${neighbour.x},${neighbour.y}`);
      const isAccessible = compareFn(neighbour?.value, value);

      if (!isVisited && isAccessible) {
        queue.push({ ...neighbour, traversedPath: [...traversedPath, { x, y }] });
        visited.add(`${neighbour.x},${neighbour.y}`);
      }
    }
  }
};

const getMazePosition = (matrix: MazePosition[][], valueFn: (value: MazePosition) => boolean) => {
  return matrix.reduce((acc, row, y) => {
    const x = row.findIndex(valueFn);
    if (x >= 0) {
      return matrix[y][x]!;
    }
    return acc;
  }, {}) as MazePosition;
};

const getMazeStart = (matrix: MazePosition[][]): MazePosition => {
  return getMazePosition(matrix, (value: MazePosition) => value.isStart);
};

const getMazeEnd = (matrix: MazePosition[][]): MazePosition => {
  return getMazePosition(matrix, (value: MazePosition) => value.isEnd);
};

const neighbourAccessible = (neighbourValue: string, currentValue: string): boolean => {
  return currentValue.charCodeAt(0) + 1 >= neighbourValue.charCodeAt(0);
};

const neighbourAccessibleReverse = (neighbourValue: string, currentValue: string): boolean => {
  return currentValue.charCodeAt(0) - 1 <= neighbourValue.charCodeAt(0);
};

export const getMazeShortest = (input: string): number => {
  const matrix = parseMaze(input);
  const start = getMazeStart(matrix);
  const path = traverseMazeBreadthFirst(matrix, start, neighbourAccessible, ({isEnd}) => isEnd);

  return path?.length ?? -1;
};

export const getMazeShortestZtoA = (input: string): number => {
  const matrix = parseMaze(input);
  const end = getMazeEnd(matrix);
  const path = traverseMazeBreadthFirst(matrix, end, neighbourAccessibleReverse, ({value}) => value === 'a');

  return path?.length ?? -1;
};
