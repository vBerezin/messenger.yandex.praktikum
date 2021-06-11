import './style.scss';
import template from './template.pug';
import { Component } from 'common/scripts/modules/Component';
import { formSubmitHandler } from 'common/scripts/utils/form-submit-handler';
import 'components/Message';

export class Dialog extends Component {
  constructor(props) {
    super({ template, props });
  }

  render(container) {
    super.render(container);
    this.el.addEventListener('submit', formSubmitHandler);
  }
}
