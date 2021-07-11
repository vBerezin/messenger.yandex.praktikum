import './styles';
import template from './template';
import { FormAvatarState } from './types';

import { Component } from '~modules/Component';
import { Store } from '~modules/Store';
import { PopupFile } from '~components/PopupFile';
import { Users } from '~entities/Users';
import { App } from '~modules/App';

export class FormAvatar extends Component<null, FormAvatarState> {
  private popup: PopupFile;

  constructor(props?) {
    super({
      template,
      props,
      state: {
        title: Store.state.user.display_name,
        image: Store.state.user.avatar,
      }
    });
    this.popup = new PopupFile({
      form: {
        input: {
          name: 'avatar',
          accept: ['.png', '.jpg'],
        },
        button: {
          text: 'Поменять',
        },
        submit: (event, state) => {
          event.preventDefault();
          return this.onSubmit(state.value.file);
        },
      }
    });
    Store.subscribe('user', (state, value) => {
      this.setState({
        image: value.avatar,
        title: value['display_name']
      });
    });
  }

  onSubmit(file) {
    Users
      .avatarChange(file)
      .then((response) => {
        if (response.avatar) {
          this.setState({
            image: response.avatar,
          });
        }
        this.popup.reset().hide();
      })
      .catch(App.error);
  }

  created() {
    this.el.addEventListener('click', (event) => {
      const { target } = event;
      if (target.dataset.click === 'avatar') {
        event.preventDefault();
        this.popup.reset().show();
      }
    });
  }

  mounted() {
    this.popup.mount(document.body);
  }
}
