import './styles';
import template from './template';
import { ProfileProps, ProfileState, ProfileKey } from './types';
import { Component } from '~common/scripts/modules/Component';
import { FormUser } from '~components/FormUser';
import { FormUserFields } from '~components/FormUser/types';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { Store } from '~common/scripts/modules/Store';
import { StoreUser } from '~common/scripts/modules/Store/types';
import { ROUTES } from '~common/scripts/vars/routes';
import { App } from '~common/scripts/App';
import { Validate } from '~common/scripts/modules/Validate';

const KEYS = [
  {
    label: 'Почта',
    name: 'email',
    id: 'formUser[email]',
    type: 'email',
    validate: Validate.field.email,
  },
  {
    label: 'Логин',
    name: 'login',
    id: 'formUser[login]',
    type: 'text',
    required: true,
    validate: Validate.field.login,
  },
  {
    label: 'Имя',
    name: 'first_name',
    id: 'formUser[first_name]',
    type: 'text',
    validate: Validate.field.required,
  },
  {
    label: 'Фамилия',
    name: 'second_name',
    id: 'formUser[second_name]',
    type: 'text',
    validate: Validate.field.required,
  },
  {
    label: 'Имя в чате',
    name: 'display_name',
    id: 'formUser[display_name]',
    type: 'text',
    validate: Validate.field.required,
  },
  {
    label: 'Телефон',
    name: 'phone',
    id: 'formUser[phone]',
    type: 'tel',
    required: true,
    validate: Validate.field.phone,
  },
];

const KEYS_PASSWORD = [
  {
    label: 'Старый пароль',
    name: 'oldPassword',
    id: 'formUser[oldPassword]',
    type: 'text',
    readonly: true,
  },
  {
    label: 'Новый пароль',
    name: 'newPassword',
    id: 'formUser[newPassword]',
    type: 'password',
    required: true,
    validate: Validate.field.password,
  },
  {
    label: 'Повторите новый пароль',
    name: 'newPasswordConfirm',
    id: 'formUser[newPasswordConfirm]',
    type: 'password',
    required: true,
    validate: function(value) {
      const form = this.el.closest('form');
      const password = form.newPassword.value;
      return value === password ? null : 'Пароли не совпадают';
    }
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
          fields: this.makeFields(KEYS, data, true),
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

  private makeFields(keys: ProfileKey[], data: StoreUser | null, readonly: boolean ): FormUserFields {
    return keys.map((key) => {
      return {
        ...key,
        readonly: key.readonly !== undefined ? key.readonly : readonly,
        value: data[key.name],
      }
    });
  }

  info() {
    this.getUserData()
      .then((data) => {
        this.form.setFields(this.makeFields(KEYS, data, true));
        this.form.setState({ edit: false });
        this.setState({
          back: ROUTES.messenger,
        });
      });
  }

  edit() {
    this.getUserData()
      .then((data) => {
        this.form.setFields(this.makeFields(KEYS, data, false));
        this.form.setState({
          edit: true,
          action: '?edit',
        });
        this.setState({
          back: ROUTES.user.profile,
        });
    });
  }

  password() {
    this.getUserData()
      .then((data) => {
        this.form.setFields(this.makeFields(KEYS_PASSWORD, data, false));
        this.form.setState({
          edit: true,
          action: '?password',
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
