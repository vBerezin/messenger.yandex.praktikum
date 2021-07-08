import { Profile } from '~components/Profile';
import { Store } from '~modules/Store';
import { ROUTES } from '~common/scripts/routes';
import { Validate } from '~modules/Validate';
import { Users } from '~entities/Users';
import { App } from '~modules/App';

const { user } = Store.state;

const pageProfilePassword = new Profile({
  back: ROUTES.user.profile,
  form: {
    edit: true,
    fields: [
      {
        label: 'Старый пароль',
        name: 'oldPassword',
        id: 'formUser[oldPassword]',
        type: 'text',
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
    ],
  }
});

Users
  .getUser(user.id)
  .then((data) => {
    pageProfilePassword.form.setState({
      image: data.avatar,
      title: data.display_name || data.login,
    });
  })
  .catch(App.error);

export { pageProfilePassword };
