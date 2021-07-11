import { Profile } from '~components/Profile';
import { ROUTES } from '~common/scripts/routes';
import { ProfileInfo } from '~components/ProfileInfo';
import { FormProfile } from '~components/FormProfile';
import { FormPassword } from '~components/FormPassword';

const profileInfo = new ProfileInfo();
const formProfile = new FormProfile();
const formPassword = new FormPassword();

const profile = new Profile({
  back: ROUTES.messenger,
  form: profileInfo,
});

export const pageProfile = {
  info() {
    profile.setState({
      back: ROUTES.messenger,
      form: profileInfo,
    });
    return profile;
  },
  edit() {
    profile.setState({
      back: ROUTES.user.profile,
      form: formProfile,
    });
    return profile;
  },
  password() {
    profile.setState({
      back: ROUTES.user.profile,
      form: formPassword,
    });
    return profile;
  }
};
