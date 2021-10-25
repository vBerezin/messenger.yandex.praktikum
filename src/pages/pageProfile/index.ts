import { FormPassword } from '~components/FormPassword';
import { FormProfile } from '~components/FormProfile';
import { Profile } from '~components/Profile';
import { ProfileInfo } from '~components/ProfileInfo';

const profileInfo = new ProfileInfo();
const formProfile = new FormProfile();
const formPassword = new FormPassword();

const profile = new Profile({
  form: profileInfo,
});

export const pageProfile = {
  info() {
    profile.setState({
      form: profileInfo,
    });
    return profile;
  },
  edit() {
    profile.setState({
      form: formProfile,
    });
    return profile;
  },
  password() {
    profile.setState({
      form: formPassword,
    });
    return profile;
  },
};
