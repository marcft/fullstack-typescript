import { useState, SyntheticEvent } from 'react';

import {
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from '@mui/material';

import { Diagnosis, EntryFormValues, HealthCheckRating } from '../../types';
import {
  HealthCheckEntrySpecificCamps,
  HospitalEntrySpecificCamps,
  OccupationalHealthcareEntrySpecificCamps,
} from './EntrySpecificFormCamps';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  type: EntryFormValues['type'];
  diagnosisCodesList: Array<Diagnosis['code']>;
}

const AddEntryForm = ({
  onCancel,
  onSubmit,
  type,
  diagnosisCodesList,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheckEntry
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  // OccupationalHealthcareEntry
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({ startDate: '', endDate: '' });

  // HospitalEntry
  const [discharge, setDischarge] = useState({ date: '', criteria: '' });

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    let value = event.target.value;
    if (typeof value === 'string') {
      value = value.split(',').map((dc) => dc.trim());
    }
    setDiagnosisCodes(value);

    console.log({ diagnosisCodes, value });
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    if (type === 'HealthCheck') {
      onSubmit({
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating,
      });
    } else if (type === 'OccupationalHealthcare') {
      // If sickLeave entries are empty we don't submit it (it's supposed to be  opptional)
      const occupationalBaseEntry = { ...baseEntry, employerName };

      if (!sickLeave.startDate && !sickLeave.endDate) {
        onSubmit({ ...occupationalBaseEntry, type: 'OccupationalHealthcare' });
      } else {
        onSubmit({
          ...occupationalBaseEntry,
          type: 'OccupationalHealthcare',
          sickLeave,
        });
      }
    } else if (type === 'Hospital') {
      onSubmit({
        ...baseEntry,
        type: 'Hospital',
        discharge,
      });
    } else {
      ((value: never) => {
        throw new Error(`Unhandled union type: "${value}"`);
      })(type);
    }
  };

  const specificFormCamps = (type: EntryFormValues['type']) => {
    switch (type) {
      case 'HealthCheck':
        return (
          <HealthCheckEntrySpecificCamps
            healthCheckRating={healthCheckRating}
            setHealthCheckRating={setHealthCheckRating}
          />
        );

      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcareEntrySpecificCamps
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeave={sickLeave}
            setSickLeave={setSickLeave}
          />
        );

      case 'Hospital':
        return (
          <HospitalEntrySpecificCamps
            discharge={discharge}
            setDischarge={setDischarge}
          />
        );

      default:
        ((value: never) => {
          throw new Error(`Unhandled union type: "${value}"`);
        })(type);
    }
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
        >
          {diagnosisCodesList.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>

        {specificFormCamps(type)}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: 'left' }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{
                float: 'right',
              }}
              type="submit"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
