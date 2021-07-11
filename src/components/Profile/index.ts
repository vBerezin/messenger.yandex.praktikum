import './styles';
import template from './template';
import { ProfileProps, ProfileState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';
import { FormAvatar } from '~components/FormAvatar';

export class Profile extends Component<ProfileProps, ProfileState> {
  #head;
  #body;

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

  created() {
    this.#head = this.el.querySelector('.profile__head');
    this.#body = this.el.querySelector('.profile__body');
  }

  mounted() {
    this.formAvatar.mount(this.#head);
    this.state.form.mount(this.#body);
  }
}
