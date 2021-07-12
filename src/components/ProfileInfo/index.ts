import './styles';
import template from './template';

import { Component } from '~modules/Component';
import { Store } from '~modules/Store';
import { UserProfile } from '~entities/UserProfile';

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
    UserProfile
      .identify()
      .then((data) => {
        this.data = data;
      });
    Store
      .on(Store.events.userProfileUpdate, (data) => {
        this.data = data;
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
