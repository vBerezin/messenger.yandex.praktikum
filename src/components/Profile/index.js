import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/modules/Component';
import { FormUser } from '~components/FormUser';

export class Profile extends Component {
  #formContainer;
  constructor(props) {
    super({ template, props });
    this.userForm = new FormUser(props.user);
  }

  render(container) {
    super.render(container);
    this.#formContainer = this.el.querySelector('.profile__form');
    this.userForm.render(this.#formContainer);
  }
}
