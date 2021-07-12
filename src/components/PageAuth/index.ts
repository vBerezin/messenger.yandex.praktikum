import './styles';
import template from './template';
import { PageAuthProps } from './types';

import { Component } from '~modules/Component';

export class PageAuth extends Component<PageAuthProps> {
  constructor(props: PageAuthProps) {
    super({template, props});
  }

  mounted() {
    const formContainer = this.el.querySelector('.page-auth__form');
    this.props.form.mount(formContainer);
  }
}
