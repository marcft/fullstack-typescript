import { Female, Male, Transgender } from '@mui/icons-material';
import { Gender } from '../../types';

interface Props {
  gender: Gender;
}

const GenderIcon = ({ gender }: Props) => {
  switch (gender) {
    case Gender.Female:
      return <Female />;
      break;

    case Gender.Male:
      return <Male />;
      break;

    case Gender.Other:
      return <Transgender />;

    default:
      ((value: never): never => {
        throw new Error(`Unhandled gender: ${JSON.stringify(value)}`);
      })(gender);
  }
};

export default GenderIcon;
