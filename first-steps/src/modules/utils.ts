export const isArgsLengthExactly = (expectedLength: number, args: string[]) => {
  if (args.length !== expectedLength) {
    throw new Error(
      `Wrong number of arguments, expected ${expectedLength} got ${args.length}`,
    );
  }

  return true;
};

export const isArgsLengthAtLeast = (minLength: number, args: string[]) => {
  if (args.length < minLength) {
    throw new Error(
      `Wrong number of arguments, expected at least ${minLength} got ${args.length}`,
    );
  }

  return true;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseToNumbers = (array: any[]): number[] => {
  const res: number[] = array.map((element, index) => {
    const number = Number(element);
    if (isNaN(number))
      throw new Error(
        `Expected number on argument positioned ${index}, got '${element}'`,
      );
    return number;
  });

  return res;
};
