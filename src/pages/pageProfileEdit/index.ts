import { Profile } from '~components/Profile';
import { Store } from '~modules/Store';
import { ROUTES } from '~common/scripts/routes';
import { Validate } from '~modules/Validate';
import { Users } from '~entities/Users';
import { App } from '~modules/App';

const { user } = Store.state;

const pageProfileEdit = new Profile({
  back: ROUTES.user.profile,
  form: {
    edit: true,
    fields: [
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
    ],
  }
});

Users
  .getUser(user.id)
  .then((data) => {
    pageProfileEdit.form.setState({
      image: data.avatar,
      title: data.display_name || data.login,
    });
    pageProfileEdit.form.fields.forEach((field) => {
      const value = data[field.props.name];
      field.setState({ value });
    });
  })
  .catch(App.error);

export { pageProfileEdit };
