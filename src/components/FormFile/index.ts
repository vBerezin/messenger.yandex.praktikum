import './styles';
import template from './template';
import { FormFileState, FormFileProps } from './types';

import { formSubmitHandler } from '~common/scripts/utils/formSubmitHandler';

import { Component } from '~modules/Component';

import { Button } from '~components/Button';

export class FormFile extends Component<FormFileProps, FormFileState> {
  #footer;

  private button: Button;

  constructor(props: FormFileProps) {
    super({template, props});
    this.button = new Button({
      mods: ['blue', 'block'],
      class: 'form-file__submit',
      attributes: {
        type: 'submit'
      },
      text: 'Отправить',
      ...props.button,
    });
  }

  reset() {
    if (this.el) {
      this.el.reset();
    }
    this.setState({value: null});
    return this;
  }

  created() {
    this.#footer = this.el.querySelector('.form-file__footer');
    const input = this.el.querySelector('[type="file"]');
    this.el.addEventListener('change', () => {
      const file = input.files[0];
      this.setState({
        value: {
          file,
          name: file.name
        },
      });
      this.emit('change', this.state);
    });
    this.el.addEventListener('submit', (event) => {
      return this.props.submit.call(this, event, this.state);
    });
  }

  mounted() {
    if (this.state.value) {
      this.button.mount(this.#footer);
    }
  }
}
