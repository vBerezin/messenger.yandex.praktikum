import { FormFile } from '~components/FormFile';
import { Popup } from '~components/Popup';

import { PopupFileProps } from './types';

export class PopupFile extends Popup<PopupFileProps> {
    form: FormFile;

    constructor(props: PopupFileProps) {
      super(props);
      this.form = new FormFile(this.props.form);
    }

    reset() {
      this.form.reset();
      return this;
    }

    mounted() {
      this.form.mount(this.refs.body);
    }
}
