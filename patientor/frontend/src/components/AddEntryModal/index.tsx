import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';

import { Entry, EntryFormValues } from '../../types';
import AddEntryForm from './AddEntryForm';
import patientService from '../../services/patients';

interface Props {
  modalOpen: boolean;
  closeModal: () => void;
  addEntry: (entry: Entry) => void;
  patientId: string;
}

const entryTypesArray: Array<Entry['type']> = [
  'HealthCheck',
  'OccupationalHealthcare',
  'Hospital',
];

const AddPatientModal = ({
  modalOpen,
  closeModal,
  addEntry,
  patientId,
}: Props) => {
  const [error, setError] = useState<string>();
  const [entryType, setEntryType] = useState<Entry['type']>('HealthCheck');

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.addEntryToPatientWithId(
        values,
        patientId,
      );
      addEntry(entry);
      closeModal();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Unknown error');
      }
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === 'string') {
      const value = event.target.value as Entry['type'];
      if (
        value === 'HealthCheck' ||
        value === 'OccupationalHealthcare' ||
        value === 'Hospital'
      ) {
        setEntryType(value);
      } else {
        // Typescript will warn us if there is an unhandled type
        ((_unhandled: never) => {})(value);
      }
    }
  };

  const onClose = () => {
    closeModal();
    setError(undefined);
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={onClose}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <InputLabel>Entry Type</InputLabel>
        <Select
          style={{ marginBottom: 20 }}
          label="EntryType"
          fullWidth
          value={entryType}
          onChange={onHealthCheckRatingChange}
        >
          {entryTypesArray.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <AddEntryForm
          onSubmit={submitNewEntry}
          onCancel={onClose}
          type={entryType}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
