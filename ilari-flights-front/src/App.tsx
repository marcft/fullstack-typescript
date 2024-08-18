import { useEffect, useState } from 'react';

import { DiaryEntry, NonSensitiveDiaryEntry } from './types';
import NewDiaryForm from './NewDiaryForm';
import { getAllDiaries } from './services/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => {
      setDiaries(diaries);
    });
  }, []);

  const addOneDiary = (diary: DiaryEntry) => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <>
      <NewDiaryForm addToDiariesList={addOneDiary} />

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
