import './styles';
import template from './template';
import { ProfileProps, ProfileState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';
import { FormAvatar } from '~components/FormAvatar';

export class Profile extends Component<ProfileProps, ProfileState> {
  private formAvatar: FormAvatar;

  constructor(props: ProfileProps & ComponentProps) {
    super({
      template,
      props,
      state: {
        form: props.form,
      }
    });
    this.formAvatar = new FormAvatar();
  }

  mounted() {
    const head = this.el.querySelector('.profile__head');
    const body = this.el.querySelector('.profile__body');
    this.formAvatar.mount(head);
    this.state.form.mount(body);
  }
}
