import './styles';
import template from './template';
import { FormFileState, FormFileProps } from './types';

import { formSubmitHandler } from '~common/scripts/utils/formSubmitHandler';

import { Component } from '~modules/Component';

import { Button } from '~components/Button';

export class FormFile extends Component<FormFileProps, FormFileState> {
  private button: Button;

  constructor(props: FormFileProps) {
    super({ template, props });
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
    this.setState({ value: null });
    return this;
  }

  render() {
    const input = this.el.querySelector('[type="file"]');
    if (this.state.value) {
      const footer = this.el.querySelector('.form-file__footer');
      this.button.mount(footer);
    }
    this.el.addEventListener('change', () => {
      const file = input.files[ 0 ];
      this.setState({
        value: {
          file,
          name: file.name
        },
      });
      this.emit('change', this.state);
    });
    this.el.addEventListener('submit', (event) => {
      this.emit('submit', event);
      return formSubmitHandler(event);
    });
  }
}
