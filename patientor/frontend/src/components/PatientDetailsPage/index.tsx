import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { Entry, Patient } from '../../types';
import AddEntryModal from '../AddEntryModal';
import patientsService from '../../services/patients';
import GenderIcon from './GenderIcon';
import PatientEntries from './PatientEntries';

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = (): void => setModalOpen(false);

  const id = useParams().id;
  if (!id) throw new Error('Specify id');

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientsService.getById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const addEntryToPatient = (entry: Entry) => {
    setPatient({
      ...patient,
      entries: patient.entries ? patient.entries.concat(entry) : [entry],
    });
  };

  return (
    <>
      <Typography variant="h4" style={{ margin: '0.5em 0' }}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>

      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1" style={{ marginBottom: '1em' }}>
        occupation: {patient.occupation}
      </Typography>

      <AddEntryModal
        modalOpen={modalOpen}
        closeModal={closeModal}
        addEntry={addEntryToPatient}
        patientId={patient.id}
      />
      <Button variant="contained" onClick={() => setModalOpen(true)}>
        Add New Entry
      </Button>

      {patient.entries && <PatientEntries entries={patient.entries} />}
    </>
  );
};

export default PatientDetailsPage;
