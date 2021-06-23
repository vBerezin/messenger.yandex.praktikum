import { ROUTES } from '~common/scripts/routes';
import { Validate } from '~modules/Validate';

import { PageAuth } from '~components/PageAuth';

export const pageSignIn = new PageAuth({
  title: 'Вход',
  attributes: {
    method: 'POST',
    action: '?signin',
  },
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
});
