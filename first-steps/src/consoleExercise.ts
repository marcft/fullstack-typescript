import { isArgsLengthAtLeast, parseToNumbers } from './modules/utils';
import calculateExercises from './modules/exerciseCalculator';

try {
  const args = process.argv;
  if (isArgsLengthAtLeast(4, args)) {
    const relevantArgs = args.slice(2);
    const [objective, ...hoursArray] = parseToNumbers(relevantArgs);
    console.log(calculateExercises(hoursArray, objective));
  }
} catch (error: unknown) {
  let errorMessage = 'Some error happened.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
