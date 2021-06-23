import './styles';
import template from './template';
import { ProfileProps, ProfileState } from './types';

import { ROUTES } from '~common/scripts/routes';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';
import { App } from '~modules/App';

import { Users } from '~entities/Users';
import { UsersUser } from '~entities/Users/types';

import { FormUser } from '~components/FormUser';

export class Profile extends Component<ProfileProps, ProfileState> {
  private form: FormUser;
  private getData: Promise<UsersUser | void>;

  constructor(props: ProfileProps & ComponentProps) {
    super({
      template,
      props,
      state: {
        user: props.user,
      },
    });
    this.getData = Users
      .getUser(this.props.user.id)
      .then((data) => {
        this.form = new FormUser({ data });
      })
      .catch(App.debug);
  }

  info() {
    this.getData
      .then(() => {
        this.setState({
          back: ROUTES.messenger,
        });
        return this.form.info();
      });
    return this;
  }

  edit() {
    this.getData
      .then(() => {
        this.setState({
          back: ROUTES.user.profile,
        });
        return this.form.edit();
      });
    return this;
  }

  password() {
    this.getData
      .then(() => {
        this.setState({
          back: ROUTES.user.profile,
        });
        return this.form.password();
      });
    return this;
  }

  render() {
    const formContainer = this.el.querySelector('.profile__form');
    this.getData.then(() => this.form.mount(formContainer));
  }
}
