import { isArgsLengthExactly, parseToNumbers } from './utils';

const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  let resultText = `Your BMI is ${bmi.toFixed(2)}\n`;

  if (bmi < 16.0) {
    resultText += 'Underweight (Severe thinness)';
  } else if (bmi < 17.0) {
    resultText += 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    resultText += 'Underweight (Mild thinness)';
  } else if (bmi < 25.0) {
    resultText += 'Normal (Healthy weight)';
  } else if (bmi < 30.0) {
    resultText += 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    resultText += 'Obesity (Mild)';
  } else if (bmi < 40) {
    resultText += 'Obesity (Mid)';
  } else {
    resultText += 'Morbid obesity';
  }

  return resultText;
};

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
