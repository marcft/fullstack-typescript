import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
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

const AddPatientModal = ({
  modalOpen,
  closeModal,
  addEntry,
  patientId,
}: Props) => {
  const [error, setError] = useState<string>();

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);

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
        <AddEntryForm onSubmit={submitNewEntry} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
