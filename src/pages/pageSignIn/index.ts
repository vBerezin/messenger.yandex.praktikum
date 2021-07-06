import { ROUTES } from '~common/scripts/routes';
import { Validate } from '~modules/Validate';

import { PageAuth } from '~components/PageAuth';
import { AuthController } from '~controllers/AuthController';
import { Router } from '~modules/Router';
import { App } from '~modules/App';

export const pageSignIn = new PageAuth({
  title: 'Вход',
  fields: [
    {
      label: 'Логин',
      id: 'form.signin[login]',
      name: 'login',
      type: 'text',
      required: true,
      validate: Validate.field.required,
    },
    {
      label: 'Пароль',
      id: 'form.signin[password]',
      name: 'password',
      type: 'password',
      required: true,
      validate: Validate.field.required,
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
    AuthController
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
  }
});
