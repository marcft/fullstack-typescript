import patients from '../../data/patients';

import { Patient, NonSensitivePatientData } from '../types';

const getAllPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatientsData = (): NonSensitivePatientData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getAllPatients, getNonSensitivePatientsData };
