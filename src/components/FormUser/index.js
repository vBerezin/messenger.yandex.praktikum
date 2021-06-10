import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/modules/Component';
import { formSubmitHandler } from '~common/scripts/utils/form-submit-handler';
import { Store } from '~common/scripts/Store';
import { PopupFile } from '~components/PopupFile';
import '~components/Button';

export class FormUser extends Component {
  #handlers;
  #userData;
  #popupAvatar;

  constructor(props) {
    super({template, props});
    this.#popupAvatar = new PopupFile({
      form: {
        action: '?avatar',
        input: {
          name: 'avatar',
        },
        submit: {
          text: 'Поменять',
        }
      },
    });
    this.#handlers = {
      '?edit': formSubmitHandler,
      '?password': (event) => {
        event.preventDefault();
        const {newPassword, newPasswordConfirm, oldPassword} = this.el;
        const valid =
          newPassword.value !== oldPassword.value
          && newPassword.value.length > 7
          && newPassword.value === newPasswordConfirm.value;
        if (valid) {
          return formSubmitHandler(event);
        }
        const newState = this.state;
        newState.fields.newPassword.valid = false;
        newState.fields.newPasswordConfirm.valid = false;
        newState.fields.newPasswordConfirm.errors = [
          'Новый пароль не должен совпадать со старым',
          'Минимальная длина нового пароля 8 символов',
          'Пароли должны совпадать',
        ];
        this.setState(newState).render();
      },
    };
    this.#userData = Store.getUserData(props.id);
    this.#userData
      .then(() => this.compute())
      .then(() => this.render());
  }

  edit() {
    this.setState({
      edit: true,
    });
    this.compute().then(() => this.render());
  }

  passwordChange() {
    this.setState({
      password: true,
    });
    this.compute().then(() => this.render());
  }

  avatarChange() {
    this.#popupAvatar.reset().render().show();
  }

  async compute() {
    const userData = await this.#userData;
    const state = {
      fields: {},
      image: userData.image,
      attributes: {
        'autocomplete': 'off',
      }
    };
    let keys = [
      {
        label: 'Почта',
        name: 'email'
      },
      {
        label: 'Логин',
        name: 'login'
      },
      {
        label: 'Имя',
        name: 'first_name'
      },
      {
        label: 'Фамилия',
        name: 'second_name'
      },
      {
        label: 'Имя в чате',
        name: 'display_name'
      },
      {
        label: 'Телефон',
        name: 'phone'
      },
    ];
    if (this.state.password) {
      state.attributes.action = '?password';
      keys = [
        {
          label: 'Старый пароль',
          name: 'oldPassword',
          type: 'password',
        },
        {
          label: 'Новый пароль',
          name: 'newPassword',
          type: 'password',
        },
        {
          label: 'Повторите новый пароль',
          name: 'newPasswordConfirm',
          type: 'password',
        },
      ]
    }
    if (this.state.edit) {
      state.attributes.action = '?edit';
    }
    keys.forEach(key => {
      state.fields[key.name] = {
        ...key,
        ...{
          value: userData[key.name],
        },
      }
    });
    this.setState(state);
  }

  render(container) {
    super.render(container);
    this.el.addEventListener('submit', (event) => {
      const action = this.el.getAttribute('action');
      return this.#handlers[action](event);
    });
    this.el.addEventListener('click', ({ target }) => {
      if (target.dataset.action === 'avatar') {
        return this.avatarChange();
      }
    });
  }
}
