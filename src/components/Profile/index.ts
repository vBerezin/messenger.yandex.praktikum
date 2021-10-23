import './styles';

import { FormAvatar } from '~components/FormAvatar';
import { Component } from '~modules/Component';
import { Router } from '~modules/Router';

import template from './template';
import { ProfileProps, ProfileState } from './types';

export class Profile extends Component<ProfileProps, ProfileState> {
    private formAvatar: FormAvatar;

    constructor(props: ProfileProps) {
      super({
        template,
        props,
        state: {
          form: props.form,
        },
      });
      this.formAvatar = new FormAvatar();
    }

    clickBack() {
      Router.back();
    }

    mounted() {
      this.formAvatar.mount(this.refs.head);
      this.state.form.mount(this.refs.body);
    }
}
