import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllDiaries = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl);
  return response.data;
};

export const createDiary = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    } else {
      throw new Error('Something went wrong.');
    }
  }
};
