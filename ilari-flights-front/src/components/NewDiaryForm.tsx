import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { DiaryEntry, Visibility, Weather } from '../types';
import { createDiary } from '../services/diaryService';
import ErrorMessage from './ErrorMessage';

type AddDiaryFunction = (diary: DiaryEntry) => void;
const NewDiaryForm = ({
  addToDiariesList,
}: {
  addToDiariesList: AddDiaryFunction;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const addDiary = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };

    try {
      const responseDiary = await createDiary(newDiary);

      setDate('');
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment('');

      addToDiariesList(responseDiary);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const inlineBStyle = { display: 'inline-block' };

  const handleVisibilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVisibility = event.target.value as Visibility;
    setVisibility(newVisibility);
  };

  const handleWeatherChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newVisibility = event.target.value as Weather;
    setWeather(newVisibility);
  };

  return (
    <>
      <h2>Add new entry</h2>
      <ErrorMessage errorMessage={errorMessage} />
      <form onSubmit={addDiary}>
        {/* DATE */}
        <div>
          date:{' '}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        {/* VISIBILITY */}
        <div>
          visibility:{' '}
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="vis-great"
              name="visibility"
              value={Visibility.Great}
              onChange={handleVisibilityChange}
              checked={visibility === Visibility.Great}
            />
            <label htmlFor="vis-great">Great</label>
          </div>
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="vis-good"
              name="visibility"
              value={Visibility.Good}
              onChange={handleVisibilityChange}
            />
            <label htmlFor="vis-good">Good</label>
          </div>
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="vis-ok"
              name="visibility"
              value={Visibility.Ok}
              onChange={handleVisibilityChange}
            />
            <label htmlFor="vis-ok">Ok</label>
          </div>
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="vis-poor"
              name="visibility"
              value={Visibility.Poor}
              onChange={handleVisibilityChange}
            />
            <label htmlFor="vis-poor">Poor</label>
          </div>
        </div>
        {/* WEATHER */}
        <div>
          weather:{' '}
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="wea-sunny"
              name="weather"
              value={Weather.Sunny}
              onChange={handleWeatherChange}
              checked={weather === Weather.Sunny}
            />
            <label htmlFor="wea-sunny">Sunny</label>
          </div>
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="wea-rainy"
              name="weather"
              value={Weather.Rainy}
              onChange={handleWeatherChange}
            />
            <label htmlFor="wea-rainy">Rainy</label>
          </div>
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="wea-cloudy"
              name="weather"
              value={Weather.Cloudy}
              onChange={handleWeatherChange}
            />
            <label htmlFor="wea-cloudy">Cloudy</label>
          </div>
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="wea-stormy"
              name="weather"
              value={Weather.Stormy}
              onChange={handleWeatherChange}
            />
            <label htmlFor="wea-stormy">Stormy</label>
          </div>
          <div style={inlineBStyle}>
            <input
              type="radio"
              id="wea-windy"
              name="weather"
              value={Weather.Windy}
              onChange={handleWeatherChange}
            />
            <label htmlFor="wea-windy">Windy</label>
          </div>
        </div>
        {/* COMMENT */}
        <div>
          comment:{' '}
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
