import './styles';
import template from './template';
import { ProfileProps, ProfileState } from './types';

import { Component } from '~common/scripts/modules/Component';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { Store } from '~common/scripts/modules/Store';
import { StoreUser } from '~common/scripts/modules/Store/types';
import { ROUTES } from '~common/scripts/routes';
import { App } from '~common/scripts/modules/App';

import { FormUser } from '~components/FormUser';

export class Profile extends Component<ProfileProps, ProfileState> {
  private form: FormUser;
  private getData: Promise<StoreUser | void>;

  constructor(props: ProfileProps & ComponentProps) {
    super({
      template,
      props,
      state: {
        user: props.user,
      },
    });
    this.getData = Store
      .getUserData(this.props.user.id)
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
