import './styles';
import template from './template';
import { FormUserProps, FormUserState, FormUserKey } from './types';

import { Component } from '~common/scripts/modules/Component';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { formSubmitHandler } from '~common/scripts/utils/formSubmitHandler';
import { Validate } from '~common/scripts/modules/Validate';

import { FormField } from '~components/FormField';
import { Button } from '~components/Button';
import { PopupFile } from '~components/PopupFile';


const KEYS = [
  {
    label: 'Почта',
    name: 'email',
    id: 'formUser[email]',
    type: 'email',
    validate: Validate.field.email,
  },
  {
    label: 'Логин',
    name: 'login',
    id: 'formUser[login]',
    type: 'text',
    required: true,
    validate: Validate.field.login,
  },
  {
    label: 'Имя',
    name: 'first_name',
    id: 'formUser[first_name]',
    type: 'text',
    validate: Validate.field.required,
  },
  {
    label: 'Фамилия',
    name: 'second_name',
    id: 'formUser[second_name]',
    type: 'text',
    validate: Validate.field.required,
  },
  {
    label: 'Имя в чате',
    name: 'display_name',
    id: 'formUser[display_name]',
    type: 'text',
    validate: Validate.field.required,
  },
  {
    label: 'Телефон',
    name: 'phone',
    id: 'formUser[phone]',
    type: 'tel',
    required: true,
    validate: Validate.field.phone,
  },
];

const KEYS_PASSWORD = [
  {
    label: 'Старый пароль',
    name: 'oldPassword',
    id: 'formUser[oldPassword]',
    type: 'text',
    readonly: true,
  },
  {
    label: 'Новый пароль',
    name: 'newPassword',
    id: 'formUser[newPassword]',
    type: 'password',
    required: true,
    validate: Validate.field.password,
  },
  {
    label: 'Повторите новый пароль',
    name: 'newPasswordConfirm',
    id: 'formUser[newPasswordConfirm]',
    type: 'password',
    required: true,
    validate: function(value) {
      const form = this.el.closest('form');
      const password = form.newPassword.value;
      return value === password ? null : 'Пароли не совпадают';
    }
  },
];

export class FormUser extends Component<FormUserProps, FormUserState> {
  private button: Button;
  private popup: PopupFile;

  constructor(props: FormUserProps & ComponentProps) {
    super({
      template,
      props,
      state: {
        edit: false,
        password: false,
        image: props.data.image,
        title: props.data.display_name,
      }
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
    this.info();
  }

  private makeFields(keys: FormUserKey[], props): FormField[] {
    return keys.map((key) => {
      return new FormField({
        ...key,
        mods: 'row',
        class: 'form-user__field',
        value: this.props.data[key.name],
        ...props,
      });
    });
  }

  info () {
    this.setState({
      edit: false,
      password: false,
      fields: this.makeFields(KEYS, { readonly: true }),
    });
    return this;
  }

  edit () {
    this.setState({
      edit: true,
      password: false,
      fields: this.makeFields(KEYS, { readonly: false }),
    });
  }

  password () {
    this.setState({
      password: true,
      fields: this.makeFields(KEYS_PASSWORD, { readonly: false }),
    });
  }

  onSubmit(event) {
    const errors = [];
    const { fields } = this.state;
    fields.forEach((field) => {
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

  avatarChange() {
    this.popup.reset().show();
  }

  render() {
    const { fields, edit, password } = this.state;
    const fieldSet = this.el.querySelector('fieldset');
    fields.forEach(field => field.mount(fieldSet));
    if (edit || password) {
      const footer = this.el.querySelector('.form-user__footer');
      this.button.mount(footer);
    }
    this.el.addEventListener('click', ({ target }) => {
      if (target.dataset.action === 'avatar') {
        return this.avatarChange();
      }
    });
    this.el.addEventListener('submit', this.onSubmit.bind(this));
  }
}
