import './styles';
import template from './template';

import { formSubmitHandler } from '~common/scripts/utils/formSubmitHandler';

import { Component } from '~modules/Component';
import { Validate } from '~modules/Validate';
import { ComponentProps } from '~modules/Component/types';

export class FormSearch extends Component {
  constructor(props: ComponentProps) {
    super({ template, props });
  }

  render() {
    this.el.addEventListener('submit', formSubmitHandler);
    const input = this.el.querySelector('input');
    input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    input.addEventListener('blur', () => {
      this.el.classList.remove('is-focus');
      this.el.classList.toggle('is-active', !Validate.value.isEmpty(input.value));
    });
    input.addEventListener('input', () => {
      this.el.classList.toggle('is-active', !Validate.value.isEmpty(input.value));
    });
  }
}
