import { FormAuth } from '~components/FormAuth';
import { Validate } from '~modules/Validate';
import { ROUTES } from '~common/scripts/routes';
import { Router } from '~modules/Router';
import { App } from '~modules/App';
import { Users } from '~entities/Users';

export const formSignIn = new FormAuth({
  title: 'Вход',
  fields: [
    {
      label: 'Логин',
      id: 'form.signin[login]',
      name: 'login',
      type: 'text',
      required: true,
      validate: (value) => {
        return Validate.field.required(value, 'Введите логин');
      },
    },
    {
      label: 'Пароль',
      id: 'form.signin[password]',
      name: 'password',
      type: 'password',
      required: true,
      validate: (value) => {
        return Validate.field.required(value, 'Введите пароль');
      },
    },
  ],
  buttons: [
    {
      mods: 'block',
      text: 'Авторизоваться',
      attributes: {
        type: 'submit',
      },
    },
    {
      text: 'Нет аккаунта?',
      mods: ['block', 'white'],
      attributes: {
        href: ROUTES.auth.signup,
      },
    },
  ],
  submit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    Users
      .signIn(data)
      .then(() => {
        Router.go(ROUTES.messenger);
      })
      .catch((xhr) => {
        const response = JSON.parse(xhr.response);
        this.setState({
          errors: [response.reason]
        });
        App.error(xhr);
      });
  },
});
