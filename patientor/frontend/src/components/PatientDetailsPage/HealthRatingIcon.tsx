import { Favorite as Heart } from '@mui/icons-material';
import { HealthCheckRating } from '../../types';

interface Props {
  healthRating: HealthCheckRating;
}

const HealthRatingIcon = ({ healthRating }: Props) => {
  switch (healthRating) {
    case HealthCheckRating.Healthy:
      return <Heart sx={{ color: 'green' }} />;

    case HealthCheckRating.LowRisk:
      return <Heart sx={{ color: 'yellow' }} />;

    case HealthCheckRating.HighRisk:
      return <Heart sx={{ color: 'red' }} />;

    case HealthCheckRating.CriticalRisk:
      return <Heart sx={{ color: 'black' }} />;

    default:
      ((value: never): never => {
        throw new Error(`Unhandled health rating: ${JSON.stringify(value)}`);
      })(healthRating);
  }
};

export default HealthRatingIcon;
