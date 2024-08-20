import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';

import { Gender, Patient } from '../../types';
import patientsService from '../../services/patients';

const PatientDetailsPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  if (!id) throw new Error(`No patient with id: ${id}`);

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

  let genderIcon: JSX.Element;
  switch (patient.gender) {
    case Gender.Female:
      genderIcon = <Female />;
      break;

    case Gender.Male:
      genderIcon = <Male />;
      break;

    case Gender.Other:
      genderIcon = <Transgender />;
      break;

    default:
      ((value: never): never => {
        throw new Error(`Unhandled gender: ${JSON.stringify(value)}`);
      })(patient.gender);
  }

  return (
    <>
      <Typography variant="h4" style={{ margin: '0.5em 0' }}>
        {patient.name} {genderIcon}
      </Typography>

      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
    </>
  );
};

export default PatientDetailsPage;
