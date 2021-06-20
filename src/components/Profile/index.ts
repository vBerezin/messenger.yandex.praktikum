import './styles';
import template from './template';
import { ProfileProps, ProfileState, ProfileKeys } from './types';
import { Component } from '~common/scripts/modules/Component';
import { FormUser } from '~components/FormUser';
import { FormUserFields } from '~components/FormUser/types';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { Store } from '~common/scripts/modules/Store';
import { StoreUser } from '~common/scripts/modules/Store/types';
import { ROUTES } from '~common/scripts/vars/routes';
import { App } from '~common/scripts/App';

const KEYS = [
  {
    label: 'Почта',
    name: 'email'
  },
  {
    label: 'Логин',
    name: 'login'
  },
  {
    label: 'Имя',
    name: 'first_name'
  },
  {
    label: 'Фамилия',
    name: 'second_name'
  },
  {
    label: 'Имя в чате',
    name: 'display_name'
  },
  {
    label: 'Телефон',
    name: 'phone'
  },
];
const KEYS_PASSWORD = [
  {
    label: 'Старый пароль',
    name: 'oldPassword',
    type: 'password',
  },
  {
    label: 'Новый пароль',
    name: 'newPassword',
    type: 'password',
  },
  {
    label: 'Повторите новый пароль',
    name: 'newPasswordConfirm',
    type: 'password',
  },
];

export class Profile extends Component<ProfileProps, ProfileState> {
  private form: FormUser;
  private data;

  constructor(props: ProfileProps & ComponentProps) {
    super({
      template,
      props,
      state: {
        user: props.user,
      },
    });
    this.getUserData()
      .then((data) => {
        this.form = new FormUser({
          image: data.image,
          fields: this.makeFields(KEYS, data),
        });
        this.setState({ data });
      });
  }

  private async getUserData(): Promise<StoreUser> {
    if (!this.data) {
      try {
        this.data = await Store.getUserData(this.props.user.id);
      } catch (error) {
        App.debug(error);
      }
    }
    return this.data;
  }

  private makeFields(keys: ProfileKeys[], data: StoreUser | null ): FormUserFields {
    const fields = {};
    if (data) {
      keys.forEach(key => {
        fields[key.name] = {
          ...key,
          value: data[key.name],
        }
      });
    }
    return fields;
  }

  info() {
    this.getUserData()
      .then((data) => {
        this.form.setState({
          edit: false,
          fields: this.makeFields(KEYS, data),
        });
        this.setState({
          back: ROUTES.messenger,
        });
      });
  }

  edit() {
    this.getUserData()
      .then((data) => {
        this.form.setState({
          edit: true,
          fields: this.makeFields(KEYS, data),
        });
        this.setState({
          back: ROUTES.user.profile,
        });
    });
  }

  password() {
    this.getUserData()
      .then((data) => {
        this.form.setState({
          edit: true,
          fields: this.makeFields(KEYS_PASSWORD, data),
        });
        this.setState({
          back: ROUTES.user.profile,
        });
    });
  }

  render() {
    if (this.form) {
      const formContainer = this.el.querySelector('.profile__form');
      this.form.mount(formContainer);
    }
  }
}
