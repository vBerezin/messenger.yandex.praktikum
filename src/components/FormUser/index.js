import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/modules/Component';
import { formSubmitHandler } from '~common/scripts/utils/form-submit-handler';

export class FormUser extends Component {
  constructor(props) {
    super({ template, props });
  }
  render(container) {
    super.render(container);
    this.el.addEventListener('submit', formSubmitHandler);
  }
}
