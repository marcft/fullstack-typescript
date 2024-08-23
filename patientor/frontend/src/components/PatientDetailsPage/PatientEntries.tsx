import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { Diagnosis, Entry } from '../../types';
import diagnosesService from '../../services/diagnoses';

interface Props {
  entries: Entry[];
}

const PatientEntries = ({ entries }: Props) => {
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
          <div key={entry.id}>
            <Typography variant="body2">
              {entry.date}: {entry.description}
            </Typography>
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>
                  <Typography variant="body2">
                    {code}: {getDiagnosisForCode(code)}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default PatientEntries;
