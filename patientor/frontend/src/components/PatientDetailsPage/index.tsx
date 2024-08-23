import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import { Patient } from '../../types';
import patientsService from '../../services/patients';
import GenderIcon from './GenderIcon';
import PatientEntries from './PatientEntries';

const PatientDetailsPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

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

  return (
    <>
      <Typography variant="h4" style={{ margin: '0.5em 0' }}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>

      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>

      {patient.entries && <PatientEntries entries={patient.entries} />}
    </>
  );
};

export default PatientDetailsPage;
