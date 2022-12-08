// deno-lint-ignore-file for-direction
interface TreeScore {
    number: number,
    visible: boolean,
    why: string;
    stepsLeft: number,
    stepsTop: number,
    stepsRight: number,
    stepsBottom: number,
}

const getTreeScores = (treeMatrix: number[][]): TreeScore[][] => {
  return treeMatrix.map((row, rowIndex) => {
    return row.map((current, columnIndex) => {
      const totalColumnsIndex = row.length - 1;
      const totalRowsIndex = treeMatrix.length - 1;

      let result = {
        number: current,
        visible: false,
        why: "size is not that important",
        stepsLeft: 0,
        stepsTop: 0,
        stepsRight: 0,
        stepsBottom: 0,
      };
      // living on the edge'
      if (columnIndex === 0 || columnIndex === totalColumnsIndex || rowIndex === 0 || rowIndex === totalRowsIndex) {
        result = { ...result, visible: true, why: "edge" };
      }
      // go left
      for (let index = columnIndex - 1; index >= 0; index--) {
        const previousColumn = row[index];
        result = { ...result, stepsLeft: result.stepsLeft + 1 };

        if (previousColumn >= current) {
          break;
        }
        if (index === 0 && result.visible === false) {
          result = { ...result, visible: true, why: "left" };
        }
      }
      // go right
      for (let index = columnIndex + 1; index <= totalColumnsIndex; index++) {
        const nextColumn = row[index];
        result = { ...result, stepsRight: result.stepsRight + 1 };

        if (nextColumn >= current) {
          break;
        }
        if (index === totalColumnsIndex) {
          result = { ...result, visible: true, why: "right" };
        }
      }
      // go top
      for (let index = rowIndex - 1; index >= 0; index--) {
        const topValue = treeMatrix[index][columnIndex];
        result = { ...result, stepsTop: result.stepsTop + 1 };

        if (topValue >= current) {
          break;
        }
        if (index === 0) {
          result = { ...result, visible: true, why: "top" };
        }
      }
      // go down
      for (let index = rowIndex + 1; index <= totalRowsIndex; index++) {
        const bottomValue = treeMatrix[index][columnIndex];
        result = { ...result, stepsBottom: result.stepsBottom + 1 };

        if (bottomValue >= current) {
          break;
        }
        if (index === totalRowsIndex) {
          result = { ...result, visible: true, why: "bottom" };
        }
      }
      return result;
    });
  });
};

const getTreeMatrix = (input: string) => input.split(/\n/).map((row) => row.split("").map((value) => parseInt(value)));

export const getVisibleTreeCount = (input: string): number => {
  return getTreeScores(getTreeMatrix(input))
    .flat()
    .filter(({ visible }) => visible === true).length;
};

export const getScenicScore = (input: string): number => {
  const scenicScores = getTreeScores(getTreeMatrix(input))
    .flat()
    .map(({ stepsTop, stepsLeft, stepsRight, stepsBottom }) => stepsTop * stepsLeft * stepsRight * stepsBottom);

  return Math.max(...scenicScores);
};
