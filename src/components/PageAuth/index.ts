import './styles';
import template from './template';
import { PageAuthProps } from './types';

import { Component } from '~modules/Component';

export class PageAuth extends Component<PageAuthProps> {
  #formContainer;

  constructor(props: PageAuthProps) {
    super({template, props});
  }

  created() {
    this.#formContainer = this.el.querySelector('.page-auth__form');
  }

  mounted() {
    this.props.form.mount(this.#formContainer);
  }
}
