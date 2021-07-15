import './styles';
import template from './template';
import { ProfileProps, ProfileState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';
import { FormAvatar } from '~components/FormAvatar';
import { Router } from '~modules/Router';

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

  private back() {
    Router.back();
  }

  mounted() {
    this.formAvatar.mount(this.refs.head);
    this.state.form.mount(this.refs.body);
  }
}
