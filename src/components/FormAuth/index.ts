import './styles';
import template from './template';
import { FormAuthProps } from './types';

import { formSubmitHandler } from '~common/scripts/utils/formSubmitHandler';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

import { Button } from '~components/Button';
import { FormField } from '~components/FormField';

export class FormAuth extends Component<FormAuthProps> {
  private fields: FormField[];
  private buttons: Button[];

  constructor(props: FormAuthProps & ComponentProps) {
    super({ template, props });
    this.buttons = props.buttons.map(button => new Button(button));
    this.fields = props.fields.map((field) => {
      return new FormField({
        ...field,
        form: this.el,
        class: 'form-auth__field',
      });
    });
    this.el.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    const errors = [];
    this.fields.forEach((field) => {
      field.validate();
      if (!field.valid && field.props.required) {
        errors.push(field);
      }
    });
    if (errors.length) {
      event.preventDefault();
      return false;
    }
    return formSubmitHandler(event);
  }

  render() {
    const fieldSet = this.el.querySelector('fieldset');
    const footer = this.el.querySelector('.form-auth__footer');
    this.fields.forEach(field => field.mount(fieldSet));
    this.buttons.forEach(button => button.mount(footer));
  }
}
