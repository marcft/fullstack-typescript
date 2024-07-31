import { isArgsLengthExactly, parseToNumbers } from './modules/utils';
import calculateBmi from './modules/bmiCalculator';

try {
  const args = process.argv;
  if (isArgsLengthExactly(4, args)) {
    const relevantArgs = args.slice(2);
    const [height, weight] = parseToNumbers(relevantArgs);
    console.log(calculateBmi(height, weight));
  }
} catch (error: unknown) {
  let errorMessage = 'Some error happened.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
