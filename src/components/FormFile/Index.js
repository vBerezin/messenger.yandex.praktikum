import './style.scss';
import template from './template.pug';
import { Component } from '~common/scripts/modules/Component';
import { formSubmitHandler } from '~common/scripts/utils/form-submit-handler';

export class FormFile extends Component {
  #input;
  constructor(props) {
    super({ template, props });
  }

  reset() {
    if (this.el) {
      this.el.reset();
    }
    this.setState({ value: null });
    this.emit('change', this.state);
    this.render();
    return this;
  }

  render(container) {
    super.render(container);
    this.#input = this.el.querySelector('[type="file"]');
    this.el.addEventListener('change', () => {
      const { files } = this.#input;
      this.setState({ value: files[0] });
      this.emit('change', this.state);
      this.render();
    });
    this.el.addEventListener('submit', (event) => {
      this.emit('submit', event);
      return formSubmitHandler(event);
    });
  }
}
