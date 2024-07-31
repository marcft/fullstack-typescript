import express from 'express';

import { parseToNumbers } from './src/modules/utils';
import calculateBmi from './src/modules/bmiCalculator';
import calculateExercises from './src/modules/exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!(daily_exercises instanceof Array)) {
    return res.status(400).json({ error: 'malformatted id' });
  }

  try {
    const [numTarget] = parseToNumbers([target]);
    const numDailyExercises = parseToNumbers(daily_exercises);

    const result = calculateExercises(numDailyExercises, numTarget);
    return res.json(result);
  } catch (error) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
