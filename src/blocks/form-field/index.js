import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/utils/component';

export class FormField extends Component {
  constructor(props) {
    super({ template, props });
    this.validate = props.validate;
  }

  onChange() {
    const value = this.input.value.trim();
    const error = this.validate ? this.validate(value) : false;
    this.setState({ value, error });
  }

  render(container) {
    super.render(container);
    this.el.addEventListener('change', () => this.onChange());
    this.input = this.el.querySelector('input');
    this.input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    this.input.addEventListener('blur', () => {
      this.el.classList.remove('is-focus');
    });
    this.el.classList.toggle('is-active', !!this.input.value.trim().length);
  }
}
