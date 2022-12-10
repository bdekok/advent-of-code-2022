export const getSignalStrength = (input: string): number => {
  const instructions = input.split(/\n/);
  return tickCycleSignalStrength(instructions)!;
};

export const getTextFromRayTube = (input: string): string => {
  const instructions = input.split(/\n/);
  return tickCycleRayTube(instructions)!;
};

const tickCycleSignalStrength = (
  instructions: string[],
  instructionIndex = 0,
  instructionCycleCount = 0,
  registerX = 1,
  totalCycleCount = 1,
  signalStrength = 0
): number | undefined => {
  if (!instructions[instructionIndex]) {
    return signalStrength;
  }
  if (totalCycleCount % 40 === 20) {
    signalStrength = signalStrength + registerX * totalCycleCount;
  }
  if (instructionCycleCount === 1) {
    const [_, change] = instructions[instructionIndex].split(" ");
    registerX = registerX + parseInt(change);
  }
  const [instruction] = instructions[instructionIndex].split(" ");
  if (instruction === "noop" || instructionCycleCount === 1) {
    return tickCycleSignalStrength(
      instructions,
      instructionIndex + 1,
      0,
      registerX,
      totalCycleCount + 1,
      signalStrength
    );
  }
  return tickCycleSignalStrength(
    instructions,
    instructionIndex,
    instructionCycleCount + 1,
    registerX,
    totalCycleCount + 1,
    signalStrength
  );
};

const tickCycleRayTube = (
  instructions: string[],
  instructionIndex = 0,
  instructionCycleCount = 0,
  registerX = 1,
  totalCycleCount = 1,
  print = "#"
): string | undefined => {
  if (!instructions[instructionIndex]) {
    return print;
  }
  const printPosition = totalCycleCount % 40;
  if (printPosition === 0) {
    print = print + "\n";
  }

  if (instructionCycleCount === 1) {
    const [_, change] = instructions[instructionIndex].split(" ");
    registerX = registerX + parseInt(change);
  }
  const spritePosition = [registerX - 1, registerX, registerX + 1];
  print = print + (spritePosition.includes(printPosition) ? "#" : ".");

  const [instruction] = instructions[instructionIndex].split(" ");
  if (instruction === "noop" || instructionCycleCount === 1) {
    return tickCycleRayTube(instructions, instructionIndex + 1, 0, registerX, totalCycleCount + 1, print);
  }
  return tickCycleRayTube(
    instructions,
    instructionIndex,
    instructionCycleCount + 1,
    registerX,
    totalCycleCount + 1,
    print
  );
};
