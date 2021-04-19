import './style.scss';
import template from './template.pug';
import { FormAuth } from '~blocks/form-auth';
import { Component} from '~common/scripts/utils/component';
import { EVENTS } from '~common/scripts/events';
import { App } from '~common/scripts/app';

const CLICK_NAMES = {
  signIn: 'page.auth:signin',
  signUp: 'page.auth:signup',
};

class PageAuth extends Component {
  #formContainer;
  constructor(props) {
    super({ template, props });
  }
  render(container) {
    super.render(container);
    this.#formContainer = this.el.querySelector('.page-auth__form');
    const signUp = this.props.signUp && !this.props.signIn;
    const signIn = this.props.signIn || !this.props.signUp;
    if (signUp) {
      this.signUp();
    }
    if (signIn) {
      this.signIn();
    }
  }
  signUp() {
    this.#formContainer.innerHTML = '';
    formSignUp.render(this.#formContainer);
  }
  signIn() {
    this.#formContainer.innerHTML = '';
    formSignIn.render(this.#formContainer);
  }
}

const formSignIn = new FormAuth({
  title: 'Вход',
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
      }
    },
    {
      label: 'Пароль',
      input: {
        attributes: {
          id: 'form.signin[password]',
          name: 'password',
          type: 'password',
          required: true,
        }
      }
    },
  ],
  submit: {
    text: 'Авторизоваться',
  },
  button: {
    text: 'Нет аккаунта?',
    attributes: {
      'data-click': CLICK_NAMES.signUp,
    }
  }
});

const formSignUp = new FormAuth({
  title: 'Регистрация',
  fields: [
    {
      label: 'Почта',
      input: {
        attributes: {
          id: 'form.signup[email]',
          name: 'email',
          type: 'email',
        }
      }
    },
    {
      label: 'Логин',
      input: {
        attributes: {
          id: 'form.signup[login]',
          name: 'login',
          type: 'text',
        }
      }
    },
    {
      label: 'Имя',
      input: {
        attributes: {
          id: 'form.signup[first_name]',
          name: 'first_name',
          type: 'text',
        }
      }
    },
    {
      label: 'Фамилия',
      input: {
        attributes: {
          id: 'form.signup[second_name]',
          name: 'second_name',
          type: 'text'
        }
      }
    },
    {
      label: 'Телефон',
      input: {
        attributes: {
          id: 'form.signup[phone]',
          name: 'phone',
          type: 'tel',
          required: true,
        }
      }
    },
    {
      label: 'Пароль',
      input: {
        attributes: {
          id: 'form.signup[password]',
          name: 'password',
          type: 'password',
          required: true,
        }
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
        }
      }
    },
  ],
  submit: {
    text: 'Зарегистрироваться',
  },
  button: {
    text: 'Войти',
    attributes: {
      'data-click': CLICK_NAMES.signIn,
    }
  }
});

const page = new PageAuth({
  signIn: true,
  signUp: false,
});

const CLICK_ACTIONS = {
  [CLICK_NAMES.signIn]: () => {
    page.signIn();
  },
  [CLICK_NAMES.signUp]: () => {
    page.signUp();
  },
};

App.on(EVENTS.app.click, ({ name, event }) => {
  const action = CLICK_ACTIONS[name];
  if (action) {
    event.preventDefault();
    return action();
  }
});


export const pageAuth = page;
