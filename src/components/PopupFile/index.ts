import { PopupFileProps } from './types';

import { Popup } from '~components/Popup';
import { FormFile } from '~components/FormFile';

export class PopupFile extends Popup<PopupFileProps> {
  form: FormFile;

  constructor(props: PopupFileProps) {
    super(props);
    this.form = new FormFile(props.form);
    this.form.on('submit', () => {
      this.emit('submit', {state: this.form.getState()});
      this.hide();
    });
  }

  reset() {
    this.form.reset();
    return this;
  }

  render() {
    const formContainer = this.el.querySelector('.popup__body');
    this.form.mount(formContainer);
    return this;
  }
}
