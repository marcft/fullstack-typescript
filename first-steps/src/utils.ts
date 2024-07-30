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

export const parseToNumbers = (array: string[]): number[] => {
  const res: number[] = array.reduce((acc, cur, index) => {
    const number = Number(cur);
    if (isNaN(number))
      throw new Error(
        `Expected number on argument positioned ${index}, got '${cur}'`,
      );

    acc.push(number);
    return acc;
  }, []);

  return res;
};
