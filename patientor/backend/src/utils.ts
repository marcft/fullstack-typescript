import { Gender, NewPatient, Entry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (param: unknown) => {
  // With !param we also prevent param = ''
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing field');
  }
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown) => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const isArray = (param: unknown): param is [] => {
  return Array.isArray(param);
};

const isEntry = (param: unknown): param is Entry => {
  if (!param || typeof param !== 'object') {
    return false;
  }
  return true;
};

const parseEntries = (entries: unknown) => {
  if (!isArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  for (const entry of entries) {
    if (!isEntry(entry)) {
      throw new Error('Incorrect entries');
    }
  }
  return entries;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    return {
      name: parseString(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries:
        'entries' in object ? parseEntries(object.entries) : ([] as Entry[]),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;
