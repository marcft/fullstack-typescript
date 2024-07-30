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

console.log(calculateBmi(164, 67));
