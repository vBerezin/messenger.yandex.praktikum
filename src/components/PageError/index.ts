import './styles';
import template from './template';

import { EVENTS } from '~common/scripts/events';

import { Component } from '~modules/Component';

import { Button } from '~components/Button';
import { ButtonProps } from '~components/Button/types';


type PageErrorProps = {
  title?: string,
  text?: string,
  button?: ButtonProps,
}

export class PageError extends Component<PageErrorProps> {
  private button: Button;

  constructor(props: PageErrorProps) {
    super({template, props});
    if (this.props.button) {
      this.button = new Button(this.props.button);
      this.on(EVENTS.component.render, () => {
        const footer = this.el.querySelector('.page-error__footer');
        this.button.mount(footer);
      });
    }
  }

  protected render() {

  }
}
