import './styles';
import template from './template';
import { FormSearchEvents } from './events';

import { Component } from '~modules/Component';
import { Validate } from '~modules/Validate';
import { Users } from '~entities/Users';
import { App } from '~modules/App';

export class FormSearch extends Component<null, null, FormSearchEvents> {
  #timer;

  static events = FormSearchEvents;

  constructor() {
    super({ template });
    this.#timer = null;
  }

  search(login) {
    clearTimeout(this.#timer);
    if (!login) {
      return this.emit(FormSearchEvents.search, []);
    }
    this.#timer = setTimeout(() => {
      Users
        .search(login)
        .then((data) => {
          this.emit(FormSearchEvents.search, data);
        })
        .catch(App.error);
    }, 200);
  }

  bindEvents() {
    const input = this.el.querySelector('input');
    input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    input.addEventListener('blur', () => {
      this.el.classList.remove('is-focus');
      this.el.classList.toggle('is-active', !Validate.value.isEmpty(input.value));
    });
    input.addEventListener('input', () => {
      const { value } = input;
      input.value = value.replace(/\s/g,'');
      this.search(input.value);
      this.el.classList.toggle('is-active', !Validate.value.isEmpty(input.value));
    });
  }

  created() {
    this.bindEvents();
  }
  updated() {
    this.bindEvents();
  }
}
