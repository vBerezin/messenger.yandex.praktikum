import './styles';

import { PopupFile } from '~components/PopupFile';
import { ProfileController } from '~controllers/Profile';
import { App } from '~modules/App';
import { Component } from '~modules/Component';
import { Store } from '~modules/Store';

import template from './template';
import { FormAvatarState } from './types';

export class FormAvatar extends Component<null, FormAvatarState> {
    private popup: PopupFile;
    private readonly profile = new ProfileController();

    constructor(props?) {
      super({
        template,
        props,
        state: {
          image: Store.state.profile?.avatar || undefined,
          title: Store.state.profile?.display_name || undefined,
        },
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
          onSubmit: (event, state) => {
            event.preventDefault();
            return this.onSubmit(state.value.file);
          },
        },
      });
      Store.on(Store.events.update, (data) => {
        this.setState({
          image: data.profile.avatar,
          title: data.profile.display_name,
        });
      });
    }

    onSubmit(file) {
      this.profile
        .avatarChange(file)
        .then((response) => {
          if (response.avatar) {
            this.setState({
              image: response.avatar,
            });
            Store.setState('profile.avatar', response.avatar)
          }
          this.popup.reset().hide();
        })
        .catch(App.error);
    }

    clickPopup() {
      this.popup.reset().show();
    }

    mounted() {
      this.popup.mount(document.body);
    }
}
