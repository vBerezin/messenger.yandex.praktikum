import { Profile } from '~components/Profile';
import { Store } from '~modules/Store';
import { ROUTES } from '~common/scripts/routes';
import { Users } from '~entities/Users';
import { App } from '~modules/App';

const { user } = Store.state;

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
