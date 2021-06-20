import { Popup } from 'components/Popup';
import { FormFile } from 'components/FormFile';

export class PopupFile extends Popup {
  constructor(props) {
    super({ props });
    this.form = new FormFile(props.form);
    this.form.on('submit', () => this.hide());
  }

  reset() {
    this.form.reset();
    return this;
  }

  render() {
    super.render();
    const formContainer = this.el.querySelector('.popup__body');
    this.form.render(formContainer);
    return this;
  }
}
