import { PageAuth } from '~components/PageAuth';
import { ROUTES } from '~common/scripts/vars/routes';
import { Validate } from '~common/scripts/modules/Validate';

export const pageSignUp = new PageAuth({
  title: 'Регистрация',
  attributes: {
    method: 'POST',
    action: '?signup',
  },
  fields: [
    {
      label: 'Почта',
      id: 'form.signup[email]',
      name: 'email',
      type: 'email',
      validate: Validate.field.email,
    },
    {
      label: 'Логин',
      id: 'form.signup[login]',
      name: 'login',
      type: 'text',
      validate: Validate.field.login,
    },
    {
      label: 'Имя',
      id: 'form.signup[first_name]',
      name: 'first_name',
      type: 'text',
    },
    {
      label: 'Фамилия',
      id: 'form.signup[second_name]',
      name: 'second_name',
      type: 'text',
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
      validate: function(value) {
        const { form } = this;
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
});
