import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/modules/Component';
import { FormUser } from '~components/FormUser';

export class Profile extends Component {
  constructor(props = {}) {
    super({ template, props });
    this.userForm = new FormUser(props.user);
  }

  edit() {
    this.userForm.edit();
  }

  password() {
    this.userForm.passwordChange();
  }

  render(container) {
    super.render(container);
    const formContainer = this.el.querySelector('.profile__form');
    this.userForm.render(formContainer);
  }

  setState(state) {
    super.setState(state);
    if (state.user) {
      this.userForm.setState(state.user);
    }
  }
}
