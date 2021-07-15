import { PopupFileProps } from './types';

import { Popup } from '~components/Popup';
import { FormFile } from '~components/FormFile';
import { ComponentProps } from '~modules/Component/types';

export class PopupFile extends Popup<PopupFileProps> {
  form: FormFile;

  constructor(props: PopupFileProps & ComponentProps) {
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
