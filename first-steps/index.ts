import express from 'express';

import { parseToNumbers } from './src/modules/utils';
import calculateBmi from './src/modules/bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (typeof height !== 'string' || typeof weight !== 'string') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  try {
    const [numHeight, numWeight] = parseToNumbers([height, weight]);
    const bmi = calculateBmi(numHeight, numWeight);
    return res.json({ height, weight, bmi });
  } catch (error) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
