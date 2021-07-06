import './styles';
import template from './template';
import { FormUserProps, FormUserState } from './types';

import { formSubmitHandler } from '~common/scripts/utils/formSubmitHandler';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

import { FormField } from '~components/FormField';
import { Button } from '~components/Button';
import { PopupFile } from '~components/PopupFile';

export class FormUser extends Component<FormUserProps, FormUserState> {
  private button: Button;
  private popup: PopupFile;
  fields: FormField[];

  constructor(props: FormUserProps & ComponentProps) {
    super({
      template,
      props,
    });
    this.button = new Button({
      class: 'form-user__submit',
      mods: ['blue', 'block'],
      text: 'Сохранить',
      attributes: {
        type: 'submit'
      }
    });
    this.popup = new PopupFile({
      form: {
        action: '?avatar',
        input: {
          name: 'avatar',
        },
        button: {
          text: 'Поменять',
        }
      },
    });
    this.fields = props.fields.map((field) => {
      return new FormField({
        ...field,
        mods: 'row',
        class: 'form-user__field',
        readonly: !props.edit
      });
    });
  }

  private validateFields() {
    const errors = [];
    const { fields } = this.state;
    fields.forEach((field) => {
      field.validate();
      if (!field.valid && field.props.required) {
        errors.push(field);
      }
    });
    return errors;
  }

  private onSubmit(event) {
    const fields = this.validateFields();
    if (fields.length) {
      event.preventDefault();
      return false;
    }
    return formSubmitHandler(event);
  }

  private avatarChange() {
    this.popup.reset().show();
  }

  render() {
    const fieldSet = this.el.querySelector('fieldset');
    this.fields.forEach(field => field.mount(fieldSet));
    if (this.props.edit) {
      const footer = this.el.querySelector('.form-user__footer');
      this.button.mount(footer);
    }
    this.el.addEventListener('click', ({target}) => {
      if (target.dataset.action === 'avatar') {
        return this.avatarChange();
      }
    });
    this.el.addEventListener('submit', this.onSubmit.bind(this));
  }
}
