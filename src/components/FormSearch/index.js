import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/modules/Component';
import { formSubmitHandler } from '~common/scripts/utils/form-submit-handler';

export class FormSearch extends Component {
  #input;
  constructor(props) {
    super({ template, props });
  }
  render(container) {
    super.render(container);
    this.el.addEventListener('submit', formSubmitHandler);
    this.#input = this.el.querySelector('input');
    this.#input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    this.#input.addEventListener('blur', () => {
      this.emit('change', { value: this.#input.value });
      this.el.classList.remove('is-focus');
      this.el.classList.toggle('is-active', !!this.value);
    });
    this.#input.addEventListener('input', () => {
      this.el.classList.toggle('is-active', !!this.value);
      this.emit('change', { value: this.#input.value });
    });
  }
  get value() {
    return this.#input.value.trim();
  }
}
