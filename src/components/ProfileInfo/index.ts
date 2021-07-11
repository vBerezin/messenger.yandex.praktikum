import './styles';
import template from './template';

import { Component } from '~modules/Component';
import { AuthController } from '~controllers/AuthController';
import { App } from '~modules/App';
import { Store } from '~modules/Store';

const KEYS = [
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
];

export class ProfileInfo extends Component {
  constructor() {
    super({
      template,
      state: {
        fields: KEYS
      }
    });
    AuthController
      .identify()
      .then((data) => {
        this.data = data;
      })
      .catch(App.error);
    Store
      .subscribe('user', (state, value) => {
        this.data = value;
      });
  }

  makeFields(data) {
    return KEYS.map((key) => {
      return {
        ...key,
        value: data[key.name],
      };
    });
  }

  set data(data) {
    const fields = this.makeFields(data);
    this.setState({fields});
  }
}
