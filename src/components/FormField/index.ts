import './styles';
import template from './template';
import { FormFieldProps, FormFieldState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

export class FormField extends Component<FormFieldProps, FormFieldState> {
  #value;

  input: HTMLInputElement;

  #validate(value) {
    return this.props.validate ? this.props.validate.call(this, value) : null;
  };

  constructor(props: FormFieldProps & ComponentProps) {
    super({template, props});
  }

  get valid() {
    const {errors} = this.state;
    return !errors;
  }

  set value(value: string) {
    this.#value = value;
    const errors = this.#validate(value);
    this.setState({value, errors});
  }

  get value() {
    return this.state.value;
  }

  validate() {
    const errors = this.#validate(this.value);
    this.setState({errors});
  }

  created() {
    this.input = this.el.querySelector('input');
    if (this.state.readonly || this.state.disabled) {
      return false;
    }
    this.input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    this.input.addEventListener('blur', () => {
      this.el.classList.remove('is-focus');
    });
    this.input.addEventListener('change', () => {
      const {value} = this.input;
      this.value = value;
    });
  }
}
