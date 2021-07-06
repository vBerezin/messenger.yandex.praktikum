import './styles';
import template from './template';
import { ProfileProps, ProfileState } from './types';

import { Component } from '~modules/Component';
import { ComponentProps } from '~modules/Component/types';

import { FormUser } from '~components/FormUser';
import { EVENTS } from '~common/scripts/events';

export class Profile extends Component<ProfileProps, ProfileState> {
  form: FormUser;

  constructor(props: ProfileProps & ComponentProps) {
    super({
      template,
      props,
      state: {
        form: props.form
      }
    });
    this.form = new FormUser(props.form);
    this.on(EVENTS.component.update, (state) => {
      if (state.form) {
        this.form.setState(state.form);
      }
    });
  }

  render() {
    const formContainer = this.el.querySelector('.profile__form');
    this.form.mount(formContainer);
  }
}
