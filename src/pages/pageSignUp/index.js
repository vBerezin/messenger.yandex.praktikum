import { PageAuth } from '~components/PageAuth';
import { FormAuth } from '~components/FormAuth';
import { ROUTES } from '~common/scripts/routes';

const formSignUp = new FormAuth({
  title: 'Регистрация',
  attributes: {
    method: 'POST',
    action: '?signup',
  },
  fields: [
    {
      label: 'Почта',
      input: {
        attributes: {
          id: 'form.signup[email]',
          name: 'email',
          type: 'email',
        },
      },
    },
    {
      label: 'Логин',
      input: {
        attributes: {
          id: 'form.signup[login]',
          name: 'login',
          type: 'text',
        },
      },
    },
    {
      label: 'Имя',
      input: {
        attributes: {
          id: 'form.signup[first_name]',
          name: 'first_name',
          type: 'text',
        },
      },
    },
    {
      label: 'Фамилия',
      input: {
        attributes: {
          id: 'form.signup[second_name]',
          name: 'second_name',
          type: 'text',
        },
      },
    },
    {
      label: 'Телефон',
      input: {
        attributes: {
          id: 'form.signup[phone]',
          name: 'phone',
          type: 'tel',
          required: true,
        },
      },
    },
    {
      label: 'Пароль',
      input: {
        attributes: {
          id: 'form.signup[password]',
          name: 'password',
          type: 'password',
          required: true,
        },
      },
    },
    {
      label: 'Пароль (ещё раз)',
      input: {
        attributes: {
          id: 'form.signup[password_confirm]',
          name: 'password_confirm',
          type: 'password',
          required: true,
        },
      },
    },
  ],
  submit: {
    text: 'Зарегистрироваться',
  },
  button: {
    text: 'Войти',
    attributes: {
      href: ROUTES.auth.signin,
    },
  },
});

export const pageSignUp = new PageAuth({
  form: formSignUp,
});
