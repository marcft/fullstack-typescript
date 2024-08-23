import { Typography } from '@mui/material';

import { Entry } from '../../types';

interface Props {
  entries: Entry[];
}

const PatientEntries = ({ entries }: Props) => {
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
                  <Typography variant="body2">{code}</Typography>
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
