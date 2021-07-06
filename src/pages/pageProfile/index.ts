import { Profile } from '~components/Profile';
import { Store } from '~modules/Store';
import { ROUTES } from '~common/scripts/routes';
import { Validate } from '~modules/Validate';
import { Users } from '~entities/Users';
import { App } from '~modules/App';

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
    validate: function (value) {
      const form = this.el.closest('form');
      const password = form.newPassword.value;
      return value === password ? null : 'Пароли не совпадают';
    }
  },
];

const pageProfile = new Profile({
  back: ROUTES.messenger,
  form: {
    fields: [
      {
        label: 'Почта',
        name: 'email',
      },
      {
        label: 'Логин',
        name: 'login',
      },
      {
        label: 'Имя',
        name: 'first_name',
      },
      {
        label: 'Фамилия',
        name: 'second_name',
      },
      {
        label: 'Имя в чате',
        name: 'display_name',
      },
      {
        label: 'Телефон',
        name: 'phone',
      },
    ],
  }
});

const { user } = Store.state;
Users
  .getUser(user.id)
  .then((data) => {
    pageProfile.form.setState({
      image: data.avatar,
      title: data.display_name || data.login,
    });
    pageProfile.form.fields.forEach((field) => {
      const value = data[field.props.name];
      field.setState({ value });
    });
  })
  .catch(App.error);

export { pageProfile };
