import { SyntheticEvent, useState } from 'react';

import { DiaryEntry } from './types';
import { createDiary } from './services/diaryService';

type AddDiaryFunction = (diary: DiaryEntry) => void;
const NewDiaryForm = ({
  addToDiariesList,
}: {
  addToDiariesList: AddDiaryFunction;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    const responseDiary = await createDiary(newDiary);
    if (responseDiary) {
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');

      addToDiariesList(responseDiary);
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date{' '}
          <input
            type="text"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility{' '}
          <input
            type="text"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather{' '}
          <input
            type="text"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment{' '}
          <input
            type="text"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default NewDiaryForm;
