import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';
import toNewEntry from '../utils/toNewEntry';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientsData());
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    res.send(patient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(404).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const response = patientService.addPatient(newPatient);
    res.json(response);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    const newEntry = toNewEntry(req.body);

    const response = patientService.addEntryToPatient(newEntry, patient);
    res.json(response);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
