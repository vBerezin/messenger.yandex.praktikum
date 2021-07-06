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
    this.el.addEventListener('click', ({target}) => {
      if (!target.closest('.popup__body')) {
        this.hide();
      }
    });
  }

  show() {
    this.el.classList.add('is-active');
    this.mount(document.body);
  }

  hide() {
    this.el.classList.remove('is-active');
  }
}
