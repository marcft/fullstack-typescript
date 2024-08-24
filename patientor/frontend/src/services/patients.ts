import axios from 'axios';
import { Entry, EntryFormValues, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntryToPatientWithId = async (entry: EntryFormValues, id: string) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry,
    );
    return data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === 'string') {
        const message = e.response.data.replace(
          'Something went wrong. Error: ',
          '',
        );
        throw new Error(message);
      }
      throw new Error('Unrecognized axios error');
    }
    throw new Error('Unknown error');
  }
};

export default {
  getAll,
  getById,
  create,
  addEntryToPatientWithId,
};
