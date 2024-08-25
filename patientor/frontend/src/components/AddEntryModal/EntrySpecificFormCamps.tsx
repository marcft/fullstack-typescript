import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import { HealthCheckRating } from '../../types';

interface HealthCheckEntryProps {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: React.Dispatch<React.SetStateAction<HealthCheckRating>>;
}

interface HealthCheckRatingOptions {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOptions[] = Object.values(
  HealthCheckRating,
)
  .filter((value): value is HealthCheckRating => typeof value === 'number')
  .map((value) => ({
    value: value,
    label: HealthCheckRating[value],
  }));

const HealthCheckEntrySpecificCamps = ({
  healthCheckRating,
  setHealthCheckRating,
}: HealthCheckEntryProps) => {
  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'number') {
      const value = event.target.value;
      const healthCheckRating = Object.values(HealthCheckRating)
        .filter((hcr): hcr is HealthCheckRating => typeof hcr === 'number')
        .find((hcr) => hcr === value);

      if (typeof healthCheckRating === 'number') {
        setHealthCheckRating(healthCheckRating);
      }
    }
  };

  return (
    <>
      <InputLabel style={{ marginTop: 10 }}>Health Check Rating</InputLabel>
      <Select
        label="HealthCheckRating"
        fullWidth
        value={healthCheckRating.toString()}
        onChange={onHealthCheckRatingChange}
      >
        {healthCheckRatingOptions.map((option) => (
          <MenuItem key={option.label} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

interface OccupationalHealthcareEntryProps {
  employerName: string;
  setEmployerName: React.Dispatch<React.SetStateAction<string>>;
  sickLeave: {
    startDate: string;
    endDate: string;
  };
  setSickLeave: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
}

const OccupationalHealthcareEntrySpecificCamps = ({
  employerName,
  setEmployerName,
  sickLeave,
  setSickLeave,
}: OccupationalHealthcareEntryProps) => (
  <>
    <TextField
      label="Employer Name"
      fullWidth
      value={employerName}
      onChange={({ target }) => setEmployerName(target.value)}
    />
    <InputLabel style={{ marginTop: 10 }}>Sick Leave</InputLabel>
    <TextField
      style={{ marginLeft: 10 }}
      label="Start Date"
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      value={sickLeave.startDate}
      onChange={({ target }) =>
        setSickLeave({ ...sickLeave, startDate: target.value })
      }
    />
    <TextField
      style={{ marginLeft: 10 }}
      label="End Date"
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      value={sickLeave.endDate}
      onChange={({ target }) =>
        setSickLeave({ ...sickLeave, endDate: target.value })
      }
    />
  </>
);

interface HospitalEntryProps {
  discharge: {
    date: string;
    criteria: string;
  };
  setDischarge: React.Dispatch<
    React.SetStateAction<{
      date: string;
      criteria: string;
    }>
  >;
}

const HospitalEntrySpecificCamps = ({
  discharge,
  setDischarge,
}: HospitalEntryProps) => (
  <>
    <InputLabel style={{ marginTop: 10 }}>Discharge</InputLabel>
    <TextField
      style={{ marginLeft: 10 }}
      label="Date"
      type="date"
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      value={discharge.date}
      onChange={({ target }) =>
        setDischarge({ ...discharge, date: target.value })
      }
    />
    <TextField
      style={{ marginLeft: 10 }}
      label="Criteria"
      fullWidth
      value={discharge.criteria}
      onChange={({ target }) =>
        setDischarge({ ...discharge, criteria: target.value })
      }
    />
  </>
);

export {
  HealthCheckEntrySpecificCamps,
  OccupationalHealthcareEntrySpecificCamps,
  HospitalEntrySpecificCamps,
};
