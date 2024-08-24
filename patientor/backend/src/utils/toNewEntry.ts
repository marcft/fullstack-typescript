import { NewEntry, Diagnosis, HealthCheckRating } from '../types';

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

const parseDate = (date: unknown) => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseDiagnosisCodes = (array: unknown): Array<Diagnosis['code']> => {
  if (!array || !Array.isArray(array)) {
    throw new Error('Incorrect diagnosis codes');
  }
  // We will just trust the data to be in correct format
  return array as Array<Diagnosis['code']>;
};

const isType = (param: unknown): param is NewEntry['type'] => {
  const type = param as NewEntry['type'];
  if (
    type === 'Hospital' ||
    type === 'OccupationalHealthcare' ||
    type === 'HealthCheck'
  ) {
    return true;
  }
  // TypeScript will warn us if there's a new type that is not handled
  ((_unreachable: never) => {})(type);
  return false;
};

const parseType = (type: unknown) => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (
    typeof healthCheckRating !== 'number' ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const parseSickLeave = (sickLeave: unknown) => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Incorrect or missing sickLeave');
  }

  if ('startDate' in sickLeave && 'endDate' in sickLeave) {
    return {
      startDate: parseDate(sickLeave.startDate),
      endDate: parseDate(sickLeave.endDate),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseDischarge = (discharge: unknown) => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Incorrect or missing sickLeave');
  }

  if ('date' in discharge && 'criteria' in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewBaseEntry = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'description' in object &&
    'date' in object &&
    'specialist' in object &&
    'type' in object
  ) {
    return {
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      type: parseType(object.type),
      diagnosisCodes:
        'diagnosisCodes' in object
          ? parseDiagnosisCodes(object.diagnosisCodes)
          : ([] as Array<Diagnosis['code']>),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewHealthCheckEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const baseEntry = toNewBaseEntry(object);
  if (baseEntry.type !== 'HealthCheck') {
    throw new Error('Not a HealthCheckEntry');
  }

  if ('healthCheckRating' in object) {
    return {
      ...baseEntry,
      type: 'HealthCheck',
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  }

  throw new Error('Incorrect data: some fields are missing');
};

const toNewOccupationalHealthcareEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const baseEntry = toNewBaseEntry(object);
  if (baseEntry.type !== 'OccupationalHealthcare') {
    throw new Error('Not a OccupationalHealthcareEntry');
  }

  if ('employerName' in object) {
    const entry = {
      ...baseEntry,
      employerName: parseString(object.employerName),
    };

    if ('sickLeave' in object) {
      return {
        ...entry,
        type: 'OccupationalHealthcare',
        sickLeave: parseSickLeave(object.sickLeave),
      };
    }
    return {
      ...entry,
      type: 'OccupationalHealthcare',
    };
  }

  throw new Error('Incorrect data: some fields are missing');
};

const toNewHospitalEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const baseEntry = toNewBaseEntry(object);
  if (baseEntry.type !== 'Hospital') {
    throw new Error('Not a HospitalEntry');
  }

  if ('discharge' in object) {
    return {
      ...baseEntry,
      type: 'Hospital',
      discharge: parseDischarge(object.discharge),
    };
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object) {
    const entryType = parseType(object.type);

    switch (entryType) {
      case 'HealthCheck':
        return toNewHealthCheckEntry(object);
      case 'OccupationalHealthcare':
        return toNewOccupationalHealthcareEntry(object);
      case 'Hospital':
        return toNewHospitalEntry(object);
      default:
        ((value: never): never => {
          throw new Error(`Unhandled discriminated NewEntry type: ${value}`);
        })(entryType);
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewEntry;
