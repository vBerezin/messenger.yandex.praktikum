import './style.scss';
import template from './template.pug';
import { Component} from '~common/scripts/utils/component';

export class PageAuth extends Component {
  #formContainer;
  constructor(props) {
    super({ template, props });
  }
  render(container) {
    super.render(container);
    this.#formContainer = this.el.querySelector('.page-auth__form');
    this.props.form.render(this.#formContainer);
  }
}
