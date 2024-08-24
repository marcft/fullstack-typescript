import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, NonSensitivePatientData, NewEntry } from '../types';

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

const getPatientById = (id: string) => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id: "${id}" does not exist`);
  }
  return patient;
};

const addPatient = (patient: Omit<Patient, 'id'>) => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (entry: NewEntry, patient: Patient) => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAllPatients,
  getNonSensitivePatientsData,
  getPatientById,
  addPatient,
  addEntryToPatient,
};
