interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  objectiveHours: number,
): ExerciseResult => {
  const trainingDays = dailyExerciseHours.reduce((acc, cur) => {
    if (cur > 0) return (acc += 1);
    return acc;
  }, 0);

  const average =
    dailyExerciseHours.reduce((acc, cur) => acc + cur, 0) /
    dailyExerciseHours.length;

  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (average < objectiveHours) {
    rating = 1;
    ratingDescription = 'Objective not accomplished';
  } else if (average < objectiveHours * 1.5) {
    rating = 2;
    ratingDescription = 'Great! You archieved your goal';
  } else {
    rating = 3;
    ratingDescription = "Congratulations! You've exceeded your goal by a lot";
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays,
    success: average >= objectiveHours,
    rating,
    ratingDescription,
    target: objectiveHours,
    average,
  };
};

export default calculateExercises;
