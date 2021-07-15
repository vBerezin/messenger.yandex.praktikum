import './styles';
import template from './template';
import { FormSearchEvents } from './types';

import { Component } from '~modules/Component';
import { Validate } from '~modules/Validate';

export class FormSearch extends Component<null, null, FormSearchEvents> {
  events = FormSearchEvents;
  private delay = 200;
  private timer;

  constructor() {
    super({ template });
  }

  search(value) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.emit(FormSearchEvents.search, value);
    }, this.delay);
  }

  created() {
    const { input } = this.refs;
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
      this.el.classList.toggle('is-active', !Validate.value.isEmpty(input.value));
      return this.search(input.value);
    });
  }
}
