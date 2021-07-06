import './styles';
import template from './template';
import { FormAuthProps, FormAuthState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

import { Button } from '~components/Button';
import { FormField } from '~components/FormField';

export class FormAuth extends Component<FormAuthProps, FormAuthState> {
  private fields: FormField[];
  private buttons: Button[];

  constructor(props: FormAuthProps & ComponentProps) {
    super({template, props});
    this.buttons = props.buttons.map(button => new Button(button));
    this.fields = props.fields.map((field) => {
      return new FormField({
        ...field,
        form: this.el,
        class: 'form-auth__field',
      });
    });
  }

  private validateFields() {
    const errors = [];
    this.fields.forEach((field) => {
      field.validate();
      if (!field.valid && field.props.required) {
        errors.push(field);
      }
    });
    return errors;
  }

  onSubmit(event) {
    const fields = this.validateFields();
    if (fields.length) {
      event.preventDefault();
      return false;
    }
    return this.props.submit.call(this, event);
  }

  render() {
    const fieldSet = this.el.querySelector('fieldset');
    const footer = this.el.querySelector('.form-auth__footer');
    this.fields.forEach(field => field.mount(fieldSet));
    this.buttons.forEach(button => button.mount(footer));
    this.el.addEventListener('submit', this.onSubmit.bind(this));
  }
}
