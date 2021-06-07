import { Profile } from '~components/Profile';
import { ROUTES } from '~common/scripts/routes';
import DATA_USERS from '../../../static/data/users';

const USER = DATA_USERS.find(user => user.id === 3 || user.id === '3');

export const pageProfile = new Profile({
  user: USER,
  back: ROUTES.messenger,
});
