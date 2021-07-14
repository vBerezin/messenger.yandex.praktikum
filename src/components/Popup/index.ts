import './styles';
import template from './template';

import { Component } from '~modules/Component';

import { PopupState } from '~components/Popup/types';

export class Popup<TProps, TState = PopupState> extends Component<TProps, TState> {
  constructor(props: TProps) {
    super({
      template,
      props,
      state: {
        active: false,
      },
    });
  }

  show() {
    this.el.classList.add('is-active');
  }

  hide() {
    this.el.classList.remove('is-active');
  }

  private close(event) {
    const { target } = event;
    if (!target.closest('.popup__body')) {
      return this.hide();
    }
  }
}
