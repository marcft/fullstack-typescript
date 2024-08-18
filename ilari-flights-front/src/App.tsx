import { useEffect, useState } from 'react';
import { getAllDiaries } from './services/diaryService';
import { NonSensitiveDiaryEntry } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => {
      setDiaries(diaries);
    });
  }, []);

  return (
    <>
      <h2>Diary entries</h2>

      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <div>visibility: {diary.visibility}</div>
            <div>weather: {diary.weather}</div>
          </div>
        );
      })}
    </>
  );
};

export default App;
