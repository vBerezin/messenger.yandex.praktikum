import './style.scss';
import template from './template.pug';
import { Component } from '../../common/scripts/modules/Component';

export class FormField extends Component {
  constructor(props) {
    super({ template, props });
    this.validate = props.validate;
    this.filter = value => value.toString().replace(/^\s/gm, '');
  }

  onChange() {
    const { value } = this.input;
    const error = this.validate ? this.validate(value) : false;
    this.setState({ value, error });
    if (error) {
      this.el.querySelector('.form-field__error').textContent = `${error}`;
    }
    this.el.classList.toggle('has-error', error);
  }

  render(container) {
    super.render(container);
    this.input = this.el.querySelector('input');
    this.input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    this.input.addEventListener('blur', () => {
      this.el.classList.remove('is-focus');
    });
    this.input.addEventListener('change', () => {
      this.onChange();
      this.el.classList.toggle('is-active', !!this.input.value.length);
    });
    this.input.addEventListener('input', () => {
      const { value } = this.input;
      this.input.value = this.filter(value);
    });
  }
}
