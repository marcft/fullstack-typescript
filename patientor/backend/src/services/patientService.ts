import { v1 as uuid } from 'uuid';

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

const addPatient = (patient: Omit<Patient, 'id'>) => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getAllPatients, getNonSensitivePatientsData, addPatient };
