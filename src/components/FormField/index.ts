import './styles';
import template from './template';
import { FormFieldProps, FormFieldState } from './types';

import { Component } from '~common/scripts/modules/Component';
import { ComponentProps } from '~common/scripts/modules/Component/types';

export class FormField extends Component<FormFieldProps, FormFieldState> {
  #value;
  form?: HTMLFormElement;
  readonly validate;

  constructor(props: FormFieldProps & ComponentProps) {
    super({
      template,
      props,
      state: {
        value: props.value || '',
      },
    });
    this.form = props.form;
    this.validate = function() {
      const errors = this.props.validate ? this.props.validate.call(this, this.value) : null;
      this.setState({ errors });
      return errors;
    }
  }

  get valid() {
    const { errors } = this.state;
    return !(errors && errors.length);
  }

  set value(value: string) {
    this.#value = value;
    this.setState({ value });
  }

  get value() {
    return this.state.value;
  }

  render() {
    const input = this.el.querySelector('input');
    if (!input || this.state.readonly || this.state.disabled) {
      return false;
    }
    input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    input.addEventListener('blur', () => {
      this.validate();
      this.el.classList.remove('is-focus');
    });
    input.addEventListener('change', () => {
      const { value } = input;
      this.value = value;
    });
  }
}
