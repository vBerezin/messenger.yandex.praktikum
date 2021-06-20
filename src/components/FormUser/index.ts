import './styles';
import template from './template';
import { Component } from '~common/scripts/modules/Component';
import { PopupFile } from '~components/PopupFile';
import { Button } from '~components/Button';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { FormUserProps, FormUserState } from './types';
import { FormField } from '~components/FormField';
import { FormFieldProps } from '~components/FormField/types';
import {formSubmitHandler} from "~common/scripts/utils/formSubmitHandler";

export class FormUser extends Component<FormUserProps, FormUserState> {
  private button: Button;
  private popup: PopupFile;
  private fields: FormField[];

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
    this.setFields(props.fields);
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

  setFields(fields: FormFieldProps[]) {
    this.fields = fields.map((field) => {
      return new FormField({
        ...field,
        class: 'form-auth__field',
      });
    });
  }

  avatarChange() {
    this.popup.reset().show();
  }

  render() {
    const fieldSet = this.el.querySelector('fieldset');
    this.fields.forEach(field => field.mount(fieldSet));
    this.el.addEventListener('submit', this.onSubmit.bind(this));
    if (this.state.edit) {
      const footer = this.el.querySelector('.form-user__footer');
      this.button.mount(footer);
    }
    this.el.addEventListener('click', ({ target }) => {
      if (target.dataset.action === 'avatar') {
        return this.avatarChange();
      }
    });
  }
}
