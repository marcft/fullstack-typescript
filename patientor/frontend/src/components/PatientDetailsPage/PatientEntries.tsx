import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Work, HealthAndSafety, LocalHospital } from '@mui/icons-material';

import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from '../../types';
import diagnosesService from '../../services/diagnoses';
import HealthRatingIcon from './HealthRatingIcon';

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <>
      <Typography variant="body1">
        {entry.date} <HealthAndSafety />
      </Typography>

      <Typography variant="body2">{entry.description}</Typography>
      <Typography variant="body2">
        Health Rating:{' '}
        <HealthRatingIcon healthRating={entry.healthCheckRating} />
      </Typography>
      <Typography variant="body2">diagnosis by {entry.specialist}</Typography>
    </>
  );
};

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <>
      <Typography variant="body1">
        {entry.date} <Work /> {entry.employerName}
      </Typography>
      <Typography variant="body2">{entry.description}</Typography>
      {entry.sickLeave && (
        <Typography variant="body2">
          Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant="body2">diagnosis by {entry.specialist}</Typography>
    </>
  );
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <>
      <Typography variant="body1">
        {entry.date} <LocalHospital />
      </Typography>
      <Typography variant="body2">{entry.description}</Typography>
      <Typography variant="body2">
        Discharged for {entry.discharge.criteria} on {entry.discharge.date}
      </Typography>
      <Typography variant="body2">diagnosis by {entry.specialist}</Typography>
    </>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const assertNever = (value: never) => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;

    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} />;

    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;

    default:
      assertNever(entry);
  }
};

const PatientEntries = ({ entries }: { entries: Entry[] }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await diagnosesService.getAll();
      setDiagnoses(patient);
    };
    void fetchPatient();
  }, []);

  const getDiagnosisForCode = (code: Diagnosis['code']) => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    if (diagnosis) return diagnosis.name;

    return 'No diagnosis found with this code';
  };

  return (
    <>
      <Typography variant="h5" style={{ margin: '0.5em 0' }}>
        Entries
      </Typography>
      {entries.map((entry) => {
        return (
          <div
            key={entry.id}
            style={{
              border: '1px solid black',
              borderRadius: '3px',
              padding: '0.5em',
              margin: '0.5em 0',
            }}
          >
            <EntryDetails entry={entry} />
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <div>
                <Typography variant="body1" style={{ marginTop: '0.5em' }}>
                  Diagnoses
                </Typography>
                <ul>
                  {entry.diagnosisCodes.map((code) => (
                    <li key={code}>
                      <Typography variant="body2">
                        {code}: {getDiagnosisForCode(code)}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default PatientEntries;
