import './styles';

import { PopupState } from '~components/Popup/types';
import { Component } from '~modules/Component';

import template from './template';

export class Popup<TProps, TState = PopupState> extends Component<
    TProps,
    TState
> {
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

  created() {
    this.el.addEventListener('click', ({ target }) => {
      if (!this.refs.body.contains(target)) {
        return this.hide();
      }
    });
  }
}
