import './styles';
import template from './template';
import { Component } from '~common/scripts/modules/Component';
import { PopupFile } from '~components/PopupFile';
import { Button } from '~components/Button';
import { ComponentProps } from '~common/scripts/modules/Component/types';
import { FormUserProps, FormUserState } from './types';

export class FormUser extends Component<FormUserProps, FormUserState> {
  private button: Button;
  private popup: PopupFile;

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
    this.popup.on('submit', ({ state }) => {});
  }

  avatarChange() {
    this.popup.reset().show();
  }

  render() {
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
