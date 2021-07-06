import { ROUTES } from '~common/scripts/routes';

import { Validate } from '~modules/Validate';
import { App } from '~modules/App';

import { PageAuth } from '~components/PageAuth';

import { AuthController } from '~controllers/AuthController';
import { Router } from '~modules/Router';

export const pageSignUp = new PageAuth({
  title: 'Регистрация',
  fields: [
    {
      label: 'Почта',
      id: 'form.signup[email]',
      name: 'email',
      type: 'email',
      required: true,
      validate: Validate.field.email,
    },
    {
      label: 'Логин',
      id: 'form.signup[login]',
      name: 'login',
      type: 'text',
      required: true,
      validate: Validate.field.login,
    },
    {
      label: 'Имя',
      id: 'form.signup[first_name]',
      name: 'first_name',
      type: 'text',
      required: true,
      validate: Validate.field.required,
    },
    {
      label: 'Фамилия',
      id: 'form.signup[second_name]',
      name: 'second_name',
      type: 'text',
      required: true,
      validate: Validate.field.required,
    },
    {
      label: 'Телефон',
      id: 'form.signup[phone]',
      name: 'phone',
      type: 'tel',
      required: true,
      validate: Validate.field.phone,
    },
    {
      label: 'Пароль',
      id: 'form.signup[password]',
      name: 'password',
      type: 'password',
      required: true,
      validate: Validate.field.password,
    },
    {
      label: 'Пароль (ещё раз)',
      id: 'form.signup[password_confirm]',
      name: 'password_confirm',
      type: 'password',
      required: true,
      validate: function (value) {
        const {form} = this;
        const password = form.password.value;
        return value === password ? null : 'Пароли не совпадают';
      }
    },
  ],
  buttons: [
    {
      mods: 'block',
      text: 'Зарегистрироваться',
      attributes: {
        type: 'submit',
      },
    },
    {
      text: 'Войти',
      mods: ['block', 'white'],
      attributes: {
        href: ROUTES.auth.signin,
      },
    },
  ],
  submit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    AuthController
      .signUp(data)
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
