import { PageAuth } from 'components/PageAuth';
import { FormAuth } from 'components/FormAuth';
import { ROUTES } from 'common/scripts/routes';

const formSignIn = new FormAuth({
  title: 'Вход',
  attributes: {
    method: 'POST',
    action: '?signin',
  },
  fields: [
    {
      label: 'Логин',
      input: {
        attributes: {
          id: 'form.signin[login]',
          name: 'login',
          type: 'text',
          required: true,
        },
      },
      validate(value) {
        if (!value.length) {
          return 'Неверный логин';
        }
        return false;
      },
    },
    {
      label: 'Пароль',
      input: {
        attributes: {
          id: 'form.signin[password]',
          name: 'password',
          type: 'password',
          required: true,
        },
      },
    },
  ],
  submit: {
    text: 'Авторизоваться',
  },
  button: {
    text: 'Нет аккаунта?',
    attributes: {
      href: ROUTES.auth.signup,
    },
  },
});

export const pageSignIn = new PageAuth({
  form: formSignIn,
});
